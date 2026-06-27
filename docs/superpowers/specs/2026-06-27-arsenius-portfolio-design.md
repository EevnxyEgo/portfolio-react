# Arsenius Audley — Developer Portfolio · Design Spec

> Status: **awaiting review** · Date: 2026-06-27 · Owner: Arsenius Audley Wahyu Djatmiko
> This spec is the contract for the build. Code follows only after it is approved.

---

## 1. Thesis (the 10-second claim)

**Arsenius is a full-stack developer who finishes what he starts — design to deploy.**
Not "knows React and Node." *Finishes things, and finishes them well.* Every decision below
serves that one claim. The site's own craftsmanship is the primary evidence.

The argument is made **structurally, not stated**: the homepage opens with a *Ship Log* built
from real git commits and real deploys, so a visitor *sees* the finishing-instinct in the first
five seconds instead of reading a slogan about it.

## 2. Positioning & audience

- **Positioning:** Full-stack developer (AI-literate). ML/AI is shown as proven depth, not the headline.
- **Primary audience:** recruiters and hiring managers (technical and semi-technical) and potential clients.
- **Voice:** professional but approachable; clear and concise; technical when needed but legible to
  non-engineers; confident without corporate buzzwords. Calibrated to Josh Comeau's tone (warm, plain,
  precise). Active voice, specific over clever. **No invented facts or numbers — ever.**

## 3. Ground-truth content inventory

All facts below are sourced from Arsenius's CV, the three GitHub repos, GitHub's API, and his prior
portfolio deck. Nothing is invented. Where a metric appears, it is real and verifiable.

### Identity
- **Name:** Arsenius Audley Wahyu Djatmiko · display "Arsenius Audley"
- **Title:** Full-stack developer (AI-literate)
- **Education:** B. Computer Engineering, Institut Teknologi Sepuluh Nopember (ITS), GPA 3.72/4.00 (2021–2025)
- **Now:** Korea–ASEAN Digital Academy (KADA) Batch 4 — fully-funded AKCF/NIPA/Komdigi program, delivered by
  Elice, intensive 8-week full-stack track (Jun 15 – Aug 20, 2026)
- **Location:** Depok, West Java, Indonesia · open to remote
- **Availability:** **open to work**
- **Links:** GitHub github.com/EevnxyEgo · LinkedIn /in/arsenius-audley · Resume (Google Drive) ·
  Email arseniuswahyu@gmail.com · IG @arsen.audley

### Three deep case studies (full told stories)
1. **REEL** — a cinematic, editorial movie-booking experience. Pick a film, claim seats on a print-blueprint
   floor plan, leave with a real scannable, printable QR e-ticket. Reads TMDB live but never depends on it
   (curated 8-film offline fallback, zero broken images). **Next.js 16 · React 19 · Motion · Zustand · qrcode.**
   65 commits. Live: cinebook-advanced.vercel.app. 8 real screenshots available. Role: solo, AI-assisted.
2. **React Playground** — an interactive learn-by-doing app: master React from first component to interview-ready.
   19 hands-on modules + interview mastery + a live in-browser Jest/RTL test runner + a reconciliation
   visualizer. Custom `useRenderFlash()` hook flashes components exactly when React re-renders; the app's
   hand-rolled `useReducer`+Context store doubles as a worked example. **Vite · React 18 (plain JS) · Tailwind ·
   Sandpack · framer-motion · recharts.** 221 commits, shipped to v3.0.0. Live: my-react-project-omega-two.vercel.app.
   Role: solo, AI-assisted.
3. **JobFit** — a privacy-first Manifest V3 Chrome extension that scores how well your resume matches a job
   posting (0–100), drafts tailored cover letters, and one-click-autofills application forms — all on the
   user's own Gemini key, no server, no tracking. One `background.js` is the single boundary touching storage
   and the model. Manual-pick fallback for stale job-board selectors; `activeTab` model for autofill-anywhere;
   caches the most recent 200 analyses. **Plain JS/HTML/CSS, zero build step, Chrome APIs, Gemini.** 32 commits.
   Role: solo, AI-assisted.

### Selected work & experience (compact evidence, not full stories)
- **FitBuddy AI** — Next.js/TS voice fitness coach (Vapi voice agent + Gemini + Clerk auth + Convex DB + shadcn-ui). Solo.
- **Digital Twin Camera System** — ITS undergraduate **thesis**: a UE5 360° camera system with dynamic view control,
  4 camera types, an FSM for camera states, interpolation for smooth motion. Unreal Engine 5 · MetaHuman · Rokoko · C++ · Blender. Solo.
- **BAKI** — AI fitness app; real-time exercise detection + rep counting via ML Kit pose detection (33 landmarks). Kotlin · TensorFlow · OpenCV · Python. Role: ML developer (team). Best Final Project 2024, ITS Telematics Exhibition.
- **Healthylicious** — Bangkit capstone; recipe recommendation system. TensorFlow Recommenders · scikit-learn · Python. Role: ML developer (team).
- **41-Card Game** — Computer Vision course final; real-time CNN card detection (TensorFlow/Keras + OpenCV), custom dataset 500+ images/class. Solo.
- **Experience — Software Engineer Intern, PT IDstar Cipta Teknologi (Nov 2025 – May 2026):** automation workflows supporting 3,000+ recruitment processes; ~65% reduction in manual administrative workload; document processing cut from 2–3 hours to <10 minutes (Google Apps Script + AI APIs).
- **Bangkit Academy (Google, Tokopedia, Gojek, Traveloka) — ML Cohort graduate (A / 89.58):** selected 1 of 4,636 from 45,841 applicants.

> Curation rule: the three deep case studies are told as full problem → build → ship → result stories.
> Everything else appears as a tight, linked grid with true specifics. Depth on a few beats breadth on all.

## 4. Design system (the locked "blend" direction)

A blend of two explored directions: an engineering-native **Ship Log** structure with an **editorial serif** voice.
It rhymes with REEL's anti-AI-slop sensibility ("no neon, by design") so site and work feel made by one hand.

### Palette — tokens only (warm "Paper")
| Token | Hex | Role |
|---|---|---|
| `--paper` | `#F4F1EA` | Page background (warm bone) |
| `--paper-raised` | `#FFFDF8` | Cards, the Ship Log surface |
| `--ink` | `#16140F` | Primary text (warm near-black) |
| `--ink-soft` | `#5E5749` | Secondary text |
| `--ink-faint` | `#8A8474` | Muted labels, mono captions (only where ≥4.5:1 holds) |
| `--shipped` | `#0F6B47` | The single accent: emerald = shipped / passing (AA on paper) |
| `--shipped-bright` | `#1FA971` | "Live" indicator dot only — never text |
| `--rule` | `#DED7C7` | Hairline rules and borders |

No purple/blue gradients, no glassmorphism, no neon — by design. One accent, used to mean "shipped."
A **"Midnight" dark variant** is token-ready and **optional/stretch**; tokens are defined so it costs little.

### Typography — display / body / utility
- **Display & headlines →** `Newsreader` (editorial high-contrast serif). *Not* Instrument Serif; not the Fraunces REEL already uses.
- **Body & UI →** `Hanken Grotesk` (warm humanist grotesque). *Not* Inter/Geist/Space Grotesk.
- **Utility / code / Ship Log / metadata →** `JetBrains Mono`.
- Self-hosted via `@fontsource` (or Google Fonts) with `font-display: swap`; subset to used weights (400/500).

### Spacing, scale, corners
- 4px base spacing scale; generous whitespace. Type scale with strong display↔body contrast.
- Radius: 10–12px on cards; 0 radius on any single-sided rule. No bounce/elastic easing.

### Motion principles
- Transform/opacity only. Calm, deliberate. One well-orchestrated sequence beats five fade-ins.
- `Motion` (framer-motion successor) for component interactions; `GSAP + ScrollTrigger` for the Ship Log
  and the per-case-study build sequence. **`prefers-reduced-motion` respected everywhere** with a static,
  fully-legible fallback (the Ship Log becomes a plain list; no parallax).

## 5. Signature element — The Ship Log

A monospace build/deploy timeline rendered from **real git data**.

- **Source of truth:** `src/data/shiplog.json`, generated from the real commit history of the three repos
  (GitHub API / `git log`). Curated to true milestone commits + the real deploy events and dates. Entry shape:
  `{ date, repo, type: "init|feat|fix|chore|docs|deploy", message, url? }`.
- **Homepage:** a compact deploy log of the three products with real dates and a green `deployed ✓` terminus.
- **Case study:** the build sequence scrolls as a vertical Ship Log of that project's real commits, with the
  genuine `01 → 02 → …` step numbering (numbering is used *only* where it encodes a true sequence).
- **It is itself a craft proof:** parsing real commit data into a scroll-driven, reduced-motion-aware timeline
  is non-trivial frontend work — the medium demonstrates the message.

## 6. Information architecture

```
/                Home      — thesis hero + Ship Log + "Selected builds" index
/work            Work      — the three case studies (index) + selected-work grid
/work/reel       Case study (REEL)
/work/react-playground   Case study
/work/jobfit     Case study
/about           About     — bio, the range beat, experience, education, certs
/contact         Contact   — working form (Web3Forms) + booking/links
*                404       — as considered as the homepage; a "route not deployed" Ship-Log joke
```

### Page intents
- **Home:** hero is a thesis, not a stat block. Editorial serif headline, left-set, **no orb, no eyebrow pill**.
  Live status (open to work). The Ship Log is the hero artifact. Below: "Selected builds" — each case study a
  one-line told-story row; hover reveals one real metric. No decorative `01/02/03` at the index level.
- **Work / case study:** problem → build → ship → result. The *build* section is the scroll-driven Ship Log of
  real commits. *Result* uses true artifacts (live URL, real screenshots, a real before/after where one exists).
  Each case study ends with a specific, contextual next step: e.g. *"Want this kind of finish on your team?
  Arsenius is open to work →"*. Social proof only if real (skip otherwise).
- **About:** the bio (drafted from true facts, approved line-by-line), one deliberate "range" beat (web + ML +
  computer vision + a real-time 3D thesis), then experience/education/certs as evidence. KADA referenced accurately.
- **Contact:** the conversion moment. A real working form (see §7), plus email, GitHub, LinkedIn, resume.

## 7. Technical architecture

- **Framework:** Vite + React 18 + React Router (plain JavaScript, **no TypeScript**). Chosen over Next.js because
  it is the most literal reading of the standing "React-only" constraint, lighter, and well-suited to a
  frontend-course portfolio; the contact flow becomes a demonstrable client integration rather than a server gated behind keys.
- **Styling/tokens:** Tailwind CSS v4 (`@theme` token mapping) **plus** the palette as CSS custom properties.
  **No raw hex or arbitrary spacing outside the token system.**
- **Motion:** `motion` (component) + `gsap` with `ScrollTrigger` (scroll sequences). Optional `lenis` smooth scroll.
- **Icons:** `lucide-react` (consistent with Arsenius's own projects).
- **Command palette (`⌘K`):** custom-built, fully accessible (focus trap, roving focus, `aria` roles, Esc/arrow keys).
  Actions: navigate pages/case studies, jump to contact, copy email, open GitHub/LinkedIn/resume, toggle theme.
  Doubles as a frontend-craft proof.
- **SEO:** `react-helmet-async` for per-route `<title>`/meta/OG; a real, specific OG image and favicon; sitemap + robots.
- **Contact form:** posts to **Web3Forms** (no backend, free; access key in `VITE_WEB3FORMS_KEY`), client-side
  validation, success/error/loading states, honeypot spam field, and a graceful `mailto:` fallback if the key is absent.
- **Images:** compress the REEL screenshots (currently ~1.4MB each) to responsive AVIF/WebP; capture additional real
  screenshots from the live React Playground (Playwright); represent JobFit honestly (its real popup/options UI or
  an art-directed typographic card in REEL's fallback spirit — never a fake mockup).
- **Easter egg:** a styled `console.log` greeting for developers who open devtools (points to `⌘K` / GitHub).
- **Deploy:** Vercel (static SPA) with `vercel.json` SPA rewrite. Confirm OG, favicon, meta are real and specific.

### Data model (`src/data/`)
- `profile.js` — identity, links, availability, the one-line thesis.
- `projects.js` — the three case studies (problem/build/ship/result, stack, role, links, images) + selected-work entries.
- `shiplog.json` — real commit milestones + deploy events (see §5).
- `experience.js` — IDstar, Bangkit, education, certifications (true metrics only).

### Proposed structure
```
src/
  main.jsx · App.jsx (router + Helmet provider)
  styles/      tokens.css, base.css
  routes/      Home, Work, CaseStudy, About, Contact, NotFound
  components/
    layout/    Header, Footer, CommandPalette, ThemeToggle
    shiplog/   ShipLog, ShipLogEntry, BuildSequence
    work/      CaseStudyHero, ResultPanel, SelectedWorkGrid
    primitives/ Rule, Tag, Mono, Reveal, Magnetic, SeoHead
  hooks/       usePrefersReducedMotion, useCommandPalette, useShipLogScroll
  lib/         cn.js, format.js
  data/        profile.js, projects.js, shiplog.json, experience.js
  assets/      optimized images
```

## 8. Quality gates (must pass before "done")

- **AI-slop scan:** `impeccable` critique — zero unresolved flags. Hard-Nos checklist (below) all clear.
- **Accessibility:** WCAG 2.1 AA — contrast ≥4.5:1 body text, visible focus rings, 44px touch targets, full
  keyboard nav (incl. `⌘K` and the seat-of-the-site interactions), alt text on every image, reduced-motion honored.
- **Performance:** Lighthouse ≥95 on performance, accessibility, best practices, SEO.
- **Visual fidelity:** Playwright screenshots at desktop/tablet/mobile + interactive states, reviewed by eye against this spec.
- **Content integrity:** no lorem ipsum, no placeholder images, no broken `<img>`, no invented numbers.
- **Responsive:** real mobile width + 200% zoom, no breakage.

### Hard-Nos compliance (explicit)
No AI-palette gradients · no glassmorphism/neon/blurred orbs · no icon-tile-above-heading feature cards ·
no one-sided accent border on rounded cards · no eyebrow-pill + oversized-sentence hero · no decorative
`01/02/03` markers · not Inter/Geist/Space Grotesk/Instrument Serif · no buzzwords (streamline, empower,
supercharge, seamless, enterprise-grade) · ≤1–2 em-dashes/page, no manufactured-contrast aphorisms ·
no bounce/elastic easing, no scale-image-on-hover as default.

## 9. Build sequence (incremental milestones → commits)

1. `chore: scaffold Vite + React + Router, Tailwind v4, tokens` (Phase 0)
2. `feat(design-system): palette tokens, type, primitives, layout shell`
3. `feat(home): thesis hero + Ship Log signature`
4. `feat(nav): accessible header + ⌘K command palette`
5. `feat(work): case-study template + scroll build sequence`
6. `feat(work): REEL, React Playground, JobFit case studies + real imagery`
7. `feat(about): bio, range beat, experience/education`
8. `feat(contact): working Web3Forms flow + 404`
9. `perf/a11y: image optimization, focus states, reduced motion`
10. `chore(seo): meta, OG image, favicon, sitemap`
11. `polish: spacing rhythm, hover consistency, empty/loading states`
12. `chore(deploy): Vercel config`

Each milestone is verified (Playwright + the relevant gate) before the next.

## 10. Open items for review

- **Bio:** to be drafted from §3 facts in Arsenius's voice and approved line-by-line.
- **Web3Forms access key:** Arsenius to create one (free); until then the form runs in validated + `mailto` fallback mode.
- **Resume:** link to the Google Drive file, or host a copy in the repo? (default: link out.)
- **Dark "Midnight" theme:** optional/stretch — ship the light "Paper" theme first.
- **GitHub display handle:** `EevnxyEgo` shown as-is, or relabeled "GitHub"? (default: label "GitHub", link to the handle.)
