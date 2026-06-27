import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Tag } from '../primitives/Tag.jsx'
import { cn } from '../../lib/cn.js'

const EXTERNAL = { target: '_blank', rel: 'noreferrer' }

export function CaseStudyHero({ project }) {
  const shipped = project.status === 'shipped'
  return (
    <header>
      <Link
        to="/work"
        className="inline-flex items-center gap-1.5 font-mono text-sm text-ink-soft transition-colors hover:text-ink"
      >
        <ArrowLeft size={14} aria-hidden="true" /> work
      </Link>

      <h1 className="mt-6 font-display text-display leading-[1.05] tracking-tight text-ink">
        {project.name}
      </h1>
      <p className="mt-3 max-w-[44ch] text-xl text-ink-soft">{project.tagline}</p>

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
            className="inline-flex items-center gap-1 text-shipped transition-opacity hover:opacity-80"
            href={project.links.live}
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
    </header>
  )
}
