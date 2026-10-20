"""Render assets/img/social-card.png (1200x630 link preview).

Uses the built site's research data so the paper map matches the home page.
Run after `bundle exec jekyll build`:  python3 scripts/social-card/make.py
Needs Playwright with Chromium.
"""
import base64, json, pathlib
from playwright.sync_api import sync_playwright

root = pathlib.Path(__file__).resolve().parents[2]
data = json.loads((root / "_site/assets/data/research.json").read_text())
photo = base64.b64encode((root / "assets/img/me.jpeg").read_bytes()).decode()
font = (root / "assets/fonts/archivo-normal-latin.woff2").as_uri()

lines = {l["key"]: l["color"][1] for l in data["lines"]}
other = data["other"]["color"][1]
years = range(data["first_year"], data["last_year"] + 1)
cols = {y: [] for y in years}
for p in data["papers"]:
    if p["year"] in cols:
        cols[p["year"]].append(p)
order = list(lines) + [None]
cells = []
for y, ps in cols.items():
    ps.sort(key=lambda p: order.index(p.get("line")) if p.get("line") in order else len(order))
    sq = "".join(
        f'<i style="background:{lines.get(p.get("line"), other)}"'
        + (' class="h"' if p["kind"] not in ("journal", "conference") else "")
        + "></i>"
        for p in ps
    )
    cells.append(f'<div class="col"><div class="stack">{sq}</div><b>{str(y)[2:] if y % 5 == 0 or y == data["last_year"] else ""}</b></div>')
legend = "".join(f'<span><i style="background:{l["color"][1]}"></i>{l["name"]}</span>' for l in data["lines"])
n = len(data["papers"])

html = f"""<!doctype html><html><head><meta charset=utf-8><style>
@font-face {{ font-family: Archivo; src: url({font}) format('woff2'); font-weight: 100 900; font-stretch: 62% 125%; }}
* {{ box-sizing: border-box; margin: 0; }}
body {{ width: 1200px; height: 630px; overflow: hidden; font-family: Archivo, sans-serif; color: #eef1ff;
  background: radial-gradient(120% 90% at 88% 0%, #23308a 0%, transparent 60%), #101a4d; }}
.wrap {{ position: absolute; inset: 56px 72px 48px; display: grid; grid-template-columns: 1fr 190px; grid-template-rows: auto 1fr; gap: 0 48px; }}
h1 {{ font-size: 88px; line-height: .95; font-weight: 820; font-stretch: 120%; letter-spacing: -.02em; }}
.sub {{ margin-top: 18px; font-size: 27px; color: #c3cbef; font-weight: 450; }}
.sub strong {{ color: #fff; font-weight: 650; }}
img {{ width: 190px; height: 190px; object-fit: cover; object-position: 50% 22%; border-radius: 18px; grid-row: 1; grid-column: 2; }}
.map {{ grid-column: 1 / -1; align-self: end; display: flex; align-items: flex-end; gap: 4px; }}
.col {{ display: flex; flex-direction: column; align-items: center; gap: 6px; }}
.stack {{ display: flex; flex-direction: column-reverse; gap: 3px; }}
.stack i {{ width: 17px; height: 17px; border-radius: 3.5px; display: block; }}
.stack i.h {{ background: transparent !important; box-shadow: inset 0 0 0 2px #8f98ab; }}
.col b {{ font-size: 15px; height: 15px; color: #98a3d6; font-weight: 500; }}
.side {{ margin-left: 28px; align-self: flex-end; padding-bottom: 22px; font-size: 17px; color: #c3cbef; display: grid; gap: 7px; }}
.side span {{ display: flex; align-items: center; gap: 9px; }}
.side i {{ width: 13px; height: 13px; border-radius: 3px; display: inline-block; }}
.side .n {{ font-size: 21px; color: #fff; font-weight: 650; margin-bottom: 4px; }}
</style></head><body><div class="wrap">
<div><h1>Chen Hajaj</h1><p class="sub"><strong>Adaptive AI Lab</strong> · Ariel University<br>Machine learning that keeps working when<br>data, threats and domains change.</p></div>
<img src="data:image/jpeg;base64,{photo}" alt="">
<div class="map">{''.join(cells)}<div class="side"><span class="n">{n} papers, one square each</span>{legend}</div></div>
</div></body></html>"""

with sync_playwright() as pw:
    b = pw.chromium.launch()
    pg = b.new_page(viewport={"width": 1200, "height": 630})
    pg.set_content(html, wait_until="networkidle")
    pg.screenshot(path=str(root / "assets/img/social-card.png"))
    b.close()
print("wrote assets/img/social-card.png")
