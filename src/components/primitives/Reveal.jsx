import { motion } from 'motion/react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js'

// A fade + lift. By default it reveals on scroll-into-view; pass `immediate` for
// above-the-fold content (e.g. the hero) so it animates on mount and can never get
// stuck invisible if it isn't scrolled to. Reduced motion renders a plain element.
export function Reveal({ children, as = 'div', delay = 0, y = 16, immediate = false, className, ...rest }) {
  const reduced = usePrefersReducedMotion()

  if (reduced) {
    const Tag = as
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    )
  }

  const MotionTag = motion[as] || motion.div
  const motionProps = immediate
    ? { initial: { opacity: 0, y }, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '0px 0px -12% 0px' },
      }

  return (
    <MotionTag
      className={className}
      {...motionProps}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
