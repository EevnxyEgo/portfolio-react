import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { SeoHead } from '../components/primitives/SeoHead.jsx'
import { Reveal } from '../components/primitives/Reveal.jsx'
import { DeployStream } from '../components/shiplog/DeployStream.jsx'
import { SelectedBuilds } from '../components/work/SelectedBuilds.jsx'
import { profile } from '../data/profile.js'

export default function Home() {
  return (
    <>
      <SeoHead path="/" />

      <section className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 pb-16 pt-14 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:pb-24 lg:pt-20">
        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2 font-mono text-sm text-shipped">
              <span className="h-2 w-2 rounded-full bg-shipped-bright" aria-hidden="true" />
              open to work — {profile.locationNote}
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="mt-5 font-display text-display font-bold leading-[0.98] tracking-[-0.02em] text-ink">
              Full-stack developer who{' '}
              <span className="text-shipped">finishes</span> what he starts.
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-ink-soft">{profile.intro}</p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/work"
                className="inline-flex items-center gap-2 rounded-full bg-shipped px-5 py-2.5 font-mono text-sm text-paper transition-transform hover:-translate-y-0.5"
              >
                See the work <ArrowRight size={15} aria-hidden="true" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-ink-soft px-5 py-2.5 font-mono text-sm text-ink transition-colors hover:border-ink"
              >
                Get in touch
              </Link>
              <span className="ml-1 font-mono text-sm text-ink-faint">
                {profile.stats.shipped} shipped · {profile.stats.commits} commits · {profile.stats.liveOnWeb} live
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:justify-self-end">
          <DeployStream />
        </Reveal>
      </section>

      <section
        className="mx-auto max-w-5xl px-6 pb-10 sm:px-10"
        aria-labelledby="selected-builds-heading"
      >
        <Reveal>
          <div className="flex items-baseline justify-between">
            <h2 id="selected-builds-heading" className="font-display text-section font-semibold text-ink">
              Selected builds
            </h2>
            <Link
              to="/work"
              className="font-mono text-sm text-ink-soft transition-colors hover:text-ink"
            >
              all work →
            </Link>
          </div>
        </Reveal>
        <SelectedBuilds />
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-16 sm:px-10" aria-labelledby="about-teaser-heading">
        <Reveal>
          <div className="flex flex-col items-start gap-6 rounded-2xl border border-rule bg-raised p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-8">
            <img
              src="/photos/home.webp"
              width="480"
              height="720"
              alt="Arsenius Audley, headshot in a suit against a light studio backdrop."
              className="w-28 shrink-0 rounded-xl border border-rule sm:w-36"
              loading="lazy"
              decoding="async"
            />
            <div>
              <h2 id="about-teaser-heading" className="font-display text-section font-semibold text-ink">
                The person behind the ships
              </h2>
              <p className="mt-2 max-w-[52ch] text-ink-soft">
                I&rsquo;m Arsenius — a full-stack developer who builds and ships complete products,
                design to deploy. If that&rsquo;s what your team needs, let&rsquo;s talk.
              </p>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm">
                <Link to="/about" className="text-shipped transition-opacity hover:opacity-80">
                  read my story →
                </Link>
                <Link to="/contact" className="text-ink-soft transition-colors hover:text-ink">
                  get in touch →
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
