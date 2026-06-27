import { Link } from 'react-router-dom'
import { Reveal } from '../primitives/Reveal.jsx'
import { Rule } from '../primitives/Rule.jsx'
import { caseStudies } from '../../data/projects.js'

// The home index: each case study a single told-story row. Hover reveals a real metric
// on desktop; the metric is shown inline on touch (no hover state there).
export function SelectedBuilds() {
  return (
    <div className="mt-6">
      {caseStudies.map((cs, i) => (
        <Reveal as="div" key={cs.slug} delay={i * 0.06}>
          <Link to={`/work/${cs.slug}`} className="group block">
            <Rule />
            <div className="flex items-baseline justify-between gap-4 py-5 sm:py-6">
              <div className="min-w-0">
                <h3 className="font-display text-2xl leading-snug text-ink sm:text-3xl">
                  {cs.name}
                  <span className="text-ink-faint"> — {cs.tagline}</span>
                </h3>
                <p className="mt-1.5 font-mono text-xs text-ink-soft">
                  problem → build → ship → result
                </p>
                <p className="mt-1 font-mono text-xs text-shipped sm:hidden">{cs.hoverMetric}</p>
              </div>
              <div className="hidden shrink-0 items-center gap-3 sm:flex">
                <span className="font-mono text-xs text-shipped opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {cs.hoverMetric}
                </span>
                <span
                  aria-hidden="true"
                  className="text-ink-faint transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </div>
            </div>
          </Link>
        </Reveal>
      ))}
      <Rule />
    </div>
  )
}
