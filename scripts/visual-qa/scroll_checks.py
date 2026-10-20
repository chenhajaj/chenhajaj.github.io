"""Scroll-position checks, adapted from scroll-craft's verify harness (MIT,
github.com/nateherkai/scroll-craft).

The axe pass in qa.py sees one frozen state of the page with every scroll
reveal forced on. These checks scroll through the page the way a visitor does
and look at what is actually on screen at each position:

  faded:    text that never reaches full opacity at any scroll position
            (a reveal that stalls, a fade that never finishes)
  contrast: text whose contrast against the pixels actually behind it falls
            below WCAG AA at some position, measured on the composited page
            (catches text over gradients, the hero glow, canvases and images,
            which axe cannot measure)
"""

import io

import numpy as np
from PIL import Image

# Collects the visible text on screen: one entry per element that directly
# holds text, with its line boxes, colour, size and effective opacity.
COLLECT_JS = r"""
() => {
  const out = [];
  const vw = innerWidth, vh = innerHeight;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode: n => n.nodeValue.trim().length > 1 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
  });
  // Bottom of the sticky header, plus room for its shadow: text passing under
  // or just below it is in transit, not where it is read.
  let top = 0;
  for (const e of document.elementsFromPoint(vw / 2, 4)) {
    for (let a = e; a; a = a.parentElement) {
      const pos = getComputedStyle(a).position;
      if (pos === 'fixed' || pos === 'sticky') { top = Math.max(top, a.getBoundingClientRect().bottom + 24); break; }
    }
  }
  const seen = new Map();
  let n;
  while ((n = walker.nextNode())) {
    const el = n.parentElement;
    if (!el || el.closest('script,style,noscript,[hidden],[aria-hidden="true"],.visually-hidden,.sr-only,svg,canvas')) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility !== 'visible' || cs.display === 'none') continue;
    const range = document.createRange();
    range.selectNodeContents(n);
    // Keep line boxes fully on screen and not covered by something else
    // (the sticky header, a dialog): the visitor cannot see covered text.
    const rects = [...range.getClientRects()].filter(r => {
      if (!(r.width > 3 && r.height > 6 && r.top >= top && r.bottom <= vh && r.left >= 0 && r.right <= vw)) return false;
      const pts = [];
      for (const x of [r.left + 2, r.left + r.width / 2, r.right - 2])
        for (const y of [r.top + 2, r.top + r.height / 2, r.bottom - 2]) pts.push([x, y]);
      return pts.every(([x, y]) => { const h = document.elementFromPoint(x, y); return h && (h === el || el.contains(h) || h.contains(el)); });
    });
    if (!rects.length) continue;
    let op = 1;
    for (let a = el; a; a = a.parentElement) op *= parseFloat(getComputedStyle(a).opacity);
    if (!el.dataset.qaId) el.dataset.qaId = 'q' + Math.random().toString(36).slice(2, 9);
    const id = el.dataset.qaId;
    const entry = seen.get(id) || {
      id, opacity: op, color: cs.color, size: parseFloat(cs.fontSize), weight: parseInt(cs.fontWeight, 10),
      text: el.innerText.trim().replace(/\s+/g, ' ').slice(0, 70),
      where: el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/)[0] : ''),
      rects: []
    };
    entry.rects.push(...rects.map(r => [r.left, r.top, r.width, r.height]));
    seen.set(id, entry);
  }
  return [...seen.values()];
}
"""

# Waits (up to 3 s) until finite animations and transitions have finished, so
# text is judged where it comes to rest, not mid-fade. Endless ambient motion
# (the hero glow, the venue strip) is ignored.
SETTLE_JS = r"""
async () => {
  const t0 = performance.now();
  const busy = () => document.getAnimations().some(a => a.playState === 'running' &&
    isFinite((a.effect && a.effect.getComputedTiming().endTime) || Infinity));
  while (busy() && performance.now() - t0 < 3000) await new Promise(r => setTimeout(r, 100));
}
"""

HIDE_TEXT_CSS = (
    "*,*::before,*::after{color:transparent!important;-webkit-text-fill-color:transparent!important;"
    "text-shadow:none!important;text-decoration-color:transparent!important;transition:none!important;"
    "caret-color:transparent!important}"
)


def _parse_color(css):
    """rgb()/rgba() in 0-255, or color(srgb r g b / a) in 0-1 (from color-mix)."""
    inner = css[css.index("(") + 1:css.rindex(")")].replace("/", " ").replace(",", " ").split()
    scale = 255.0
    if inner and inner[0] == "srgb":
        inner, scale = inner[1:], 1.0
    nums = [float(x) for x in inner]
    r, g, b = nums[:3]
    a = nums[3] if len(nums) > 3 else 1.0
    return np.array([r, g, b]) / scale, a


def _lum(rgb):
    c = np.where(rgb <= 0.04045, rgb / 12.92, ((rgb + 0.055) / 1.055) ** 2.4)
    return c[..., 0] * 0.2126 + c[..., 1] * 0.7152 + c[..., 2] * 0.0722


def _worst_contrast(bg_pixels, fg_rgb, alpha):
    """Contrast of the text colour, composited on each background pixel; the
    2nd percentile, so a few letters over a bright patch still count but a
    stray border pixel does not decide the result."""
    bg = bg_pixels.reshape(-1, 3) / 255.0
    fg = alpha * fg_rgb + (1 - alpha) * bg
    lf, lb = _lum(fg), _lum(bg)
    hi, lo = np.maximum(lf, lb), np.minimum(lf, lb)
    ratios = (hi + 0.05) / (lo + 0.05)
    return float(np.percentile(ratios, 2))


def scroll_checks(page, step=0.6, settle_ms=450, max_steps=80, crop_prefix=None):
    """Scroll the page top to bottom and return (faded, low_contrast) lists.
    With crop_prefix, saves the background behind each failing line (text
    hidden) as <crop_prefix>-<n>.png so a failure can be inspected."""
    vh = page.evaluate("innerHeight")
    height = page.evaluate("document.documentElement.scrollHeight")
    positions = list(range(0, max(height - vh, 0) + 1, max(int(vh * step), 1)))[:max_steps]
    if positions[-1] < height - vh:
        positions.append(height - vh)

    best_opacity, info, worst = {}, {}, {}
    dpr = page.evaluate("devicePixelRatio")
    for y in positions:
        page.evaluate(f"window.scrollTo({{top: {y}, behavior: 'instant'}})")
        page.wait_for_timeout(settle_ms)
        page.evaluate(SETTLE_JS)
        items = page.evaluate(COLLECT_JS)
        handle = page.add_style_tag(content=HIDE_TEXT_CSS)
        page.wait_for_timeout(60)
        shot = np.asarray(Image.open(io.BytesIO(page.screenshot())).convert("RGB"))
        handle.evaluate("el => el.remove()")
        for it in items:
            iid = it["id"]
            info[iid] = it
            best_opacity[iid] = max(best_opacity.get(iid, 0), it["opacity"])
            if it["opacity"] < 0.98:
                continue  # judged by the opacity check; contrast only on settled text
            fg, alpha = _parse_color(it["color"])
            for x, top, w, h in it["rects"]:
                # The glyphs sit in the middle of the line box; the top and
                # bottom 15% are leading, where row dividers can touch.
                x0, y0 = int(x * dpr), int((top + 0.15 * h) * dpr)
                crop = shot[y0:y0 + int(0.7 * h * dpr), x0:x0 + int(w * dpr)]
                if crop.size == 0:
                    continue
                c = _worst_contrast(crop, fg, alpha)
                if c < worst.get(iid, (99, 0))[0]:
                    worst[iid] = (c, y, crop.copy())
    page.evaluate("window.scrollTo({top: 0, behavior: 'instant'})")

    faded = [{"where": info[i]["where"], "text": info[i]["text"], "max_opacity": round(o, 2)}
             for i, o in best_opacity.items() if o < 0.98]
    low = []
    for i, (c, y, crop) in worst.items():
        it = info[i]
        large = it["size"] >= 24 or (it["size"] >= 18.66 and it["weight"] >= 700)
        need = 3.0 if large else 4.5
        if c < need:
            entry = {"where": it["where"], "text": it["text"], "contrast": round(c, 2),
                     "needs": need, "scroll_y": y, "color": it["color"]}
            if crop_prefix:
                entry["crop"] = f"{crop_prefix}-{len(low) + 1}.png"
                Image.fromarray(crop).save(entry["crop"])
            low.append(entry)
    return faded, low
