import { Check } from 'lucide-react'
import { Reveal } from '../../primitives/Reveal.jsx'
import { shipDate } from '../../../lib/format.js'
import { cn } from '../../../lib/cn.js'
import shiplog from '../../../data/shiplog.json'

// Spine block: the project's real commit trail from shiplog.json — the same evidence on every
// case study, because "ships complete things" is the through-line. Deploys stay jade (the shared
// "shipped" signal); the section label carries the project's accent.
export function ShipLog({ repo }) {
  const commits = shiplog.filter((e) => e.repo === repo)
  if (!commits.length) return null

  return (
    <Reveal as="section" className="mx-auto max-w-3xl px-6 py-10 sm:px-10">
      <p className="font-mono text-xs tracking-[0.1em] text-accent">the ship log</p>
      <h2 className="mt-2 font-display text-section text-ink">Real commits, no theatre</h2>

      <div className="mt-6 overflow-hidden rounded-xl border border-rule bg-raised">
        <div className="flex items-center gap-2 border-b border-rule px-4 py-2.5 font-mono text-xs text-ink-faint">
          <span className="h-2.5 w-2.5 rounded-full bg-rule" aria-hidden="true" />
          <span className="h-2.5 w-2.5 rounded-full bg-rule" aria-hidden="true" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent/70" aria-hidden="true" />
          <span className="ml-2">~ git log · {repo}</span>
        </div>
        <ul className="flex flex-col gap-2 px-4 py-4 font-mono text-sm">
          {commits.map((c, i) => {
            const isDeploy = c.type === 'deploy'
            return (
              <li key={i} className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                <span className="w-[3.4rem] shrink-0 text-ink-faint">{shipDate(c.date)}</span>
                <span
                  className={cn(
                    'inline-flex w-16 shrink-0 items-center gap-1',
                    isDeploy ? 'text-shipped' : 'text-ink-faint',
                  )}
                >
                  {isDeploy && <Check size={12} aria-hidden="true" />}
                  {c.type}
                </span>
                <span className="text-ink-soft">{c.message}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </Reveal>
  )
}
