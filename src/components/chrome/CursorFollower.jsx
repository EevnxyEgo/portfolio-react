import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js'

// A custom cursor: an instant jade dot + a lagging ring that swells over interactive
// elements and shows a contextual label (data-cursor-label). Desktop fine-pointer only,
// off under reduced motion. Native cursor is hidden except on text fields.
export function CursorFollower() {
  const reduced = usePrefersReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [active, setActive] = useState(false)
  const [label, setLabel] = useState('')

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 350, damping: 30, mass: 0.4 })
  const ringY = useSpring(y, { stiffness: 350, damping: 30, mass: 0.4 })

  useEffect(() => {
    if (reduced || !window.matchMedia('(pointer: fine)').matches) return undefined
    setEnabled(true)
    document.documentElement.classList.add('has-custom-cursor')

    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const onOver = (e) => {
      const hit = e.target.closest?.('a, button, [data-cursor-label]')
      setActive(Boolean(hit))
      setLabel(hit?.getAttribute('data-cursor-label') || '')
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [reduced, x, y])

  if (!enabled) return null
  const ringSize = label ? 64 : active ? 44 : 26

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[60] h-1.5 w-1.5 rounded-full bg-shipped"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[60] flex items-center justify-center rounded-full border border-ink-soft bg-paper/10 backdrop-blur-[1px]"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{ width: ringSize, height: ringSize }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      >
        {label && <span className="font-mono text-[10px] uppercase tracking-wide text-ink">{label}</span>}
      </motion.div>
    </>
  )
}
