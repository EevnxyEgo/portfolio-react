import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { cn } from '../../lib/cn.js'
import { shipDate } from '../../lib/format.js'

// One monospace row in a Ship Log: status dot · date · primary · secondary.
// Becomes a router Link when `to` is provided (hero rows link to their case study).
export function ShipLogEntry({ date, primary, secondary, shipped = false, to }) {
  const Row = to ? Link : 'div'
  const rowProps = to ? { to } : {}

  return (
    <Row
      {...rowProps}
      className={cn(
        'group/row flex flex-wrap items-center gap-x-3 gap-y-0.5 font-mono text-sm',
        to && 'transition-colors',
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'h-2 w-2 shrink-0 rounded-full',
          shipped ? 'bg-shipped-bright' : 'bg-ink-faint',
        )}
      />
      <span className="w-[3.4rem] shrink-0 text-ink-faint">{shipDate(date)}</span>
      <span className="font-medium text-ink">{primary}</span>
      <span
        className={cn(
          'inline-flex items-center gap-1',
          shipped ? 'text-shipped' : 'text-ink-soft',
          to && 'group-hover/row:underline',
        )}
      >
        {shipped && <Check size={13} aria-hidden="true" />}
        {secondary}
      </span>
    </Row>
  )
}
