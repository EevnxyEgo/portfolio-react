# Arsenius Audley Portfolio — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans (inline) or
> superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox
> (`- [ ]`) syntax for tracking.

**Goal:** Build a polished, production-grade personal portfolio for Arsenius Audley that proves, in 10
seconds, "full-stack developer who finishes what he starts," using a real-git-commit "Ship Log" as its signature.

**Architecture:** Vite + React SPA, React Router for pages. Design tokens as CSS variables + Tailwind v4
`@theme`. Component-level motion via `motion`; scroll-driven sequences via GSAP/ScrollTrigger. Content lives
in plain-JS data modules; the Ship Log reads a generated `shiplog.json` of real commits. Contact posts to
Web3Forms with a `mailto:` fallback. Deploy static to Vercel.

**Tech Stack:** React 18, react-router-dom v6, Tailwind CSS v4 (`@tailwindcss/vite`), motion, gsap +
ScrollTrigger, lucide-react, react-helmet-async, @fontsource (Newsreader, Hanken Grotesk, JetBrains Mono),
Vitest + @testing-library/react (logic tests), Playwright (visual checks).

## Global Constraints

- **Language:** plain JavaScript, **no TypeScript**. React only.
- **Tokens:** never write a raw hex or arbitrary spacing value outside the token system (`tokens.css` / Tailwind `@theme`).
- **Palette:** paper `#F4F1EA` · raised `#FFFDF8` · ink `#16140F` · ink-soft `#5E5749` · ink-faint `#8A8474` · shipped `#0F6B47` · shipped-bright `#1FA971` · rule `#DED7C7`.
- **Type:** display `Newsreader`; body `Hanken Grotesk`; mono `JetBrains Mono`. Never Inter/Geist/Space Grotesk/Instrument Serif/Fraunces.
- **No invented facts/numbers.** Every claim sourced from the spec's §3 inventory.
- **Hard-Nos:** no AI gradients, glassmorphism, neon/orbs, icon-tile feature cards, one-sided accent borders on rounded cards, eyebrow-pill hero, decorative 01/02/03, buzzwords, bounce/elastic easing, scale-image-on-hover.
- **A11y:** WCAG 2.1 AA — contrast ≥4.5:1 body, visible focus, 44px targets, full keyboard nav, alt text, `prefers-reduced-motion` honored.
- **Perf target:** Lighthouse ≥95 performance/a11y/best-practices/SEO.
- **Voice:** professional-approachable, clear, active voice; Josh-Comeau-calibrated; ≤1–2 em-dashes/page.

---

### Task 0: Scaffold project + tooling

**Files:**
- Create: `package.json`, `vite.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`, `src/styles/tokens.css`, `src/styles/base.css`, `.env.example`, `vercel.json`, `vitest.config.js`
- Create: `src/routes/Home.jsx` (placeholder)

**Interfaces:**
- Produces: a running dev server at `:5173`; `App` mounts a `BrowserRouter` + `HelmetProvider`; tokens available as CSS vars + Tailwind classes.

- [ ] Step 1: Create `package.json` with deps (react, react-dom, react-router-dom, motion, gsap, lucide-react, react-helmet-async, @fontsource/newsreader, @fontsource/hanken-grotesk, @fontsource/jetbrains-mono) + dev (vite, @vitejs/plugin-react, tailwindcss@4, @tailwindcss/vite, vitest, jsdom, @testing-library/react, @testing-library/jest-dom).
- [ ] Step 2: `npm install`.
- [ ] Step 3: Configure `vite.config.js` (react + tailwind plugins), `vitest.config.js` (jsdom env).
- [ ] Step 4: Write `tokens.css` (`:root` CSS vars + Tailwind `@theme inline` mapping) and `base.css` (resets, font faces, focus-visible ring, reduced-motion base).
- [ ] Step 5: `index.html` + `main.jsx` (mount App, import fonts/tokens/base) + `App.jsx` (router with a placeholder Home).
- [ ] Step 6: **Verify:** `npm run dev` serves a paper-background page with serif "Arsenius Audley"; `npm run build` succeeds.
- [ ] Step 7: Commit `chore: scaffold Vite + React + Router, Tailwind v4, design tokens`.

### Task 1: Content data + real Ship Log generation

**Files:**
- Create: `src/data/profile.js`, `src/data/projects.js`, `src/data/experience.js`, `src/data/shiplog.json`
- Create: `scripts/build-shiplog.mjs` (reads real commit data, writes `shiplog.json`)
- Test: `src/data/__tests__/shiplog.test.js`

**Interfaces:**
- Produces: `profile` (name, title, location, availability, links, thesis); `projects` (array; each `{slug, name, tagline, problem, build[], ship, result, stack[], role, links, images[], metric}`); `experience` (array); `shiplog` entries `{date:ISO, repo, type, message, url?}`.

- [ ] Step 1: Write `shiplog.test.js` — assert every entry has a valid ISO `date`, a `repo` in the known set, a `type` in `[init,feat,fix,chore,docs,deploy]`, and that entries are sorted descending by date.
- [ ] Step 2: Run test → FAIL (no data).
- [ ] Step 3: Author `shiplog.json` from the real commits already collected (REEL/React Playground/JobFit milestones + real deploy events). Author `profile.js`, `projects.js`, `experience.js` from spec §3 (true facts only).
- [ ] Step 4: Run test → PASS.
- [ ] Step 5: Commit `feat(data): real content modules + ship log from actual commits`.

### Task 2: Primitives + layout shell

**Files:**
- Create: `src/lib/cn.js`, `src/components/primitives/{Rule,Tag,Mono,Reveal,SeoHead}.jsx`, `src/hooks/usePrefersReducedMotion.js`
- Create: `src/components/layout/{Header,Footer}.jsx`
- Test: `src/components/primitives/__tests__/Reveal.test.jsx`

**Interfaces:**
- Produces: `<Reveal>` (motion fade/translate, no-op under reduced motion), `<SeoHead title description>`, `<Header>` (wordmark + nav + ⌘K affordance), `<Footer>`.

- [ ] Step 1: Test `Reveal` renders children and, when `prefers-reduced-motion` mocked reduced, applies no transform.
- [ ] Step 2: FAIL → implement primitives → PASS.
- [ ] Step 3: Build `Header`/`Footer` per tokens; nav links to routes.
- [ ] Step 4: **Verify (Playwright):** header shows mono `aawd` wordmark + work/about/contact + ⌘K hint; keyboard-tabbable with visible focus.
- [ ] Step 5: Commit `feat(design-system): primitives + layout shell`.

### Task 3: Home — thesis hero + Ship Log signature

**Files:**
- Create: `src/routes/Home.jsx`, `src/components/shiplog/{ShipLog,ShipLogEntry}.jsx`, `src/components/work/SelectedBuilds.jsx`, `src/hooks/useShipLogScroll.js`

**Interfaces:**
- Consumes: `profile`, `shiplog`, `projects`. Produces: `<ShipLog entries variant="hero|sequence">`.

- [ ] Step 1: Build hero (Newsreader headline, status row, no orb/eyebrow) + `ShipLog` hero variant from real entries with green `deployed ✓` terminus.
- [ ] Step 2: `SelectedBuilds` index — each case study a one-line told-story row; hover reveals one real metric (no decorative numbering).
- [ ] Step 3: GSAP/ScrollTrigger reveal for log entries; static list under reduced motion.
- [ ] Step 4: **Verify (Playwright):** screenshot desktop/tablet/mobile; matches the locked hero; thesis legible in 10s; Hard-Nos clear.
- [ ] Step 5: Commit `feat(home): thesis hero + ship log signature`.

### Task 4: Accessible ⌘K command palette

**Files:**
- Create: `src/components/layout/CommandPalette.jsx`, `src/hooks/useCommandPalette.js`
- Test: `src/components/layout/__tests__/commandPalette.test.jsx`

**Interfaces:**
- Produces: palette opened by ⌘/Ctrl+K; actions: navigate pages/case studies, copy email, open GitHub/LinkedIn/resume.

- [ ] Step 1: Test — filtering "reel" yields the REEL action; Esc closes; arrow keys move active index; Enter invokes.
- [ ] Step 2: FAIL → implement (focus trap, roving `aria-activedescendant`, `role=dialog`) → PASS.
- [ ] Step 3: **Verify (Playwright):** Ctrl+K opens, type filters, Enter navigates, focus returns to trigger on close.
- [ ] Step 4: Commit `feat(nav): accessible command palette`.

### Task 5: Case-study template + scroll build sequence

**Files:**
- Create: `src/routes/CaseStudy.jsx`, `src/components/work/{CaseStudyHero,BuildSequence,ResultPanel}.jsx`, `src/routes/Work.jsx`

**Interfaces:**
- Consumes: `projects` by `slug` param. Produces: problem → build → ship → result layout; `BuildSequence` renders the project's real commits as a numbered Ship Log; ends with a contextual CTA.

- [ ] Step 1: `Work` index + routed `CaseStudy` reading `useParams().slug`.
- [ ] Step 2: `BuildSequence` scroll-pins the commit timeline (GSAP); numbering only here (true sequence).
- [ ] Step 3: `ResultPanel` uses real artifacts (live URL, screenshots, real before/after where one exists).
- [ ] Step 4: **Verify (Playwright):** each of `/work/{reel,react-playground,jobfit}` renders full story, real imagery, working live links, reduced-motion fallback.
- [ ] Step 5: Commit `feat(work): case-study template + 3 real case studies`.

### Task 6: Imagery pipeline (real screenshots, optimized)

**Files:**
- Create: `src/assets/work/*` (optimized), `scripts/optimize-images.mjs`

- [ ] Step 1: Compress REEL's 8 screenshots to responsive AVIF/WebP (<200KB each).
- [ ] Step 2: Capture real React Playground screenshots from the live demo (Playwright); represent JobFit via its real popup/options UI or an art-directed typographic card (never a fake mockup).
- [ ] Step 3: **Verify:** every `<img>` resolves, has `alt`, and lazy-loads below the fold.
- [ ] Step 4: Commit `perf(assets): optimized real project imagery`.

### Task 7: About page

**Files:**
- Create: `src/routes/About.jsx`, `src/components/about/{ExperienceList,RangeBeat}.jsx`

- [ ] Step 1: Draft bio from spec §3 facts (Josh-Comeau voice) — author for line-by-line approval.
- [ ] Step 2: One deliberate "range" beat (web + ML + CV + UE5 thesis); then experience/education/certs as evidence; KADA accurate.
- [ ] Step 3: **Verify (Playwright):** responsive, no buzzwords, no invented numbers.
- [ ] Step 4: Commit `feat(about): bio, range beat, experience`.

### Task 8: Contact (working) + 404

**Files:**
- Create: `src/routes/Contact.jsx`, `src/components/contact/ContactForm.jsx`, `src/routes/NotFound.jsx`, `src/lib/validateContact.js`
- Test: `src/lib/__tests__/validateContact.test.js`

**Interfaces:**
- Produces: `validateContact({name,email,message}) -> {ok, errors}`; form posts to Web3Forms (`VITE_WEB3FORMS_KEY`) with `mailto:` fallback, honeypot, loading/success/error states.

- [ ] Step 1: Test `validateContact` — empty name/invalid email/short message produce field errors; valid input `ok:true`.
- [ ] Step 2: FAIL → implement validator → PASS.
- [ ] Step 3: Build form (labels, `aria-invalid`, error text, honeypot, states) + 404 styled as a "route not deployed" Ship-Log joke with a way home.
- [ ] Step 4: **Verify (Playwright):** invalid submit shows errors; valid submit hits success path (mock); 404 renders for unknown routes.
- [ ] Step 5: Commit `feat(contact): working form + considered 404`.

### Task 9: SEO, OG image, favicon, console easter egg

**Files:**
- Create: `public/favicon.svg`, `public/og.png` (or generated), `public/robots.txt`, `public/sitemap.xml`; modify `src/main.jsx` (console greeting)

- [ ] Step 1: Per-route `SeoHead` (title/description/canonical/OG) on every page.
- [ ] Step 2: Real, specific OG image + favicon (not framework default); robots + sitemap.
- [ ] Step 3: Styled `console.log` greeting pointing to ⌘K / GitHub.
- [ ] Step 4: **Verify:** view-source shows unique titles/meta per route.
- [ ] Step 5: Commit `chore(seo): meta, OG, favicon, sitemap, console egg`.

### Task 10: Polish + a11y/perf gates

- [ ] Step 1: Spacing rhythm, hover-state consistency, loading/empty states.
- [ ] Step 2: Full keyboard pass; visible focus everywhere; 44px targets; contrast audit.
- [ ] Step 3: `prefers-reduced-motion` audit across all motion.
- [ ] Step 4: **Verify:** Lighthouse ≥95 on all four; impeccable critique zero flags; Playwright desktop/tablet/mobile + 200% zoom clean.
- [ ] Step 5: Commit `polish: a11y, performance, responsive hardening`.

### Task 11: Deploy

- [ ] Step 1: `vercel.json` SPA rewrite; confirm build output.
- [ ] Step 2: Deploy to Vercel; confirm OG/favicon/meta live and links resolve.
- [ ] Step 3: Commit `chore(deploy): vercel config`.

---

## Self-Review

- **Spec coverage:** §4 design system → Tasks 0,2. §5 Ship Log → Tasks 1,3,5. §6 IA/pages → Tasks 3,5,7,8. §7 tech (palette, ⌘K, contact, imagery, easter egg, deploy) → Tasks 0,4,6,8,9,11. §8 gates → Task 10. §9 sequence → mirrored. All covered.
- **Placeholder scan:** logic tasks (1,4,8) carry real assertions; visual tasks carry explicit Playwright acceptance criteria rather than fake unit tests (deliberate).
- **Type consistency:** `shiplog` entry shape, `projects` shape, and `validateContact` signature are defined once and reused. `<ShipLog variant>` used consistently in Tasks 3 and 5.
