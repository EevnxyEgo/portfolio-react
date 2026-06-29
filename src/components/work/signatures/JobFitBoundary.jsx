import { motion } from 'motion/react'
import { ArrowRight, ArrowDown, Lock } from 'lucide-react'
import { Reveal } from '../../primitives/Reveal.jsx'
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion.js'

// JobFit's signature: the real architecture, animated. A request packet travels
// posting → content.js → background.js → Gemini and back. background.js is the single trust
// boundary — it stays lit, and the key/storage never leaves it. Honest (no fake UI mockup).
// Reduced motion shows the same diagram, static.

function Node({ title, sub, boundary = false }) {
  return (
    <div
      className={
        'relative flex-1 rounded-lg border bg-paper px-4 py-3 text-center ' +
        (boundary ? 'border-accent' : 'border-rule')
      }
    >
      <p className={'font-mono text-sm ' + (boundary ? 'text-accent' : 'text-ink')}>{title}</p>
      {sub && <p className="mt-1 text-xs leading-snug text-ink-soft">{sub}</p>}
      {boundary && (
        <span className="absolute -top-2 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full border border-accent bg-paper px-2 py-0.5 font-mono text-[10px] text-accent">
          <Lock size={9} aria-hidden="true" /> trust boundary
        </span>
      )}
    </div>
  )
}

function Hop({ label }) {
  return (
    <div className="flex shrink-0 flex-col items-center justify-center px-1 text-ink-faint">
      <ArrowRight size={18} aria-hidden="true" className="hidden sm:block" />
      <ArrowDown size={18} aria-hidden="true" className="sm:hidden" />
      <span className="mt-0.5 font-mono text-[10px]">{label}</span>
    </div>
  )
}

export function JobFitBoundary() {
  const reduced = usePrefersReducedMotion()

  return (
    <Reveal as="section" className="mx-auto max-w-3xl px-6 py-10 sm:px-10">
      <p className="font-mono text-xs tracking-[0.1em] text-accent">the signature · architecture</p>
      <h2 className="mt-2 font-display text-section text-ink">One door for your data</h2>
      <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-ink-soft">
        Every other file is sandboxed. Only <span className="font-mono text-accent">background.js</span>{' '}
        ever touches your key, your storage, or the model — so there is exactly one place to reason
        about privacy.
      </p>

      <figure className="relative mt-7 overflow-hidden rounded-xl border border-rule bg-raised p-5 sm:p-7">
        {/* the travelling request packet (decorative; the diagram below is the real content) */}
        {!reduced && (
          <motion.span
            aria-hidden="true"
            className="absolute top-0 h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_2px_var(--color-accent)]"
            style={{ top: '2.4rem' }}
            initial={{ left: '8%', opacity: 0 }}
            animate={{ left: ['8%', '50%', '50%', '88%', '88%', '50%', '50%', '8%'], opacity: [0, 1, 1, 1, 1, 1, 1, 0] }}
            transition={{ duration: 5, times: [0, 0.18, 0.3, 0.45, 0.55, 0.7, 0.82, 1], repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        <div className="relative mt-2 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
          <Node title="job posting" sub="LinkedIn · Indeed · Glassdoor" />
          <Hop label="content.js" />
          <Node title="background.js" sub="the only file touching your key + storage" boundary />
          <Hop label="https" />
          <Node title="Gemini API" sub="your own free key" />
        </div>

        <figcaption className="mt-5 font-mono text-xs leading-relaxed text-ink-soft">
          <span className="text-accent">chrome.storage.local</span> holds the key and data · nothing
          else leaves the browser — no server, no analytics
        </figcaption>
      </figure>
    </Reveal>
  )
}
