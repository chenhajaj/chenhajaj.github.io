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
a year to about a dozen across six lines.

- Code: `assets/js/paper-map.js` (canvas, no libraries), styles in
  `_sass/signal/_atlas.scss`, data from `_plugins/research-data.rb`
  (inlined on each page by `_includes/research_data.liquid`).
- The same map appears in three places: the home page (all papers, click
  opens a paper), Publications (click a year to filter, click a square to
  jump to the paper; it dims to whatever the filters show) and each research
  page (only that line's papers).
- The Lab page has a co-author network (`assets/js/coauthor-network.js`):
  every co-author as an equal-size dot, grouped into a sector per research
  line and coloured by it, with lab students ringed. Names show only on hover
  or search. Size and distance deliberately do not encode how often someone
  co-authors with Chen (Chen's call: it should read as breadth, not
  dependence). Hover, drag, search by name, or highlight a line.

## Motion

Motion is tied to content and answers what the visitor does. All of it is off
under `prefers-reduced-motion` (the `motion-ok` class on `<html>` gates it).

- Map squares drop into their year column (on load in the hero, on scroll
  into view elsewhere). The co-author network has no physics: each research
  line gets an elliptical sector with its label, and the dots ease into place
  in about a second.
- Numbers under the maps tick up once they are fully in view (screen readers
  get the final value).
- Effects ported from 21st.dev components (Aceternity UI, Magic UI; MIT),
  rewritten in plain CSS and JS in `_sass/signal/_effects.scss` and `site.js`:
  - the hero claim decrypts from cipher glyphs once on load (`data-encrypt`),
    a nod to the encrypted-traffic work;
  - aurora fields in the research-line colours behind the hero, which lean
    toward the pointer and drift with scrolling;
  - spotlight research cards: a glow and lit border follow the pointer in
    the card's line colour;
  - "Published in" venue strip (`_data/venues.yml`), linking to a search on
    /publications/. It rotates continuously (Chen's call) and speeds up with
    scrolling, capped at twice its resting speed; hover pauses it and a pause button stops it (WCAG 2.2.2), the
    choice is remembered, and keyboard focus lays it out flat;
  - scroll timeline on Background and CV entries: the rail fills and dots
    light as entries pass;
  - border beam round the featured result, twice on arrival (under five
    seconds) and while hovered.
- Apart from the venue strip, which has a pause button, nothing moves on a
  timer for more than five seconds (WCAG 2.2.2).
- More from 21st.dev (October 2026): floating pill header on scroll (desktop),
  blur-fade reveals (a 240 ms fade with no blur on touch screens), flip words in the lab line,
  shimmer on buttons, dot-grid "join the lab" card, tracing beam on notes.

### Motion rules (Emil Kowalski's design-engineering skills)

The skills live in `.claude/skills/` (emil-design-eng, review-animations,
animation-performance, mobile-native, improve-animations,
find-animation-opportunities; MIT). Rules this site follows:

- Easing tokens: `--ease-out` (cubic-bezier(0.23, 1, 0.32, 1)) for anything
  entering or responding, `--ease-in-out` for movement on screen, `linear`
  for constant motion (the venue strip). Never `ease-in`, never
  `transition: all`.
- Animate `transform` and `opacity` only. The floating header fades and lifts
  a pill layer; it never animates width or padding.
- Never drive per-frame motion through a CSS variable on a parent (it
  restyles every child). Pointer and scroll effects write `transform` on one
  element, spring-smoothed (`follower()` in site.js). The venue strip is a
  Web Animation, so it runs off the main thread.
- No `filter: blur()` on large layers (the aurora uses soft gradients only);
  animated blur stays at 6 px or less.
- Pressable controls scale to 0.97 on `:active` (160 ms).
- Hover motion only under `(hover: hover) and (pointer: fine)`; phones get no
  sticky zooms or shimmers after a tap.
- Reduced motion keeps colour and opacity changes and drops movement.
- Research cards have no tilt; they press (scale 0.97) like other controls.
- The theme switch is a single 220 ms crossfade.
- Clicking a research card expands its illustration into the research page
  header (cross-document View Transitions; browsers without them just load
  the page). The research page header shows that one illustration with the line's
  stats under the title; there is no second map lower on the page.
- Decoration must carry information. An earlier random "flow fingerprint"
  drawing was removed in October 2026 because it looked like data but was not.

## Visual layer (October 2026)

Chen asked for a less text-heavy, more inviting site. Lists became pictures
built from the same data (`_sass/signal/_visual.scss`), never decoration:

- **Icons** (`_includes/icon.liquid`, Lucide-style strokes, ISC) sit in tinted
  tiles (`.icon-tile`) coloured by the item's research line.
- **People**: initials avatars (`_includes/avatar.liquid`) in the colour of
  each student's research line (the line they publish in most with Chen, else
  a keyword match on their topic; `student_line` in `research-data.rb`, or set
  `line:` in `students.yml`). Lab page cards, alumni wall, home face row.
- **News**: cards with an icon for the kind (`kind:` paper, talk, award, grant,
  student) and the line colour (`line:`) from each `_news/*.md` front matter.
- **Funding**: the total in shekels, rounded to the nearest ₪100,000, then a
  list of grants, newest first, each with a swatch in its line colour
  (`line:` in `grants.yml`), solid for PI and hatched for co-PI. Amounts of
  individual grants are never shown (Chen's call), so there is no bar chart.
  All amounts are kept in shekels; grants first recorded in dollars were
  converted at the award year's average rate (see `grants.yml`).
- **People on this line** (research pages): top co-authors in that line with
  joint-paper counts and years; lab students ringed.
- Both are built at build time (`_plugins/lab-charts.rb`, styles in
  `_sass/signal/_charts.scss`), with no JavaScript.
- **Paper map lenses** (Publications): "Colour by" research line, venue tier
  (CORE A*/A or SJR Q1, CORE B or SJR Q2, other refereed, not refereed) or who
  led (student, Chen first author, a co-author). Tier and lead per paper come
  from `research-data.rb`. Highlights, filters and lens changes crossfade over
  about 200 ms; tooltips fade in over 140 ms (instant under reduced motion).
- **Career**: timeline of institution bands and milestones from
  `_data/career.yml` (home Background and CV). Vertical list on phones.
- **CV**: stat tiles, reviewing bar chart (ORCID data), award cards.
- **Selected papers** (home) and **research notes** show their line's
  picture; **courses**, **repositories** and **contact routes** are icon cards.

Cards are now used for these grouped items too (not only click-throughs),
always flat: a 5% line-colour wash, a hairline ring, 14px radius, no shadows
and no side stripes.

## Venue tags on publications

Conference papers carry a CORE tag (rank in the CORE edition in force when the
paper appeared; `_data/core_ranks.yml` from `scripts/core-ranks/update.py`).
Journal papers carry an SJR tag (the journal's best SCImago quartile in the
year the paper appeared, the latest SJR year for newer papers;
`_data/sjr_quartiles.yml` from `scripts/sjr/update.py`, which matches by name
and pins journals that share a name, such as MDPI Electronics, by ISSN).
"Student-led" marks papers whose first author is a lab member. The CV's
"At a glance" tiles count Q1 journal papers and CORE A*/A conference papers.

## Research line illustrations (October 2026)

Research cards and research page headers show each line's illustration
(project `img`). Chen preferred them to the data covers tried in October 2026,
and asked for the scroll-driven "lab, year by year" replay and the "from first
paper to graduation" chart to be dropped. Under 640px the research cards
become compact rows (88px thumbnail, title, one line of description, paper
count), so the section fits about one phone screen. Styles in
`_sass/signal/_covers.scss`.

## Explainer figures (October 2026)

Each explainer opens with one figure that shows the idea before the text
explains it (`figure:` in the explainer's front matter picks
`_includes/figures/<name>.liquid` through a `case` list in
`_layouts/note.liquid`, so a new figure needs a line there; styles in `_sass/signal/_figures.scss`).
Figures are inline SVG or HTML coloured by tokens, so they follow light and
dark mode, carry a text alternative, and use only facts from the papers:

- `cbr`: retraining loop versus classification by retrieval (new app added
  as a few points; a far-away flow flagged as unknown).
- `deployable`: Random Forest versus retrieval on six deployment criteria,
  numbers from the Computer Networks paper's abstract.
- `shared_problem`: the three failure modes network security and clinical ML
  share, and the methods the lab carries between them.
- `pqc`, `winner`, `rejection`, `captcha`, `coldstart`, `critique`: the six
  explainers added 31 Oct 2026 (post-quantum fingerprint, evaluation protocol,
  rejection rate, cleaner CAPTCHAs, cold start, design critiques). Numbers
  come from each paper's abstract or tables; the critique strip is labelled
  as a schematic.

## Our own work and explainers on the home page (October 2026)

- **From our lab** replaces "Selected papers": six recent refereed papers
  (last four years) that Chen or a lab student led as first author. Picked at build time in `research-data.rb` (`showcase`):
  scored for Chen first author, student first author, small team, venue
  tier, having an explainer and recency, at most two per research line. A bib
  entry can opt in or out with `showcase = {true}` / `{false}`.
- **In plain words**: the newest explainer from each of three research lines,
  linking to all explainers. Research pages list their line's explainers,
  and Publications shows an "Explainer" link on the papers an explainer
  covers (`line:` and `papers:` in each explainer's front matter).

## Explainer images (October 2026)

Each explainer has a 16:9 cover (`image:` in front matter, files in
`assets/img/explainers/`), shown on its card and as a 21:8 banner under the
title, and used as its share image (`og_image:`). The covers were drawn in
code to match the research-line illustrations: glowing line art on deep navy
(and a warm watercolour sketch for design education). The generator is a
single canvas page with one seeded scene per explainer, rendered with
Playwright at 1600×900; it lives outside the repo, so replace a cover by
dropping a new 16:9 image at the same path.

## Funders, partners and lab life (October 2026)

The home page's "Funding and partners" section lists funders and partners by
name (`_data/partners.yml`; no logos, no amounts). The Lab page's "Lab life"
cards come from `_data/lab_life.yml`: real events only, newest first, an icon
tile per card instead of photos (not every student has one).

## Research line colours

Each research line has one colour, set in `_data/research_lines.yml` (light
and dark values) and exposed as `--line-<key>` CSS variables by
`_includes/line_colors.liquid`. The same colour marks the line everywhere: map
squares, legend chips, research cards, the
featured paper and the open PhD/MSc topics. Use these colours for marks and
fills, not for small text.

## Colour

| Token                 | Light                 | Dark                  | Use                    |
| --------------------- | --------------------- | --------------------- | ---------------------- |
| `--paper`             | `#f7f8fa`             | `#0d1322`             | page background        |
| `--ink`               | `#141b2d`             | `#e8ebf1`             | text                   |
| `--ink-2` / `--ink-3` | `#454f63` / `#5d6679` | `#b3bbca` / `#98a1b3` | secondary text, meta   |
| `--rule`              | `#d9dde5`             | `#263049`             | hairlines between rows |
| `--cobalt`            | `#2440c8`             | `#9aacff`             | links, buttons, focus  |

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
- Cards hold things you click through to, featured items, and the grouped
  items of the visual layer (see above). They take a light wash of their line
  colour and a 14px radius. No nested cards, no shadows on cards, no coloured
  side stripes.
- 6px radius for controls; 14px for cards and the portrait.
- One primary button per section at most.

## Content sources (edit these, not the templates)

| What                     | Where                                                                                                                                                                                                  |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Publications             | `_bibliography/papers.bib` (kept in sync by the Scholar Sync workflow). `selected = {true}` puts a paper on the home page; `projects = {...}` tags set each paper's research line, colour and filters. |
| Research lines           | `_projects/*.md`. `papers_query` decides which papers appear on the project page and the paper count.                                                                                                  |
| Students and alumni      | `_data/students.yml`                                                                                                                                                                                   |
| Open PhD/MSc topics      | `_data/open_topics.yml`                                                                                                                                                                                |
| Grants                   | `_data/grants.yml` (amounts in shekels; only the rounded total is shown)                                                                                                                               |
| News                     | `_news/*.md`                                                                                                                                                                                           |
| Research notes           | `_pages/note-*.md` with `layout: note`                                                                                                                                                                 |
| CV entries, teaching     | front matter of `_pages/cv.html` and `_pages/teaching.html`                                                                                                                                            |
| Home page featured paper | `featured:` in the front matter of `_pages/about.html` (`line:` sets its colour)                                                                                                                       |
| Research line colours    | `_data/research_lines.yml` (tags must match each project's `papers_query`)                                                                                                                             |
| Navigation               | `_data/navigation.yml`                                                                                                                                                                                 |
| Citation count, h-index  | `_data/scholar.yml` (updated by the Scholar stats workflow)                                                                                                                                            |

## Checks before merging design changes

- `bundle exec jekyll build`, then look at desktop, mobile and dark mode.
- `npx impeccable detect <url>` should report no warnings.
- axe-core should report no WCAG 2.1 AA violations.
- `python3 scripts/visual-qa/qa.py _site` runs both, plus two scroll-position
  checks adapted from scroll-craft (MIT): it scrolls each page like a visitor
  and fails on text that never reaches full opacity, or whose contrast against
  the pixels actually behind it (gradients, the hero glow, canvases, images)
  drops below AA at any position. Covered text (under the sticky header) and
  endless ambient motion are ignored; finite animations are allowed to finish.
- PurgeCSS runs in the deploy workflow. Classes added only from JavaScript must
  appear literally in `site.js` or be listed in `purgecss.config.js`.
