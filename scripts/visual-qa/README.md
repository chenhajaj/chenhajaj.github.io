# Visual QA

Checks to run before merging any change to the site's look. Run them from the
repo root.

## 1. Build the site

```sh
export LANG=C.UTF-8 LC_ALL=C.UTF-8   # the bibliography needs a UTF-8 locale
bundle exec jekyll build -d _site
```

## 2. Screenshots, accessibility and links

```sh
pip install playwright && python3 -m playwright install chromium
npm install --no-save axe-core
python3 scripts/visual-qa/qa.py _site
```

This screenshots every key page at desktop (1440px), mobile (390px) and in dark
mode into `qa-shots/`. It also runs axe-core WCAG 2.1 AA checks in light and
dark mode, reports horizontal overflow and script errors, and checks every
internal link. It exits with code 1 if anything fails.

To compare against what is live, point it at the URL:

```sh
python3 scripts/visual-qa/qa.py https://chenhajaj.github.io --out qa-live
```

## 3. Design anti-patterns (Impeccable)

```sh
python3 -m http.server 8822 -d _site &
npx impeccable detect --viewport 1280x800 http://127.0.0.1:8822/publications/
npx impeccable detect --viewport 390x844  http://127.0.0.1:8822/publications/
```

The detector flags common generated-UI patterns: nested cards, side-tab accent
borders, gradient text, all-caps eyebrow labels, long lines and similar. The
current design scores zero findings on every page; keep it that way. See
`DESIGN.md` for the rules behind the design.

If Chromium refuses to start as root (common in containers), point
`PUPPETEER_EXECUTABLE_PATH` at a wrapper script that adds `--no-sandbox`.

## 4. Speed (optional)

```sh
npx lighthouse http://127.0.0.1:8822/ --only-categories=performance,accessibility
```

## Baseline (16 October 2026)

| Check                        | Old site (live)     | Redesign   |
| ---------------------------- | ------------------- | ---------- |
| axe WCAG AA violations       | 259 across 24 views | 0          |
| Impeccable findings          | 444 (desktop)       | 0          |
| Lighthouse performance, home | 41                  | 89         |
| Home page weight / requests  | 1,412 KB / 78       | 438 KB / 9 |
| Build time                   | about 3.5 min       | about 20 s |
