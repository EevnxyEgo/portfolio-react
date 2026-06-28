import { Link } from 'react-router-dom'
import { SeoHead } from '../components/primitives/SeoHead.jsx'
import { Reveal } from '../components/primitives/Reveal.jsx'
import { ShipLog } from '../components/shiplog/ShipLog.jsx'
import { SelectedBuilds } from '../components/work/SelectedBuilds.jsx'
import { profile } from '../data/profile.js'
import { caseStudies } from '../data/projects.js'
import shiplog from '../data/shiplog.json'
import { bareHost } from '../lib/format.js'

// Build the hero deploy log from real data: each product's deploy event (or latest
// activity), in chronological order, linking through to its case study.
function heroLog() {
  return caseStudies
    .map((cs) => {
      const repoEntries = shiplog.filter((e) => e.repo === cs.repo)
      const deploy = repoEntries.find((e) => e.type === 'deploy')
      const latest = [...repoEntries].sort((a, b) => Date.parse(b.date) - Date.parse(a.date))[0]
      const live = Boolean(cs.links.live)
      return {
        key: cs.slug,
        date: (deploy || latest).date,
        primary: cs.name,
        secondary: live ? `deployed → ${bareHost(cs.links.live)}` : 'built → load-unpacked extension',
        shipped: live,
        to: `/work/${cs.slug}`,
      }
    })
    .sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
}

export default function Home() {
  const log = heroLog()

  return (
    <>
      <SeoHead path="/" />

      <section className="mx-auto max-w-5xl px-6 pb-20 pt-20 sm:px-10 sm:pt-28">
        <Reveal>
          <h1 className="max-w-[16ch] font-display text-display leading-[1.04] tracking-tight text-ink">
            {profile.thesis}
          </h1>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-ink-soft">{profile.intro}</p>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-sm">
            <span className="inline-flex items-center gap-2 text-shipped">
              <span className="h-2 w-2 rounded-full bg-shipped-bright" aria-hidden="true" />
              {profile.availability}
            </span>
            <span className="text-ink-faint">
              {profile.stats.shipped} shipped · {profile.stats.liveOnWeb} live · {profile.locationNote}
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.2} className="mt-10 block max-w-2xl">
          <ShipLog entries={log} />
        </Reveal>
      </section>

      <section
        className="mx-auto max-w-5xl px-6 pb-10 sm:px-10"
        aria-labelledby="selected-builds-heading"
      >
        <Reveal>
          <div className="flex items-baseline justify-between">
            <h2 id="selected-builds-heading" className="font-display text-section text-ink">
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
          <div className="flex flex-col items-start gap-6 rounded-xl border border-rule bg-raised p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-8">
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
              <h2 id="about-teaser-heading" className="font-display text-section text-ink">
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
