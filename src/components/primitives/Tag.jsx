import { cn } from '../../lib/cn.js'

// A small, understated stack/label chip: mono, full hairline border (never a one-sided
// accent border — that's an AI tell), no fill.
export function Tag({ children, className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded border border-rule px-2 py-0.5 font-mono text-xs text-ink-soft',
        className,
      )}
    >
      {children}
    </span>
  )
}
