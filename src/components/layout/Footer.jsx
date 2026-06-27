import { Rule } from '../primitives/Rule.jsx'
import { profile } from '../../data/profile.js'

const EXTERNAL = { target: '_blank', rel: 'noreferrer' }

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mx-auto max-w-5xl px-6 pb-10 pt-16 sm:px-10">
      <Rule />
      <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-xl text-ink">{profile.shortName}</p>
          <p className="mt-1 text-sm text-ink-soft">
            {profile.locationNote} · {profile.availability}
          </p>
        </div>
        <nav className="flex gap-5 font-mono text-sm text-ink-soft" aria-label="Social and contact">
          <a className="transition-colors hover:text-ink" href={profile.links.github} {...EXTERNAL}>
            GitHub
          </a>
          <a className="transition-colors hover:text-ink" href={profile.links.linkedin} {...EXTERNAL}>
            LinkedIn
          </a>
          <a className="transition-colors hover:text-ink" href={`mailto:${profile.email}`}>
            Email
          </a>
        </nav>
      </div>
      <p className="mt-8 font-mono text-xs text-ink-faint">
        © {year} {profile.name} · built with React
      </p>
    </footer>
  )
}
