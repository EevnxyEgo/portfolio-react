import { Link, NavLink } from 'react-router-dom'
import { cn } from '../../lib/cn.js'
import { profile } from '../../data/profile.js'

const NAV = [
  { to: '/work', label: 'work' },
  { to: '/about', label: 'about' },
  { to: '/contact', label: 'contact' },
]

// Thin, solid (not glassy) top bar: mono wordmark, primary nav, and the ⌘K affordance.
// `onOpenCommand` is wired by the layout once the command palette exists.
export function Header({ onOpenCommand }) {
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3 sm:px-10">
        <Link
          to="/"
          className="font-mono text-sm tracking-[0.2em] text-ink"
          aria-label={`${profile.shortName}, home`}
        >
          {profile.initials}
        </Link>

        <nav className="flex items-center gap-5 font-mono text-sm sm:gap-6" aria-label="Primary">
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
          <button
            type="button"
            onClick={onOpenCommand}
            className="hidden items-center gap-1 rounded border border-rule px-2 py-1 text-xs text-ink-faint transition-colors hover:border-ink-faint hover:text-ink sm:inline-flex"
            aria-label="Open command palette"
            aria-keyshortcuts="Meta+K Control+K"
          >
            <span aria-hidden="true">⌘</span>K
          </button>
        </nav>
      </div>
    </header>
  )
}
