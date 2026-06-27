import { cn } from '../../lib/cn.js'

// A hairline divider in the design's rule color. Full-width by default.
export function Rule({ className }) {
  return <hr className={cn('border-0 border-t border-rule', className)} />
}
