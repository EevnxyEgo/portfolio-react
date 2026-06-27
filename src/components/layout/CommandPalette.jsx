import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  House,
  FolderGit2,
  User,
  Mail,
  FileCode2,
  Copy,
  Github,
  Linkedin,
  FileText,
  CornerDownLeft,
} from 'lucide-react'
import { profile } from '../../data/profile.js'
import { caseStudies } from '../../data/projects.js'
import { cn } from '../../lib/cn.js'

// Builds the action list. Navigation closes the palette first, then routes.
function buildActions(navigate, onClose) {
  const go = (to) => () => {
    onClose()
    navigate(to)
  }
  const ext = (url) => () => {
    onClose()
    window.open(url, '_blank', 'noopener,noreferrer')
  }
  const copyEmail = async () => {
    try {
      await navigator.clipboard?.writeText(profile.email)
    } catch {
      /* clipboard unavailable — no-op */
    }
    onClose()
  }

  return [
    { id: 'home', label: 'Home', icon: House, keywords: 'start index', perform: go('/') },
    { id: 'work', label: 'Work', icon: FolderGit2, keywords: 'projects case studies', perform: go('/work') },
    { id: 'about', label: 'About', icon: User, keywords: 'bio experience', perform: go('/about') },
    { id: 'contact', label: 'Contact', icon: Mail, keywords: 'hire email message', perform: go('/contact') },
    ...caseStudies.map((cs) => ({
      id: `cs-${cs.slug}`,
      label: cs.name,
      hint: 'case study',
      icon: FileCode2,
      keywords: `${cs.tagline} ${cs.stack.join(' ')}`,
      perform: go(`/work/${cs.slug}`),
    })),
    { id: 'copy-email', label: 'Copy email', hint: profile.email, icon: Copy, keywords: 'contact mail', perform: copyEmail },
    { id: 'github', label: 'GitHub', hint: 'new tab', icon: Github, keywords: 'code repos', perform: ext(profile.links.github) },
    { id: 'linkedin', label: 'LinkedIn', hint: 'new tab', icon: Linkedin, keywords: 'profile', perform: ext(profile.links.linkedin) },
    { id: 'resume', label: 'Résumé', hint: 'new tab', icon: FileText, keywords: 'cv download', perform: ext(profile.links.resume) },
  ]
}

function filterActions(actions, query) {
  const q = query.trim().toLowerCase()
  if (!q) return actions
  return actions.filter((a) =>
    `${a.label} ${a.hint || ''} ${a.keywords || ''}`.toLowerCase().includes(q),
  )
}

export function CommandPalette({ open, onClose }) {
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const restoreFocusRef = useRef(null)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)

  const actions = useMemo(() => buildActions(navigate, onClose), [navigate, onClose])
  const filtered = useMemo(() => filterActions(actions, query), [actions, query])

  // Reset active row whenever the result set changes.
  useEffect(() => {
    setActive(0)
  }, [query])

  // Focus management: focus the input on open, restore focus on close, lock body scroll.
  useEffect(() => {
    if (open) {
      restoreFocusRef.current = document.activeElement
      setQuery('')
      setActive(0)
      const id = requestAnimationFrame(() => inputRef.current?.focus())
      document.body.style.overflow = 'hidden'
      return () => {
        cancelAnimationFrame(id)
        document.body.style.overflow = ''
      }
    }
    if (restoreFocusRef.current instanceof HTMLElement) {
      restoreFocusRef.current.focus()
    }
  }, [open])

  if (!open) return null

  function onKeyDown(e) {
    if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => (filtered.length ? Math.min(a + 1, filtered.length - 1) : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      filtered[active]?.perform()
    }
  }

  const activeId = filtered[active] ? `cmdk-${filtered[active].id}` : undefined

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-ink/30 px-4 pt-[14vh]"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="w-full max-w-xl overflow-hidden rounded-xl border border-rule bg-raised shadow-xl"
      >
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded="true"
          aria-controls="cmdk-list"
          aria-activedescendant={activeId}
          aria-label="Search commands"
          autoComplete="off"
          spellCheck="false"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Jump to a page, open a link, copy email…"
          className="w-full border-b border-rule bg-transparent px-4 py-3.5 font-mono text-sm text-ink placeholder:text-ink-faint focus:outline-none"
        />

        <ul id="cmdk-list" role="listbox" aria-label="Commands" className="max-h-[44vh] overflow-y-auto p-1.5">
          {filtered.map((a, i) => {
            const Icon = a.icon
            return (
              <li
                key={a.id}
                id={`cmdk-${a.id}`}
                role="option"
                aria-selected={i === active}
                onMouseEnter={() => setActive(i)}
                onClick={a.perform}
                className={cn(
                  'flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm',
                  i === active ? 'bg-shipped/10 text-ink' : 'text-ink-soft',
                )}
              >
                <Icon size={16} aria-hidden="true" className={i === active ? 'text-shipped' : 'text-ink-faint'} />
                <span className="font-medium">{a.label}</span>
                {a.hint && <span className="ml-auto font-mono text-xs text-ink-faint">{a.hint}</span>}
              </li>
            )
          })}
          {filtered.length === 0 && (
            <li className="px-3 py-6 text-center font-mono text-sm text-ink-faint">No matches</li>
          )}
        </ul>

        <div className="flex items-center gap-4 border-t border-rule px-4 py-2.5 font-mono text-xs text-ink-faint">
          <span className="flex items-center gap-1.5">
            <CornerDownLeft size={12} aria-hidden="true" /> select
          </span>
          <span>↑↓ navigate</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  )
}
