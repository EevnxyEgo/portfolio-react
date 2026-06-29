// Experience, education, and credentials — sourced from the CV, true metrics only. The career is
// modelled as a commit graph (`timeline`) for the About page; `credentials.certifications` renders
// as the git-tag node.

// The career as a commit graph (oldest → newest) for the About page CommitGraph.
// `lane`: 'main' = the through-line (study → ship); 'branch' = a parallel effort that branches
// off and merges back. `type` drives the node glyph (init / feat / ship). Tags are git-style
// labels (awards, grades). HEAD marks the current commit. True facts only.
export const timeline = [
  {
    id: 'its',
    date: '2021 – 2025',
    type: 'init',
    lane: 'main',
    label: 'init: computer-engineering',
    org: 'Institut Teknologi Sepuluh Nopember',
    role: 'B. Computer Engineering · GPA 3.72 / 4.00',
    points: ['Where the through-line starts — four years of computer engineering at ITS.'],
    tags: ['ITS'],
  },
  {
    id: 'bangkit',
    date: 'Jan – Jun 2024',
    type: 'feat',
    lane: 'branch',
    branch: 'ml/bangkit',
    org: 'Bangkit Academy — Google, Tokopedia, Gojek, Traveloka',
    role: 'Machine Learning Cohort',
    points: [
      'Selected as 1 of 4,636 from 45,841 applicants for a 900+ hour, industry-driven program.',
      'Built and deployed a production recommendation system in a cross-functional ML / Cloud / Mobile team.',
    ],
    tags: ['Graduate A / 89.58'],
  },
  {
    id: 'baki',
    date: 'Sep 2024',
    type: 'feat',
    lane: 'branch',
    branch: 'cv/baki',
    org: 'ITS Telematics Exhibition',
    role: 'BAKI — real-time rep counter (ML Kit pose detection)',
    points: ['Best Final Project 2024 — a phone-camera fitness coach across 33 body landmarks.'],
    tags: ['🏆 Best Final Project 2024'],
  },
  {
    id: 'thesis',
    date: '2025',
    type: 'ship',
    lane: 'main',
    label: 'ship: undergraduate thesis',
    org: 'Digital Twin Camera System',
    role: '360° camera with dynamic view control · Unreal Engine 5',
    points: ['Four camera modes managed by a finite-state machine, with interpolated motion — my ITS thesis.'],
    tags: ['Real-time 3D'],
  },
  {
    id: 'idstar',
    date: 'Nov 2025 – May 2026',
    type: 'feat',
    lane: 'branch',
    branch: 'work/idstar',
    org: 'PT IDstar Cipta Teknologi',
    role: 'Software Engineer Intern — Professional Services Acquisition',
    points: [
      'Built automation supporting 3,000+ candidate recruitment processes, cutting manual work by ~65%.',
      'Event-driven automation across WhatsApp, Discord, Gmail, and Sheets with n8n, Node.js bots, and REST APIs.',
      'Internal web tools that cut document processing from 2–3 hours to under 10 minutes.',
    ],
    tags: ['Web', 'automation'],
  },
  {
    id: 'kada',
    date: 'Jun – Aug 2026',
    type: 'ship',
    lane: 'main',
    label: 'ship: full-stack, sharpened',
    org: 'Korea–ASEAN Digital Academy (KADA), Batch 4',
    role: 'Fully-funded full-stack web program · AKCF · NIPA · Komdigi (Elice)',
    points: ['An intensive 8-week curriculum, fundamentals to full-stack proficiency.'],
    tags: ['Web'],
    head: true,
  },
]

export const credentials = {
  certifications: [
    'Alibaba Cloud ACA — Big Data Certification',
    'Samsung Innovation Campus, Batch 5',
    'Mathematics for Machine Learning and Data Science — DeepLearning.AI',
  ],
}
