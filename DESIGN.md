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

**The research map.** The home page opens on a deep night-blue band with the
name set large and, under it, every paper as a coloured square: one column per
year, one colour per research line. Visitors hover or tap a square to read the
paper and click to open it; legend chips highlight one line. It is real data
(built from `papers.bib` at build time), so it updates itself as papers are
added, and it tells the lab's story at a glance: output growing from one paper
a year to about a dozen across seven lines.

- Code: `assets/js/paper-map.js` (canvas, no libraries), styles in
  `_sass/signal/_atlas.scss`, data from `_plugins/research-data.rb`
  (inlined on each page by `_includes/research_data.liquid`).
- The same map appears in three places: the home page (all papers, click
  opens a paper), Publications (click a year to filter, click a square to
  jump to the paper; it dims to whatever the filters show) and each research
  page (only that line's papers).
- The Lab page has a co-author network (`assets/js/coauthor-network.js`):
  128 people, sized and placed by papers shared with Chen, coloured by their
  main research line, with lab students ringed. Hover, drag, search by name,
  or highlight a line.

## Motion

Motion is tied to content and answers what the visitor does. All of it is off
under `prefers-reduced-motion` (the `motion-ok` class on `<html>` gates it).

- Map squares drop into their year column (on load in the hero, on scroll
  into view elsewhere); the network settles into place.
- Numbers under the maps tick up once they are fully in view (screen readers
  get the final value).
- Papers-per-year bars on research cards grow when the card scrolls in.
- Effects ported from 21st.dev components (Aceternity UI, Magic UI; MIT),
  rewritten in plain CSS and JS in `_sass/signal/_effects.scss` and `site.js`:
  - the hero claim decrypts from cipher glyphs once on load (`data-encrypt`),
    a nod to the encrypted-traffic work;
  - aurora fields in the research-line colours behind the hero, which lean
    toward the pointer and drift with scrolling;
  - spotlight research cards: a glow and lit border follow the pointer in
    the card's line colour;
  - "Published in" venue strip (`_data/venues.yml`), linking to a search on
    /publications/. It moves only while the page scrolls; an auto-looping
    marquee was tried and dropped as attention-seeking;
  - scroll timeline on Background and CV entries: the rail fills and dots
    light as entries pass;
  - border beam round the featured result, twice on arrival (under five
    seconds) and while hovered.
- Nothing moves on a timer for more than five seconds, so no pause control is
  needed (WCAG 2.2.2).
- Clicking a research card expands its illustration into the research page
  header (cross-document View Transitions; browsers without them just load
  the page).
- Decoration must carry information. An earlier random "flow fingerprint"
  drawing was removed in October 2026 because it looked like data but was not.

## Research line colours

Each research line has one colour, set in `_data/research_lines.yml` (light
and dark values) and exposed as `--line-<key>` CSS variables by
`_includes/line_colors.liquid`. The same colour marks the line everywhere: map
squares, legend chips, research cards and their papers-per-year charts, the
featured paper and the open PhD/MSc topics. Use these colours for marks and
fills, not for small text.

## Colour

| Token                 | Light                 | Dark                  | Use                                    |
| --------------------- | --------------------- | --------------------- | -------------------------------------- |
| `--paper`             | `#f7f8fa`             | `#0d1322`             | page background                        |
| `--ink`               | `#141b2d`             | `#e8ebf1`             | text                                   |
| `--ink-2` / `--ink-3` | `#454f63` / `#5d6679` | `#b3bbca` / `#98a1b3` | secondary text, meta                   |
| `--rule`              | `#d9dde5`             | `#263049`             | hairlines between rows                 |
| `--cobalt`            | `#2440c8`             | `#9aacff`             | links, buttons, focus                  |

All text pairs meet WCAG AA in both themes.
Dark mode follows the system unless the visitor picks a theme with the toggle
(stored in `localStorage.theme`).

## Type

- **Archivo** (variable, width axis used): names, headings, navigation,
  labels, publication titles. The name on the home page is set wide
  (`wdth` 120) and heavy; that is the only display moment.
- **Source Serif 4**: reading text, authors, venues, descriptions.
- Scale in `_tokens.scss` (`--fs-*`). Body is 18px serif with 1.62 leading.
  Keep reading text under about 66 characters per line (`--measure`).
- Sentence case everywhere. No all-caps labels, no eyebrow labels above
  headings, no arrows appended to links.

## Layout

- `.band`: the main section pattern. Heading (and a short note or link) in a
  left column that sticks while you scroll; content in the right nine columns.
  Collapses to one column under 860px.
- Lists are rows separated by hairlines (`.rows`, `.entries`, `.pub`).
- Cards are used only for things you click through to or that are featured:
  research line cards and the featured paper. They take a light wash of their
  line colour and a 14px radius. No nested cards, no shadows on cards, no
  coloured side stripes.
- 6px radius for controls; 14px for cards and the portrait.
- One primary button per section at most.

## Content sources (edit these, not the templates)

| What                     | Where                                                                                                                                                                                    |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Publications             | `_bibliography/papers.bib` (kept in sync by the Scholar Sync workflow). `selected = {true}` puts a paper on the home page; `projects = {...}` tags set each paper's research line, colour and filters. |
| Research lines           | `_projects/*.md`. `papers_query` decides which papers appear on the project page and the paper count.                                                                                    |
| Students and alumni      | `_data/students.yml`                                                                                                                                                                     |
| Open PhD/MSc topics      | `_data/open_topics.yml`                                                                                                                                                                  |
| Grants                   | `_data/grants.yml` (`total_display` is shown as the total)                                                                                                                               |
| News                     | `_news/*.md`                                                                                                                                                                             |
| Research notes           | `_pages/note-*.md` with `layout: note`                                                                                                                                                   |
| CV entries, teaching     | front matter of `_pages/cv.html` and `_pages/teaching.html`                                                                                                                              |
| Home page featured paper | `featured:` in the front matter of `_pages/about.html` (`line:` sets its colour)                                                                                                         |
| Research line colours    | `_data/research_lines.yml` (tags must match each project's `papers_query`)                                                                                                               |
| Navigation               | `_data/navigation.yml`                                                                                                                                                                   |
| Citation count, h-index  | `_data/scholar.yml` (updated by the Scholar stats workflow)                                                                                                                              |

## Checks before merging design changes

- `bundle exec jekyll build`, then look at desktop, mobile and dark mode.
- `npx impeccable detect <url>` should report no warnings.
- axe-core should report no WCAG 2.1 AA violations.
- PurgeCSS runs in the deploy workflow. Classes added only from JavaScript must
  appear literally in `site.js` or be listed in `purgecss.config.js`.
