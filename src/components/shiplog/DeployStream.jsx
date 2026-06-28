import { motion } from 'motion/react'
import { Check } from 'lucide-react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js'
import { shipDate } from '../../lib/format.js'
import { cn } from '../../lib/cn.js'
import shiplog from '../../data/shiplog.json'

// The signature element: an alive-feeling deploy stream that reveals real commits on load
// and lands on this site's own deployment. Reduced motion shows the full stream instantly.
const RECENT = shiplog.slice(0, 6)

const FINAL = {
  date: new Date().toISOString(),
  type: 'deploy',
  message: 'this site → arsenius-audley.vercel.app',
}

function typeColor(type) {
  if (type === 'deploy') return 'text-shipped'
  if (type === 'fix') return 'text-amber'
  if (type === 'feat') return 'text-ink'
  return 'text-ink-faint'
}

function Line({ entry, final = false }) {
  const isDeploy = entry.type === 'deploy'
  return (
    <div className="flex items-baseline gap-3 whitespace-nowrap">
      <span className="w-[3.2rem] shrink-0 text-ink-faint">{shipDate(entry.date)}</span>
      <span className={cn('inline-flex w-14 shrink-0 items-center gap-1', typeColor(entry.type))}>
        {isDeploy && <Check size={12} aria-hidden="true" />}
        {entry.type}
      </span>
      <span className={cn('truncate', final ? 'text-shipped' : 'text-ink-soft')}>{entry.message}</span>
    </div>
  )
}

export function DeployStream() {
  const reduced = usePrefersReducedMotion()
  const all = [...RECENT, FINAL]

  const Container = reduced ? 'div' : motion.div
  const Item = reduced ? 'div' : motion.div
  const containerProps = reduced
    ? {}
    : {
        initial: 'hidden',
        animate: 'show',
        variants: { hidden: {}, show: { transition: { staggerChildren: 0.11, delayChildren: 0.35 } } },
      }
  const itemVariants = { hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } }

  return (
    <div className="overflow-hidden rounded-xl border border-rule bg-raised font-mono text-[13px] shadow-2xl shadow-black/40">
      <div className="flex items-center gap-2 border-b border-rule px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-rule" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-rule" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-shipped/70" aria-hidden="true" />
        <span className="ml-2 text-xs text-ink-faint">~/arsenius — deploy log</span>
      </div>

      <Container {...containerProps} className="flex flex-col gap-2 px-4 py-4">
        <div className="mb-1 text-ink-faint">$ git log --oneline --deploys</div>
        {all.map((entry, i) => (
          <Item key={i} variants={reduced ? undefined : itemVariants}>
            <Line entry={entry} final={i === all.length - 1} />
          </Item>
        ))}
        <div className="mt-1 flex items-center gap-2 text-shipped">
          <span>3 shipped · 318 commits</span>
          <span className="inline-block h-3.5 w-2 animate-pulse bg-shipped" aria-hidden="true" />
        </div>
      </Container>
    </div>
  )
}
