import { Link, NavLink } from 'react-router-dom'
import { ArrowDown } from 'lucide-react'
import { cn } from '../../lib/cn.js'
import { profile } from '../../data/profile.js'
import { ThemeToggle } from '../chrome/ThemeToggle.jsx'

const NAV = [
  { to: '/work', label: 'work' },
  { to: '/about', label: 'about' },
  { to: '/contact', label: 'contact' },
]

// Thin, solid top bar spanning the full width: mono wordmark, primary nav, a persistent
// CV download, theme toggle, and the ⌘K affordance.
export function Header({ onOpenCommand }) {
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-3 sm:px-10 lg:px-14">
        <Link
          to="/"
          className="font-mono text-sm tracking-[0.2em] text-ink"
          aria-label={`${profile.initials} — ${profile.shortName}, home`}
        >
          {profile.initials}
        </Link>

        <nav className="flex items-center gap-4 font-mono text-sm sm:gap-6" aria-label="Primary">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn('text-ink-soft transition-colors hover:text-ink', isActive && 'text-ink')
              }
            >
              {item.label}
            </NavLink>
          ))}
          <a
            href={profile.links.cv}
            download
            className="hidden items-center gap-1 text-ink transition-colors hover:text-shipped sm:inline-flex"
          >
            cv <ArrowDown size={13} aria-hidden="true" />
          </a>
          <ThemeToggle />
          <button
            type="button"
            onClick={onOpenCommand}
            className="hidden items-center gap-1 rounded border border-rule px-2 py-1 text-xs text-ink-faint transition-colors hover:border-ink-faint hover:text-ink sm:inline-flex"
            aria-label="⌘K, open command palette"
            aria-keyshortcuts="Meta+K Control+K"
          >
            <span aria-hidden="true">⌘</span>K
          </button>
        </nav>
      </div>
    </header>
  )
}
