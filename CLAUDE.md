# Arsenius Audley — Developer Portfolio: Build Brief for Claude Code


## Ground truth

You are designing and building **[Arsenius Audley]'s** personal portfolio: a full-stack developer who ships complete, polished products end-to-end. That is the one belief this site has to leave behind within about 10 seconds. Not "knows React and Node" — *finishes things, and finishes them well*. Every decision below, including the decision to make the site itself flawless, is in service of that one claim. The site's own craftsmanship is the primary evidence for it.

The format is editorial and narrative: each project reads as a told story with a beginning, a build, and a result, not a card grid of screenshots. That's a deliberate choice with a known trap — see "name the trap" below.

**Stack constraint, non-negotiable:** React, plain JavaScript. No TypeScript.

## Hard nos

These are the most common tells of AI-generated UI right now. None of them are individually evil, but if more than one shows up here it reads as generated, not designed:

- Purple-to-blue gradients, or any "AI palette" gradient on text, buttons, or backgrounds
- Glassmorphism, neon glow, blurred orbs as default "cool"
- The icon-tile-above-heading feature card, repeated three or six times
- A thick colored border on one side of a rounded card (the single most recognizable AI tell)
- Hero eyebrow pill chip + an oversized full-sentence headline
- Numbered 01 / 02 / 03 section markers, unless the content is a genuine sequence
- Inter, Geist, Space Grotesk, or Instrument Serif as the only typeface
- Marketing buzzwords (streamline, empower, supercharge, world-class, enterprise-grade, seamless)
- More than one or two em-dashes per page, or copy that lands on a manufactured-contrast aphorism ("Not a tool. A platform.")
- Bounce/elastic easing, or scaling an image on hover as a default interaction

The full 46-pattern catalog is already installed via Impeccable — use it, don't just rely on this shortlist.

## Phase 0 — Setup

1. `npx create-next-app@latest . --js --eslint --tailwind --app` — App Router gets you real SEO and OG-image generation, plus a route handler for the contact form later. If you'd rather skip the meta-framework, Vite + React Router is the lighter alternative. Pick one and state why; don't leave it ambiguous.
2. If this repo doesn't already have it: `npx impeccable install`, then run `/impeccable init` to generate `PRODUCT.md` and `DESIGN.md`.
3. Confirm `ui-ux-pro-max` is available at `.claude/skills/ui-ux-pro-max`. If not: `uipro init --ai claude`.
4. Confirm Playwright is connected. You'll use it as a real visual check throughout Phase 3 and Phase 5, not just at the end — see Phase 4. If Stitch (Google's design MCP) is connected and you want it, confirm that too; it's optional, see Phase 2.
5. Do not write any UI code before Phase 2 is complete and I've approved a direction.

## Phase 1 — Interview me for content first

My project notes and bio are rough. Before designing anything, ask me directly for:

- Name, title, current availability (open to work, freelance, or just showcasing)
- 3 to 5 flagship projects. For each: what it does, who it's for, your actual role, the hardest technical problem you solved, the stack, and any real number you can point to (users, latency improvement, uptime, revenue — whatever's true; never invent one)
- My bio in my own words, pasted raw, not pre-polished
- Links: GitHub, LinkedIn, resume, live project URLs
- Two or three pieces of writing whose *voice* I'd want to sound like (not visuals)

Then write the actual copy yourself, in my voice:

- Active voice, specific over clever. "Cut p95 query time from 800ms to 60ms by rewriting the indexing strategy," not "Supercharged performance."
- No buzzwords, no AI cadence tells (see Hard Nos above), no "theater" framing for anything.
- Every claim has to be true and specific. If I haven't given you a number, don't write one.

## Phase 2 — Concept, before any code

This is the step that actually prevents the generic result, more than any tool does:

1. **Pull references first.** Browse Awwwards' Developer and Portfolio categories for current inspiration, and look at how Linear, Stripe, Vercel, and Raycast use restraint, typography, and motion — not to copy, but to calibrate the bar.
2. Run a starting design system through `ui-ux-pro-max`, e.g.:
   `python3 .claude/skills/ui-ux-pro-max/scripts/search.py "developer portfolio editorial scrollytelling build log" --design-system -p "[Your Name] Portfolio" --stack nextjs`
   Treat the output as raw material, not a final answer.
3. If Stitch (Google's design MCP) is connected and you want to use it here, generate two or three visual directions through it as more raw material — same brief, plain English. Pull down whatever it exports (its design-system file, tokens, screen markup) and treat it exactly like the `ui-ux-pro-max` output: raw material, not an answer. Stitch is built on a general-purpose model too, so it's just as capable of handing you the default look as avoiding it. Nothing it produces gets to skip step 6 below.
4. **Produce two or three distinct token systems** — whether sourced from Stitch, `ui-ux-pro-max`, or built by hand — each with: 4 to 6 named hex colors, a display/body/utility type pairing (not Inter, Geist, Space Grotesk, or Instrument Serif — those are as overused as Inter now), a one-paragraph layout concept with an ASCII wireframe, and one named **signature element**: the single thing this site gets remembered for.

   One seed idea to react to, not a mandate — invent your own and compare honestly against it: since the thesis is "ships complete things end-to-end," each case study could be structured like a literal deployment record — a build → ship → result arc with real artifacts (a commit timeline, a before/after metric, a terminal-style log) instead of a generic hero-stats-features layout. That's grounded in this person's actual working materials — git, terminal, metrics — rather than generic magazine typography.
5. **Name the trap you're in.** "Editorial/narrative" is one of the three looks every AI tool currently defaults to: hairline rules, zero border-radius, dense newspaper columns, applied regardless of subject. If your concept could be mistaken for that generic broadsheet treatment, it hasn't earned the word "editorial" yet. Revise until the editorial devices — rules, columns, dividers, any numbering — encode something true about *this* content (an actual build sequence, a real timeline) instead of decorating it.
6. Critique your own shortlist against this brief honestly. If a direction is what you'd produce for any generic "developer portfolio" prompt, cut it — including, and especially, if it came out of Stitch looking polished. Show me the survivor before building anything.

## Phase 3 — Build

Page by page, in order: Home → Work (case studies) → About → Contact.

- **Home**: the hero is a thesis, not a stat block. Open with the most characteristic thing in this person's actual work — a real project, a real line of code, a real before/after — not a generic "Hi, I'm [Name]" over a floating gradient orb.
- **Work**: each case study is a told story — problem, build, ship, result — using the signature treatment from Phase 2. End every case study with a specific, contextual next step, not just a nav link: "Need this for your team? [Name] is [available for contract work]." Include social proof only if it's real; skip it entirely rather than fabricate it.
- **Interactive, not decorative.** A `⌘K` command palette for navigation doubles as proof of frontend craft. A scroll-driven build sequence per case study. Hover states that reveal a metric or a code diff. A `console.log` easter egg for the developers who actually open devtools. Each interaction should demonstrate the thesis, not just exist for its own sake.
- **Contact is the conversion moment.** Build a real working contact form via a Next.js route handler plus an email service (Resend is a clean, current option), not just a `mailto:` link — a working full-stack contact flow is itself a small demonstration of "ships complete things end-to-end." Add a booking link alongside it if that's relevant to you.
- **Motion**: Motion (the Framer Motion successor) for component-level interactions, GSAP with ScrollTrigger for the scroll-driven case-study sequences. One well-orchestrated sequence beats five scattered fade-ins. Respect `prefers-reduced-motion` everywhere.
- **Tokens**: define the Phase 2 system as CSS variables or a Tailwind theme extension, and never write a raw hex value or arbitrary spacing number outside it.

## Phase 4 — Look at what you built, before moving on

You have Playwright connected as a real visual check, not just a code reader. Use it as one, continuously, not only at the end:

- After building each page or major component, navigate to it with Playwright and screenshot it at desktop, tablet, and mobile widths.
- Look at the screenshot directly and check it against three things: the Phase 2 token system and signature element (does this actually look like what was designed, or did the styling drift mid-build?), the Hard Nos list, and the 10-second thesis test (does a stranger looking at this still land on "ships complete things end-to-end"?).
- Use Playwright to interact, not just look. Hover the elements that are supposed to reveal something, trigger the command palette, tab through with the keyboard, toggle `prefers-reduced-motion`, and screenshot each state. A static screenshot won't catch a hover state that never fires or a focus ring that's invisible.
- If what's on screen doesn't match what was designed, fix it before starting the next page. Don't let drift accumulate and try to catch it all in Phase 5.
- Keep these screenshots — they're the evidence for the visual fidelity check below.

## Phase 5 — Critique, a hard gate

Don't call anything finished until all of these pass:

| Check | Tool | Bar |
|---|---|---|
| AI-slop pattern scan | `npx impeccable detect` or `/impeccable critique` | Zero unresolved flags |
| Visual fidelity | Playwright screenshots, reviewed by eye, across desktop/tablet/mobile and interactive states | Matches the locked Phase 2 concept; no drift between pages |
| Technical audit | `/impeccable audit` | No P0 or P1 issues |
| Accessibility | WCAG 2.1 AA: contrast ≥4.5:1 on body text, visible focus states, 44px touch targets, full keyboard nav, alt text | Full pass |
| Performance | Lighthouse | ≥95 on performance, SEO, best practices, and accessibility |
| Self-critique | First impression, hierarchy, consistency | Run it on your own work before I see it |
| Copy | Reread every line: would a real engineer actually say this? | No buzzwords, no AI cadence |
| Content integrity | No lorem ipsum, no placeholder images, no broken `<img>` | Zero instances |
| Responsive | Real mobile width plus 200% zoom | No breakage |

## Phase 6 — Polish, then ship

Run `/impeccable polish` for the gap between good and great: spacing rhythm, hover-state consistency, loading states, empty states, and a 404 page that's as considered as the homepage. Deploy to Vercel. Confirm the OG image, favicon, and meta description are real and specific to this person, not framework defaults.

## What "selling" actually means here

Not louder calls to action — trustworthy specificity. A recruiter or client should look at one case study and believe, concretely, that this person can do the same for them. Conversion is a side effect of the site being true and well-made, not a layer of persuasion bolted on top of it.