# Design system: "Signal"

This file records how the site is designed, so future edits (by hand or with
an AI assistant) stay consistent. The styles live in `_sass/signal/`, the
behaviour in `assets/js/site.js`.

## Who the site is for

1. Prospective PhD and MSc students deciding whether to write.
2. Collaborators, reviewers and committees checking the research record.
3. Industry and government partners looking for a fit.

Its job is to make the research record credible within a few seconds and to
route people to papers, the lab, or an email.

## The one bold idea

The **flow fingerprint**: a drawing of one encrypted network connection as a
traffic classifier sees it. Packet sizes over time, client to server above the
axis (ink), server to client below (cobalt). On the home page an amber section
shows the traffic changing, which is the lab's theme: models that keep working
when data, threats and domains change.

- Drawn client-side by `drawFingerprint()` in `assets/js/site.js` from a seed,
  so the same seed always gives the same drawing.
- Each research line, research note and the 404 page gets its own seed (its
  URL slug) and so its own trace. Do not reuse the hero seed elsewhere.
- Markup: `<div class="fingerprint fingerprint-band" data-seed="..."
data-bar="2" data-step="4" data-shift="0.6"></div>`. `data-shift` adds the
  amber change; `data-animate` plays the single page-load sweep (home only);
  `data-axis` moves the axis (0 to 1, default 0.42).
- The animation respects `prefers-reduced-motion`. It is the only automatic
  motion on the site; keep it that way.

Everything else stays quiet so that this carries the identity.

## Colour

| Token                 | Light                 | Dark                  | Use                                    |
| --------------------- | --------------------- | --------------------- | -------------------------------------- |
| `--paper`             | `#f7f8fa`             | `#0d1322`             | page background                        |
| `--ink`               | `#141b2d`             | `#e8ebf1`             | text, upstream bars                    |
| `--ink-2` / `--ink-3` | `#454f63` / `#5d6679` | `#b3bbca` / `#98a1b3` | secondary text, meta                   |
| `--rule`              | `#d9dde5`             | `#263049`             | hairlines between rows                 |
| `--cobalt`            | `#2440c8`             | `#9aacff`             | links, buttons, downstream bars, focus |
| `--amber`             | `#d4850c`             | `#f0b24a`             | only the "shift" in fingerprints       |

All text pairs meet WCAG AA in both themes. Amber is never used for text or UI.
Dark mode follows the system unless the visitor picks a theme with the toggle
(stored in `localStorage.theme`).

## Type

- **Archivo** (variable, width axis used): names, headings, navigation,
  labels, publication titles. The name on the home page is set wide
  (`wdth` 120) and heavy; that and the fingerprint are the only display moments.
- **Source Serif 4**: reading text, authors, venues, descriptions.
- Scale in `_tokens.scss` (`--fs-*`). Body is 18px serif with 1.62 leading.
  Keep reading text under about 66 characters per line (`--measure`).
- Sentence case everywhere. No all-caps labels, no eyebrow labels above
  headings, no arrows appended to links.

## Layout

- `.band`: the main section pattern. Heading (and a short note or link) in a
  left column that sticks while you scroll; content in the right nine columns.
  Collapses to one column under 860px.
- Rows separated by hairlines (`.rows`, `.entries`, `.pub`). No cards, no
  nested boxes, no shadows, no coloured side stripes.
- One radius (6px) for interactive controls and photos only.
- One primary button per section at most.

## Content sources (edit these, not the templates)

| What                     | Where                                                                                                                                                                                    |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Publications             | `_bibliography/papers.bib` (kept in sync by the Scholar Sync workflow). `selected = {true}` puts a paper on the home page; `projects = {...}` tags feed topic filters and project pages. |
| Research lines           | `_projects/*.md`. `papers_query` decides which papers appear on the project page and the paper count.                                                                                    |
| Students and alumni      | `_data/students.yml`                                                                                                                                                                     |
| Open PhD/MSc topics      | `_data/open_topics.yml`                                                                                                                                                                  |
| Grants                   | `_data/grants.yml` (`total_display` is shown as the total)                                                                                                                               |
| News                     | `_news/*.md`                                                                                                                                                                             |
| Research notes           | `_pages/note-*.md` with `layout: note`                                                                                                                                                   |
| CV entries, teaching     | front matter of `_pages/cv.html` and `_pages/teaching.html`                                                                                                                              |
| Home page featured paper | `featured:` in the front matter of `_pages/about.html`                                                                                                                                   |
| Navigation               | `_data/navigation.yml`                                                                                                                                                                   |
| Citation count, h-index  | `_data/scholar.yml` (updated by the Scholar stats workflow)                                                                                                                              |

## Checks before merging design changes

- `bundle exec jekyll build`, then look at desktop, mobile and dark mode.
- `npx impeccable detect <url>` should report no warnings.
- axe-core should report no WCAG 2.1 AA violations.
- PurgeCSS runs in the deploy workflow. Classes added only from JavaScript must
  appear literally in `site.js` or be listed in `purgecss.config.js`.
