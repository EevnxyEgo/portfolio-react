import { Reveal } from '../primitives/Reveal.jsx'
import { ShipLogEntry } from './ShipLogEntry.jsx'
import { cn } from '../../lib/cn.js'

// The signature element: a monospace build/deploy log of real entries.
// `entries` items: { key, date, primary, secondary, shipped, to }.
export function ShipLog({ label = '~ deploy log', entries, className }) {
  return (
    <div className={cn('rounded-[10px] border border-rule bg-raised p-4 sm:p-5', className)}>
      <p className="font-mono text-[11px] tracking-[0.08em] text-ink-faint">{label}</p>
      <ul className="mt-3 flex flex-col gap-2.5">
        {entries.map(({ key, ...entry }, i) => (
          <Reveal as="li" key={key} delay={i * 0.08} y={8}>
            <ShipLogEntry {...entry} />
          </Reveal>
        ))}
      </ul>
    </div>
  )
}
