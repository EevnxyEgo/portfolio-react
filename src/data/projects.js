// The three deep case studies + the compact "selected work" grid.
// `repo` matches the `repo` field in shiplog.json so a case study can show its real commit timeline.
// Image paths point at /work/* in public/ (added, optimized, in the imagery task).

export const caseStudies = [
  {
    slug: 'reel',
    repo: 'reel',
    name: 'REEL',
    tagline: 'A cinematic booking experience that never breaks.',
    year: '2026',
    status: 'shipped',
    role: 'Solo — design and build (AI-assisted)',
    stack: ['Next.js 16', 'React 19', 'Motion', 'Zustand', 'Tailwind CSS v4', 'qrcode'],
    links: {
      live: 'https://cinebook-advanced.vercel.app',
      repo: 'https://github.com/EevnxyEgo/-REEL-Cinematic-Editorial-Movie-Booking-Experience',
    },
    problem:
      'Movie-booking UIs all look the same: a grid of stock posters and a generic seat picker. I wanted a booking flow that felt like a designed object — an editorial programme — without falling apart the moment its data source did.',
    build: [
      'Set a tokens-only design system (cream, burgundy, charcoal; Fraunces / Archivo / Space Mono) — deliberately no neon, no glassmorphism.',
      'Built the full flow: showtime → an architectural, keyboard-navigable seat map → checkout → a real scannable, printable QR e-ticket.',
      'Made TMDB optional — live Now Playing with a key, a hand-curated eight-film typographic archive without one. Zero broken images, ever.',
      'Tuned the motion: film-cut route transitions, a price ticker, magnetic posters — transform and opacity only, all honoring reduced motion.',
    ],
    ship: 'Deployed to Vercel. Runs the curated programme out of the box; a TMDB key lights up live data.',
    result: {
      summary:
        'A booking flow that reads as intentional and expensive, and stays unbreakable offline.',
      metrics: [
        { label: 'Commits', value: '65' },
        { label: 'Films offline', value: '8' },
        { label: 'Broken images', value: '0' },
      ],
    },
    hoverMetric: '65 commits · live on Vercel',
    cta: 'Want this kind of finish on your product?',
    cover: { src: '/work/reel-home.png', alt: 'REEL home screen — an editorial Now Showing mosaic on cream paper.' },
    gallery: [
      { src: '/work/reel-detail.png', alt: 'REEL film detail — a burgundy split-screen with the synopsis set as a pull-quote.' },
      { src: '/work/reel-seats.png', alt: 'REEL seat selection — an architectural blueprint floor plan with a live price ticker.' },
      { src: '/work/reel-eticket.png', alt: 'REEL e-ticket — a perforated stub with a real scannable QR code.' },
    ],
  },
  {
    slug: 'react-playground',
    repo: 'react-playground',
    name: 'React Playground',
    tagline: 'Learn React from first component to interview-ready.',
    year: '2026',
    status: 'shipped',
    role: 'Solo — design and build (AI-assisted)',
    stack: ['Vite', 'React 18', 'Tailwind CSS', 'Sandpack', 'framer-motion', 'recharts'],
    links: {
      live: 'https://my-react-project-omega-two.vercel.app',
      repo: 'https://github.com/EevnxyEgo/react-playground',
    },
    problem:
      'Most React tutorials are read-only. You read about re-renders but never see one. I wanted to make the invisible parts of React — re-renders, reconciliation, test feedback — visible enough to actually learn.',
    build: [
      'Built 19 hands-on modules, each with a live Sandpack editor, an instant-feedback quiz, and a Show Solution.',
      'Wrote a custom useRenderFlash() hook that flashes a component exactly when React re-renders it — so re-render behavior is seen, not described.',
      'Added a live in-browser Jest / React Testing Library runner and a step-through reconciliation visualizer — with no extra dependency.',
      'Shipped incrementally to v3.0.0; the app’s own hand-rolled useReducer + Context store doubles as a worked example of what it teaches.',
    ],
    ship: 'Deployed to Vercel across v1 → v2 → v3, with a CHANGELOG documenting every release.',
    result: {
      summary: 'A learn-by-doing app that teaches React using its own source as the textbook.',
      metrics: [
        { label: 'Modules', value: '19' },
        { label: 'Commits', value: '221' },
        { label: 'Released', value: 'v3.0.0' },
      ],
    },
    hoverMetric: '221 commits · 19 modules · live',
    cta: 'Need someone who ships and documents at this pace?',
    cover: { src: '/work/react-playground-home.png', alt: 'React Playground home — the module track and progress dashboard.' },
    gallery: [
      { src: '/work/react-playground-module.png', alt: 'A React Playground module with a live Sandpack editor and an instant quiz.' },
    ],
  },
  {
    slug: 'jobfit',
    repo: 'jobfit',
    name: 'JobFit',
    tagline: 'Match your resume to any job — privately, on your own AI key.',
    year: '2026',
    status: 'built',
    role: 'Solo — design and build (AI-assisted)',
    stack: ['JavaScript', 'Chrome Manifest V3', 'Chrome APIs', 'Google Gemini'],
    links: {
      repo: 'https://github.com/EevnxyEgo/jobfit-extension',
    },
    problem:
      'Job hunting means re-reading every posting and re-typing the same details into every form. I wanted to make that faster — without sending a resume to anyone else’s server.',
    build: [
      'Architected a single trust boundary: one background.js is the only file that touches storage or calls the model, so there’s exactly one place that ever handles your key and data.',
      'Scored resume↔posting matches 0–100 with evidence, then added an Apply tab that drafts grounded cover letters and one-click-autofills forms via activeTab — no standing access.',
      'Made it free to run by switching from the paid Anthropic API to Gemini’s free tier, with structured JSON output and actionable rate-limit errors.',
      'Added a manual click-to-select fallback for when job boards change their markup and the extractors go stale.',
    ],
    ship: 'Loads unpacked in any Chromium browser; caches the most recent 200 analyses; nothing leaves the browser except calls to Gemini.',
    result: {
      summary: 'A complete, private job-hunting tool with one clean place for keys and data.',
      metrics: [
        { label: 'Commits', value: '32' },
        { label: 'Servers', value: '0' },
        { label: 'Cached', value: '200' },
      ],
    },
    hoverMetric: '32 commits · zero servers · private by design',
    cta: 'Looking for someone who designs for privacy by default?',
    cover: { src: '/work/jobfit-card.png', alt: 'JobFit — a privacy-first Chrome extension that scores resume-to-job fit.' },
    gallery: [],
  },
]

export const selectedWork = [
  {
    name: 'FitBuddy AI',
    blurb:
      'A voice-driven AI fitness coach that builds personalized workout and diet plans in real time from a spoken consultation.',
    stack: ['Next.js', 'TypeScript', 'Vapi', 'Gemini', 'Clerk', 'Convex'],
    role: 'Solo',
    link: 'https://github.com/EevnxyEgo/FitBuddyAI',
  },
  {
    name: 'Digital Twin Camera System',
    blurb:
      'My ITS thesis: a 360° camera system with dynamic view control for a digital-twin music concert — four camera modes managed by a finite-state machine, with interpolated motion.',
    stack: ['Unreal Engine 5', 'C++', 'MetaHuman', 'Blender'],
    role: 'Solo · undergraduate thesis',
    link: null,
  },
  {
    name: 'BAKI',
    blurb:
      'An AI fitness app that counts reps in real time from a phone camera using ML Kit pose detection across 33 body landmarks.',
    stack: ['Kotlin', 'TensorFlow', 'OpenCV', 'Python'],
    role: 'ML developer (team) · Best Final Project 2024, ITS',
    link: null,
  },
  {
    name: 'Healthylicious',
    blurb:
      'A Bangkit capstone recipe recommender that tailors meal suggestions to the ingredients you have and your dietary preferences.',
    stack: ['TensorFlow Recommenders', 'scikit-learn', 'Python'],
    role: 'ML developer (team)',
    link: 'https://github.com/appHealthylicious',
  },
  {
    name: '41-Card Game',
    blurb:
      'A computer-vision card game that detects and classifies physical playing cards in real time with a custom-trained CNN.',
    stack: ['TensorFlow / Keras', 'OpenCV', 'Python'],
    role: 'Solo · Computer Vision final',
    link: null,
  },
]
