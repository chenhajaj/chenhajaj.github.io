"""Visual and accessibility QA for the built site.

Serves a built Jekyll site (or uses a live URL), then for every key page:
  - takes full-page and above-the-fold screenshots at desktop, mobile and dark
  - flags horizontal overflow and JavaScript errors
  - runs axe-core WCAG 2.1 AA checks in light and dark mode
  - checks that every internal link and image resolves (local builds only)

Usage:
  bundle exec jekyll build -d _site
  python3 scripts/visual-qa/qa.py _site            # local build
  python3 scripts/visual-qa/qa.py https://chenhajaj.github.io --out qa-live

Needs: pip install playwright && python3 -m playwright install chromium
       npm install --no-save axe-core   (run from the repo root)
Exit code is 1 if any page has axe violations, script errors, overflow or
broken internal links, so this can run in CI.
"""

import argparse
import functools
import http.server
import json
import os
import re
import socketserver
import sys
import threading
import urllib.parse

from playwright.sync_api import sync_playwright

PAGES = [
    "", "publications", "people", "projects", "projects/encrypted_traffic",
    "teaching", "cv", "news", "insights", "insights/deployable-classifier",
    "software", "contact", "accessibility", "privacy",
]
VIEWPORTS = [
    ("desktop", {"width": 1440, "height": 900}, "light"),
    ("mobile", {"width": 390, "height": 844}, "light"),
    ("dark", {"width": 1440, "height": 900}, "dark"),
]
AXE_TAGS = ["wcag2a", "wcag2aa", "wcag21aa"]


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


def serve(directory, port):
    handler = functools.partial(QuietHandler, directory=directory)
    socketserver.TCPServer.allow_reuse_address = True
    httpd = socketserver.TCPServer(("127.0.0.1", port), handler)
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    return httpd


def page_url(base, path):
    return f"{base}/{path}/" if path else f"{base}/"


def set_dark(page):
    page.evaluate(
        "() => { try { localStorage.setItem('theme', 'dark'); } catch (e) {}"
        " document.documentElement.setAttribute('data-theme', 'dark'); }"
    )


def check_links(site_dir):
    broken = {}
    for dirpath, _, files in os.walk(site_dir):
        if os.sep + "assets" in dirpath:
            continue
        for name in files:
            if not name.endswith(".html"):
                continue
            src = os.path.join(dirpath, name)
            html = open(src, encoding="utf-8", errors="ignore").read()
            for match in re.finditer(r'(?:href|src)="([^"#?]+)', html):
                ref = match.group(1)
                if ref.startswith(("http", "mailto:", "tel:", "data:", "javascript:", "//")):
                    continue
                rel = urllib.parse.unquote(ref)
                if not rel.startswith("/"):
                    rel = os.path.join(os.path.dirname(src[len(site_dir):]), rel)
                target = os.path.normpath(site_dir + "/" + rel)
                if not (os.path.isfile(target) or os.path.isfile(os.path.join(target, "index.html"))):
                    broken.setdefault(ref, set()).add(src[len(site_dir):])
    return broken


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("target", help="built site directory or base URL")
    ap.add_argument("--out", default="qa-shots", help="screenshot output directory")
    ap.add_argument("--port", type=int, default=8811)
    ap.add_argument("--axe", default="node_modules/axe-core/axe.min.js")
    args = ap.parse_args()

    is_url = args.target.startswith("http")
    httpd = None
    if is_url:
        base = args.target.rstrip("/")
    else:
        httpd = serve(args.target, args.port)
        base = f"http://127.0.0.1:{args.port}"
    os.makedirs(args.out, exist_ok=True)
    axe = open(args.axe).read() if os.path.exists(args.axe) else None
    if not axe:
        print(f"note: {args.axe} not found, skipping axe (npm install --no-save axe-core)")

    failures, report = 0, {}
    with sync_playwright() as p:
        browser = p.chromium.launch()
        for vp_name, viewport, scheme in VIEWPORTS:
            ctx = browser.new_context(viewport=viewport, color_scheme=scheme,
                                      device_scale_factor=2 if vp_name == "mobile" else 1)
            for path in PAGES:
                page = ctx.new_page()
                errors = []
                page.on("pageerror", lambda e: errors.append(str(e)[:200]))
                page.goto(page_url(base, path), wait_until="networkidle", timeout=60000)
                if scheme == "dark":
                    set_dark(page)
                page.wait_for_timeout(2500)  # let the one page-load animation finish
                # Scroll-in reveals (blur fade) would hide content below the fold
                # from axe and the full-page screenshot; show it all first.
                page.evaluate("document.querySelectorAll('.reveal').forEach(e => e.classList.add('is-shown'))")
                page.wait_for_timeout(900)
                name = (path or "home").replace("/", "_")
                page.screenshot(path=f"{args.out}/{vp_name}_{name}.png", full_page=True)
                page.screenshot(path=f"{args.out}/{vp_name}_{name}_fold.png")
                overflow = page.evaluate("document.documentElement.scrollWidth > window.innerWidth + 1")
                violations = []
                if axe and vp_name != "mobile":
                    page.add_script_tag(content=axe)
                    violations = page.evaluate(
                        "async (tags) => (await axe.run(document, {runOnly: {type: 'tag', values: tags}}))"
                        ".violations.map(v => ({id: v.id, nodes: v.nodes.length,"
                        " first: v.nodes[0].target.join(' ')}))", AXE_TAGS)
                bad = bool(errors or overflow or violations)
                failures += bad
                report[f"{vp_name}/{name}"] = {"errors": errors, "overflowX": overflow, "axe": violations}
                status = "FAIL" if bad else "ok  "
                detail = "; ".join(f"{v['id']}({v['nodes']})" for v in violations)
                print(f"{status} {vp_name:7} /{path:32} "
                      f"{'overflow ' if overflow else ''}{detail} {' '.join(errors)[:120]}")
                page.close()
            ctx.close()
        browser.close()
    if httpd:
        httpd.shutdown()
        broken = check_links(args.target)
        print(f"internal links: {len(broken)} broken")
        for ref, sources in list(broken.items())[:30]:
            print(f"  {ref}  <-  {', '.join(sorted(sources)[:3])}")
        failures += len(broken)
    json.dump(report, open(f"{args.out}/report.json", "w"), indent=1)
    print(f"\nscreenshots and report.json in {args.out}/")
    sys.exit(1 if failures else 0)


if __name__ == "__main__":
    main()
