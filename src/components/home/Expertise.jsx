import { Reveal } from '../primitives/Reveal.jsx'
import { Rule } from '../primitives/Rule.jsx'
import { CountUp } from '../primitives/CountUp.jsx'

const STATS = [
  { value: 3, label: 'products shipped' },
  { value: 318, label: 'commits' },
  { value: 19, label: 'React modules' },
  { value: 0, label: 'servers · JobFit' },
]

const DOMAINS = [
  {
    name: 'Full-stack web',
    detail: 'React, Node, and the whole pipeline to a live deploy — design through production.',
    note: '3 shipped products',
  },
  {
    name: 'Machine learning',
    detail: 'Recommender systems, pose detection, and production model deployment.',
    note: 'Bangkit ML cohort',
  },
  {
    name: 'Computer vision',
    detail: 'Real-time CNN detection and image processing with TensorFlow and OpenCV.',
    note: 'CV final + thesis',
  },
  {
    name: 'Real-time 3D',
    detail: 'A 360° camera system with dynamic view control in Unreal Engine — my ITS thesis.',
    note: 'undergraduate thesis',
  },
]

export function Expertise() {
  return (
    <section
      className="mx-auto max-w-[1500px] px-6 py-20 sm:px-10 lg:px-14 lg:py-28"
      aria-labelledby="expertise-heading"
    >
      <Reveal>
        <p className="font-mono text-sm tracking-[0.1em] text-shipped">what i do</p>
        <h2 id="expertise-heading" className="mt-3 max-w-[18ch] font-display text-section font-semibold text-ink">
          One developer, the whole stack — and a little beyond it.
        </h2>
      </Reveal>

      <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.05}>
            <p className="font-display text-[clamp(2.6rem,1.6rem+3vw,4.25rem)] font-bold leading-none text-ink">
              <CountUp to={s.value} />
            </p>
            <p className="mt-2 font-mono text-xs text-ink-faint">{s.label}</p>
          </Reveal>
        ))}
      </div>

      <div className="mt-16">
        {DOMAINS.map((d, i) => (
          <Reveal key={d.name} delay={i * 0.05}>
            <div className="group grid items-baseline gap-x-8 gap-y-2 border-t border-rule py-7 sm:grid-cols-[1fr_auto]">
              <div>
                <h3 className="font-display text-3xl font-semibold tracking-tight text-ink transition-transform duration-300 group-hover:translate-x-2 sm:text-5xl">
                  {d.name}
                </h3>
                <p className="mt-2.5 max-w-[52ch] text-ink-soft">{d.detail}</p>
              </div>
              <span className="font-mono text-sm text-shipped">{d.note}</span>
            </div>
          </Reveal>
        ))}
        <Rule />
      </div>
    </section>
  )
}
