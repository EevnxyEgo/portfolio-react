import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Tag } from '../primitives/Tag.jsx'
import { cn } from '../../lib/cn.js'

const EXTERNAL = { target: '_blank', rel: 'noreferrer' }

// The immersive, per-project hero: a full-bleed accent wash (the project's "world"), the real
// cover feathered in on the right where one exists, and the meta row (Role · Stack · Year · status)
// that carries the shared spine. Accent comes from data-accent on the article root.
export function CaseStudyHero({ project }) {
  const shipped = project.status === 'shipped'
  return (
    <header className="relative overflow-hidden border-b border-rule">
      {/* accent wash — the world's tint */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(110% 120% at 0% 0%, color-mix(in srgb, var(--color-accent) 16%, transparent), transparent 58%)',
        }}
      />
      {/* the real cover, feathered into the page (projects with a UI to show) */}
      {project.cover && (
        <>
          <img
            src={project.cover.src}
            alt=""
            aria-hidden="true"
            decoding="async"
            className="pointer-events-none absolute right-0 top-0 hidden h-full w-[52%] object-cover object-left opacity-35 lg:block"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 62%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 62%)',
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden lg:block"
            style={{
              background:
                'linear-gradient(to right, var(--color-paper) 30%, transparent 78%)',
            }}
          />
        </>
      )}

      <div className="relative mx-auto max-w-5xl px-6 pb-12 pt-12 sm:px-10 sm:pt-16 lg:pb-16">
        <Link
          to="/work"
          className="inline-flex items-center gap-1.5 font-mono text-sm text-ink-soft transition-colors hover:text-ink"
        >
          <ArrowLeft size={14} aria-hidden="true" /> work
        </Link>

        <h1 className="mt-7 max-w-[16ch] font-display text-display font-bold leading-[0.95] tracking-tight text-ink">
          {project.name}
        </h1>
        <p className="mt-4 max-w-[44ch] text-xl text-ink-soft">{project.tagline}</p>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-sm text-ink-faint">
          <span>{project.year}</span>
          <span className="text-ink-soft">{project.role}</span>
          <span className={cn('inline-flex items-center gap-1.5', shipped && 'text-shipped')}>
            <span
              className={cn('h-2 w-2 rounded-full', shipped ? 'bg-shipped-bright' : 'bg-ink-faint')}
              aria-hidden="true"
            />
            {project.status}
          </span>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm">
          {project.links.live && (
            <a
              className="inline-flex items-center gap-1 text-accent transition-opacity hover:opacity-80"
              href={project.links.live}
              data-cursor-label="visit"
              {...EXTERNAL}
            >
              live site <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          )}
          {project.links.repo && (
            <a
              className="inline-flex items-center gap-1 text-ink-soft transition-colors hover:text-ink"
              href={project.links.repo}
              {...EXTERNAL}
            >
              source <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </header>
  )
}
