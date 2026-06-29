# Project Experience — storytelling redesign (Work index + Case studies)

Date: 2026-06-29
Status: approved (direction + case-study architecture), building on branch `feat/project-experience-storytelling`.

## Goal

Translate the storytelling/motion DNA of kenanya.my.id into the existing **Night Shipyard**
identity (warm-dark, Bricolage, jade, git Ship Log) — without adopting its black/white + serif
look. Scope of *this* round: the **project experience** = the Work index (`/work`) and the
case-study pages (`/work/:slug`). Home, About, Contact are follow-ups.

### Governing constraint — anti-template

The owner's words: *"so it seems like a template and there is no story… I don't want it to be
like that."* Today every case study renders through one identical `problem → build → ship →
result` skeleton, so the third click is predictable. **Each project must feel individually
authored** — its own atmosphere and at least one bespoke "signature moment" the others don't
have — while still reading as one author's site.

## Architecture — "Spine + Signature" (approved)

A thin shared **evidence spine** carries the git thesis on every project; the **story** between
spine elements is composed from a small block library, and each project declares its own ordered
mix **plus one hand-built signature moment**. No two case studies share a section sequence.

### Per-project accent "worlds" (the cheap "shifting worlds")

Each project gets an `accent` key → a CSS variable `--color-accent` set on the case-study root
via `[data-accent="…"]`. Tailwind utilities `text-accent / bg-accent / border-accent` resolve to
it, so one datum re-tints a whole world. Accents live in `tokens.css` (token-only rule preserved),
AA-checked on both themes:

- `reel` → cinematic gold (amber family)
- `playground` → blueprint azure (new, AA ≥ 7:1 on dark)
- `jobfit` → privacy jade (= shipped)

### The spine (consistent on every case study)

1. **Immersive hero** — huge name, tagline, meta row (Role · Stack · Year · status), live/source
   links, set on a subtle per-project accent wash. (kenanya's hero device, our tokens.)
2. **Ship Log** — the real `shiplog.json` commit trail filtered by repo. The thesis, as evidence.
3. **Metric band** — `result.metrics`.
4. **Contextual CTA** — `project.cta` + "Arsenius is open to work".
5. **Next build** nav.

### The story blocks (the variable middle; each project orders its own)

Block components in `src/components/work/blocks/`:

- `ProseBlock` `{ kicker?, title, body }`
- `GalleryBlock` `{ images:[{src,alt}] }`
- `BuildLogBlock` `{ repo, beats }` — the numbered build beats with the GSAP scroll rail
  (extracted from today's `BuildSequence`; commit trail moves to the spine `ShipLog`).
- `ReleaseTimelineBlock` `{ releases }` — optional (React Playground v1→v2→v3).
- `SignatureBlock` `{ kind }` — dispatches to the bespoke component.

Renderer: `CaseStudy.jsx` maps `project.story[]` → block components by `type`, then renders the
spine. A block whose data is missing is skipped.

### The three signatures (chosen from each project's hardest real thing)

- **REEL → `ReelTicket`** (genuinely interactive): pick showtime + seat on a mini architectural
  seat map; a live price ticker updates; it renders a real scannable QR e-ticket stub. Honest —
  it is REEL's actual feature. Reduced motion / no-JS: static sample ticket.
- **React Playground → `PlaygroundRerender`** (live code behavior): a small live component; a
  button triggers a state change and the exact sub-tree that re-rendered flashes — a faithful
  re-creation of the real `useRenderFlash` hook. Reduced motion: flash replaced by a labelled
  outline + count.
- **JobFit → `JobFitBoundary`** (animated systems diagram): upgrade `JobFitVisual` so a request
  packet travels posting → content.js → background.js → Gemini and back, key/storage node stays
  lit, "nothing leaves the browser" emphasized. Reduced motion: the current static diagram.

All signatures honor `prefers-reduced-motion` and are keyboard-operable where interactive.

## Work index (`/work`)

- **Featured case studies** — hover-to-wake cards: cover grayscale + dimmed at rest, on hover it
  colorizes, the per-project accent edge appears, and the `hoverMetric` reveals; cursor label
  "read the build". `data-accent` per card so the wake color matches the world.
- **Domain filter** — chips `All · Web · ML · Computer Vision · Real-time 3D · Tooling`, filtering
  a unified view (case studies tagged `web`; selected work tagged by domain). Empty sections
  collapse gracefully. Default `All`. Keyboard + ARIA (`aria-pressed`).
- **Selected work** — same grayscale→accent hover treatment for consistency.

## Files

- `src/styles/tokens.css` — accent system (`--color-accent`, `--accent-*`, `[data-accent]`).
- `src/data/projects.js` — add `accent`, `domains`, `story[]`, optional `releases` per case study;
  `domains` on selected work.
- `src/components/work/blocks/*` — block components + `ShipLog`, `MetricBand` (extracted).
- `src/components/work/signatures/*` — `ReelTicket`, `PlaygroundRerender`, `JobFitBoundary`.
- `src/routes/CaseStudy.jsx` — spine + block renderer + `data-accent`.
- `src/components/work/CaseStudyHero.jsx` — immersive accent hero.
- `src/routes/Work.jsx` + `SelectedWorkGrid.jsx` — hover-to-wake + filter.
- Keep `BuildSequence.jsx` only if still referenced; otherwise remove after extraction.

## Quality gates (per project CLAUDE.md Phase 4–5)

- Playwright screenshots at desktop/tablet/mobile for `/work` and each `/work/:slug`, plus
  interaction states (card hover, each signature, filter active). Reviewed by eye for drift.
- `npm run build` clean; `npm test` green (add tests for the block renderer + filter logic).
- Lighthouse ≥ 95 (target 100) perf/a11y/best-practices/SEO; CLS 0.
- WCAG AA: accent contrast ≥ 4.5:1, visible focus, 44px targets, full keyboard nav, alt text.
- Console clean. No placeholder content; no fake screenshots (JobFit stays diagram).

## Out of scope (follow-ups)

Home guided-tour + shifting worlds; About git-history timeline; route page transitions.
