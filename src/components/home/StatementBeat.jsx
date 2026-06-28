import { motion } from 'motion/react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js'
import { cn } from '../../lib/cn.js'

// A full-bleed cinematic statement that lands word by word as it enters view.
const WORDS = [
  { t: 'Most' },
  { t: 'code' },
  { t: 'never' },
  { t: 'ships.' },
  { t: 'Mine' },
  { t: 'does.', accent: true },
  { t: 'Three' },
  { t: 'complete' },
  { t: 'products,' },
  { t: 'all' },
  { t: 'live.' },
]

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } }
const word = {
  hidden: { opacity: 0, y: '0.45em' },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export function StatementBeat() {
  const reduced = usePrefersReducedMotion()

  return (
    <section className="border-y border-rule bg-raised">
      <div className="mx-auto flex min-h-[62vh] max-w-[1500px] items-center px-6 py-20 sm:px-10 lg:px-14">
        {reduced ? (
          <p className="max-w-[20ch] font-display text-[clamp(2rem,1rem+4.2vw,4.75rem)] font-semibold leading-[1.04] tracking-tight text-ink">
            {WORDS.map((w, i) => (
              <span key={i} className={cn(w.accent && 'text-shipped')}>
                {w.t}{' '}
              </span>
            ))}
          </p>
        ) : (
          <motion.p
            className="max-w-[20ch] font-display text-[clamp(2rem,1rem+4.2vw,4.75rem)] font-semibold leading-[1.04] tracking-tight text-ink"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
          >
            {WORDS.map((w, i) => (
              <motion.span key={i} variants={word} className={cn('inline-block', w.accent && 'text-shipped')}>
                {w.t}&nbsp;
              </motion.span>
            ))}
          </motion.p>
        )}
      </div>
    </section>
  )
}
