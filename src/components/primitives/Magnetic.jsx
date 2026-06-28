import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js'

// Wraps a child so it subtly pulls toward the cursor on hover (magnetic effect).
// No-op under reduced motion or coarse pointers.
export function Magnetic({ children, strength = 0.35, className }) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 250, damping: 18, mass: 0.3 })
  const sy = useSpring(y, { stiffness: 250, damping: 18, mass: 0.3 })

  if (reduced) return <span className={className}>{children}</span>

  function onMove(e) {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  function reset() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy, display: 'inline-flex' }}
      className={className}
    >
      {children}
    </motion.span>
  )
}
