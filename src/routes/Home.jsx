import { Link } from 'react-router-dom'
import { ArrowRight, ArrowDown } from 'lucide-react'
import { SeoHead } from '../components/primitives/SeoHead.jsx'
import { Reveal } from '../components/primitives/Reveal.jsx'
import { Magnetic } from '../components/primitives/Magnetic.jsx'
import { DeployStream } from '../components/shiplog/DeployStream.jsx'
import { SelectedBuilds } from '../components/work/SelectedBuilds.jsx'
import { StatementBeat } from '../components/home/StatementBeat.jsx'
import { Expertise } from '../components/home/Expertise.jsx'
import { WhatsNext } from '../components/home/WhatsNext.jsx'
import { profile } from '../data/profile.js'

export default function Home() {
  return (
    <>
      <SeoHead path="/" />

      <section className="relative px-6 pb-16 pt-12 sm:px-10 lg:px-14 lg:pb-24 lg:pt-16">
        <div className="mx-auto max-w-[1500px]">
          <Reveal immediate>
            <p className="inline-flex items-center gap-2 font-mono text-sm text-shipped">
              <span className="h-2 w-2 rounded-full bg-shipped-bright" aria-hidden="true" />
              open to work — {profile.locationNote}
            </p>
          </Reveal>

          <Reveal immediate delay={0.06}>
            <h1 className="mt-5 max-w-[15ch] font-display text-[clamp(2.8rem,1rem+7.4vw,7.5rem)] font-bold leading-[0.92] tracking-[-0.03em] text-ink">
              Full-stack developer who <span className="text-shipped">finishes</span> what he starts.
            </h1>
          </Reveal>

          <div className="mt-9 grid gap-10 lg:mt-11 lg:grid-cols-[1fr_minmax(440px,40%)] lg:items-start lg:gap-16">
            <div>
              <Reveal immediate delay={0.1}>
                <p className="max-w-[46ch] text-lg leading-relaxed text-ink-soft">{profile.intro}</p>
              </Reveal>

              <Reveal immediate delay={0.16}>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <Magnetic strength={0.25}>
                    <Link
                      to="/work"
                      className="inline-flex items-center gap-2 rounded-full bg-shipped px-5 py-2.5 font-mono text-sm text-paper transition-transform hover:-translate-y-0.5"
                    >
                      See the work <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                  </Magnetic>
                  <Magnetic strength={0.25}>
                    <a
                      href={profile.links.cv}
                      download
                      className="inline-flex items-center gap-2 rounded-full border border-ink-soft px-5 py-2.5 font-mono text-sm text-ink transition-colors hover:border-ink"
                    >
                      Download CV <ArrowDown size={15} aria-hidden="true" />
                    </a>
                  </Magnetic>
                  <Magnetic strength={0.25}>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 rounded-full border border-rule px-5 py-2.5 font-mono text-sm text-ink-soft transition-colors hover:border-ink-faint hover:text-ink"
                    >
                      Get in touch
                    </Link>
                  </Magnetic>
                </div>
              </Reveal>

              <Reveal immediate delay={0.2}>
                <p className="mt-6 font-mono text-sm text-ink-faint">
                  {profile.stats.shipped} shipped · {profile.stats.commits} commits ·{' '}
                  {profile.stats.liveOnWeb} live
                </p>
              </Reveal>
            </div>

            <Reveal immediate delay={0.12}>
              <DeployStream />
            </Reveal>
          </div>
        </div>
      </section>

      <StatementBeat />

      <section
        className="mx-auto max-w-6xl px-6 pb-12 pt-20 sm:px-10 lg:px-14 lg:pt-28"
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

      <Expertise />

      <section className="mx-auto max-w-6xl px-6 pb-16 sm:px-10 lg:px-14" aria-labelledby="about-teaser-heading">
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

      <WhatsNext />
    </>
  )
}
