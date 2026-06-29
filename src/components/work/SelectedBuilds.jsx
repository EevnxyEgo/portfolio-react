import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react'
import { Reveal } from '../primitives/Reveal.jsx'
import { Rule } from '../primitives/Rule.jsx'
import { caseStudies } from '../../data/projects.js'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js'
import { cn } from '../../lib/cn.js'

// An interactive index: big project names; hovering dims the others and floats that
// project's cover preview beside the cursor. Reduced motion / touch keep a plain list.
export function SelectedBuilds() {
  const reduced = usePrefersReducedMotion()
  const [active, setActive] = useState(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const px = useSpring(x, { stiffness: 300, damping: 30, mass: 0.5 })
  const py = useSpring(y, { stiffness: 300, damping: 30, mass: 0.5 })

  const onMove = (e) => {
    x.set(e.clientX)
    y.set(e.clientY)
  }
  const preview = active !== null ? caseStudies[active] : null
  const showPreview = !reduced && preview && preview.cover

  return (
    <div className="relative mt-4" onMouseMove={reduced ? undefined : onMove}>
      {caseStudies.map((cs, i) => (
        <Reveal as="div" key={cs.slug} delay={i * 0.05}>
          <Link
            to={`/work/${cs.slug}`}
            data-cursor-label="view"
            data-accent={cs.accent}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive((a) => (a === i ? null : a))}
            className={cn(
              'group block transition-opacity duration-300',
              active !== null && active !== i ? 'opacity-40' : 'opacity-100',
            )}
          >
            <Rule />
            <div className="flex items-baseline justify-between gap-4 py-6 sm:py-8">
              <div className="min-w-0">
                <h3 className="font-display text-3xl font-semibold leading-none tracking-tight text-ink transition-transform duration-300 group-hover:translate-x-2 sm:text-5xl">
                  {cs.name}
                </h3>
                <p className="mt-2.5 font-mono text-xs text-ink-soft sm:text-sm">{cs.tagline}</p>
                <p className="mt-1 font-mono text-xs text-accent sm:hidden">{cs.hoverMetric}</p>
              </div>
              <div className="hidden shrink-0 items-center gap-3 sm:flex">
                <span className="font-mono text-xs text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {cs.hoverMetric}
                </span>
                <span
                  aria-hidden="true"
                  className="text-ink-faint transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </div>
            </div>
          </Link>
        </Reveal>
      ))}
      <Rule />

      <AnimatePresence>
        {showPreview && (
          <motion.div
            aria-hidden="true"
            data-accent={preview.accent}
            className="pointer-events-none fixed left-0 top-0 z-30 hidden w-[clamp(260px,22vw,360px)] sm:block"
            style={{ x: px, y: py, translateX: '28px', translateY: '-50%' }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="overflow-hidden rounded-xl border border-accent shadow-2xl shadow-black/50">
              <img
                src={preview.cover.src}
                alt=""
                className="block aspect-[16/10] w-full object-cover object-top"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
