import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Reveal } from '../primitives/Reveal.jsx'
import { CountUp } from '../primitives/CountUp.jsx'
import { caseStudies, selectedWork } from '../../data/projects.js'
import { cn } from '../../lib/cn.js'

const STATS = [
  { value: 3, label: 'products shipped' },
  { value: 318, label: 'commits' },
  { value: 19, label: 'React modules' },
  { value: 0, label: 'servers · JobFit' },
]

// Each domain is a full-bleed "world" tinted by its own accent (web stays default jade), listing
// the real projects that live in it — derived from the `domains` tags on the project data.
const DOMAINS = [
  {
    accent: null,
    label: 'Web',
    name: 'Full-stack web',
    detail: 'React, Node, and the whole pipeline to a live deploy — design through production.',
  },
  {
    accent: 'ml',
    label: 'ML',
    name: 'Machine learning',
    detail: 'Recommender systems, pose detection, and production model deployment.',
  },
  {
    accent: 'cv',
    label: 'Computer Vision',
    name: 'Computer vision',
    detail: 'Real-time CNN detection and image processing with TensorFlow and OpenCV.',
  },
  {
    accent: '3d',
    label: 'Real-time 3D',
    name: 'Real-time 3D',
    detail: 'A 360° camera system with dynamic view control in Unreal Engine — my ITS thesis.',
  },
]

// Flatten projects into one list with a domain tag + the right link kind.
const ALL = [
  ...caseStudies.map((c) => ({ name: c.name, note: c.tagline, to: `/work/${c.slug}`, domains: c.domains })),
  ...selectedWork.map((w) => ({ name: w.name, note: w.blurb, href: w.link, domains: w.domains })),
]
const projectsFor = (label) => ALL.filter((p) => p.domains.includes(label))

const ACCENT_WASH = {
  background:
    'radial-gradient(90% 70% at 0% 0%, color-mix(in srgb, var(--color-accent) 12%, transparent), transparent 60%)',
}

function ProjectRow({ p }) {
  const inner = (
    <>
      <span className="font-display text-lg text-ink transition-colors group-hover:text-accent">{p.name}</span>
      <span className="flex items-center gap-2 text-right font-mono text-xs text-ink-faint">
        <span className="hidden sm:inline">{p.note.length > 52 ? p.note.slice(0, 52) + '…' : p.note}</span>
        {p.to ? (
          <ArrowRight size={14} aria-hidden="true" className="shrink-0 transition-transform group-hover:translate-x-1" />
        ) : p.href ? (
          <ArrowUpRight size={14} aria-hidden="true" className="shrink-0 transition-transform group-hover:-translate-y-0.5" />
        ) : null}
      </span>
    </>
  )
  const cls = 'group flex items-baseline justify-between gap-4 border-t border-rule py-3.5'
  if (p.to) return <Link to={p.to} className={cls} data-cursor-label="open">{inner}</Link>
  if (p.href) return <a href={p.href} target="_blank" rel="noreferrer" className={cls}>{inner}</a>
  return <div className={cls}>{inner}</div>
}

function DomainWorld({ domain, index }) {
  const projects = projectsFor(domain.label)
  return (
    <section
      data-accent={domain.accent || undefined}
      className={cn('relative overflow-hidden', index % 2 === 1 && 'bg-raised')}
      aria-label={domain.name}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={ACCENT_WASH} />
      <div className="relative mx-auto max-w-5xl px-6 py-16 sm:px-10 lg:py-20">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.1em] text-accent">
            {domain.label} · {projects.length} {projects.length === 1 ? 'project' : 'projects'}
          </p>
          <h3 className="mt-2 font-display text-[clamp(2rem,1.2rem+2.6vw,3.25rem)] font-bold leading-[1.02] text-ink">
            {domain.name}
          </h3>
          <p className="mt-3 max-w-[54ch] text-ink-soft">{domain.detail}</p>
        </Reveal>
        <Reveal delay={0.06}>
          <ul className="mt-8">
            {projects.map((p) => (
              <li key={p.name}>
                <ProjectRow p={p} />
              </li>
            ))}
            <li aria-hidden="true" className="border-t border-rule" />
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

export function Expertise() {
  return (
    <section aria-labelledby="expertise-heading">
      <div className="mx-auto max-w-[1500px] px-6 pt-20 sm:px-10 lg:px-14 lg:pt-28">
        <Reveal>
          <p className="font-mono text-sm tracking-[0.1em] text-shipped">what i do</p>
          <h2 id="expertise-heading" className="mt-3 max-w-[18ch] font-display text-section font-semibold text-ink">
            One developer, the whole stack — and a little beyond it.
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 pb-16 sm:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05}>
              <p className="font-display text-[clamp(2.6rem,1.6rem+3vw,4.25rem)] font-bold leading-none text-ink">
                <CountUp to={s.value} />
              </p>
              <p className="mt-2 font-mono text-xs text-ink-faint">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>

      {/* the domain worlds — full-bleed, each tinted by its own accent */}
      {DOMAINS.map((d, i) => (
        <DomainWorld key={d.label} domain={d} index={i} />
      ))}
    </section>
  )
}
