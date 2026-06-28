import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '../primitives/Reveal.jsx'
import { profile } from '../../data/profile.js'

const LINKS = [
  { label: 'See the work', to: '/work', ml: '' },
  { label: 'About me', to: '/about', ml: 'lg:ml-[16%]' },
  { label: 'Download CV', href: profile.links.cv, download: true, ml: 'lg:ml-[6%]' },
  { label: 'Get in touch', to: '/contact', ml: 'lg:ml-[24%]' },
]

export function WhatsNext() {
  return (
    <section
      className="mx-auto max-w-[1500px] px-6 py-24 sm:px-10 lg:px-14 lg:py-32"
      aria-labelledby="whats-next-heading"
    >
      <Reveal>
        <h2 id="whats-next-heading" className="font-display text-display font-bold tracking-[-0.02em] text-ink">
          What&rsquo;s next?
        </h2>
      </Reveal>

      <div className="mt-12 flex flex-col gap-3 sm:mt-16 sm:gap-6">
        {LINKS.map((l, i) => {
          const Tag = l.to ? Link : 'a'
          const props = l.to ? { to: l.to } : { href: l.href, download: l.download }
          return (
            <Reveal key={l.label} delay={i * 0.06} className={l.ml}>
              <Tag
                {...props}
                className="group inline-flex items-center gap-4 text-ink-faint transition-colors duration-300 hover:text-ink"
              >
                <span className="font-display text-[clamp(2.4rem,1rem+6vw,6rem)] font-bold leading-none tracking-tight">
                  {l.label}
                </span>
                <ArrowUpRight
                  className="mt-2 shrink-0 -translate-x-3 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  size={40}
                  aria-hidden="true"
                />
              </Tag>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
