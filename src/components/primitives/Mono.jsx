import { cn } from '../../lib/cn.js'

// Inline monospace — the engineering "voice" used for labels, timestamps, and code-like text.
export function Mono({ children, as: Tag = 'span', className }) {
  return <Tag className={cn('font-mono', className)}>{children}</Tag>
}
