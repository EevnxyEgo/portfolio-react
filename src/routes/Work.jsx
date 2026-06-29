import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { SeoHead } from '../components/primitives/SeoHead.jsx'
import { Reveal } from '../components/primitives/Reveal.jsx'
import { Tag } from '../components/primitives/Tag.jsx'
import { SelectedWorkGrid } from '../components/work/SelectedWorkGrid.jsx'
import { caseStudies, selectedWork, domainFilters } from '../data/projects.js'
import { cn } from '../lib/cn.js'

// A featured case-study card that "wakes" on hover: the cover desaturates + dims at rest, then
// colourises and lights its accent edge; the metric surfaces. data-accent ties the wake colour
// to the project's world.
function WorkCard({ cs }) {
  const shipped = cs.status === 'shipped'
  return (
    <Reveal>
      <Link
        to={`/work/${cs.slug}`}
        data-accent={cs.accent}
        data-cursor-label="read the build"
        className="group flex h-full flex-col overflow-hidden rounded-xl border border-rule bg-raised transition-colors duration-300 hover:border-accent"
      >
        <div className="aspect-[16/10] overflow-hidden border-b border-rule bg-paper">
          {cs.cover ? (
            <img
              src={cs.cover.src}
              alt={cs.cover.alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-top opacity-70 grayscale transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100 group-hover:grayscale-0"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="font-mono text-sm text-ink-faint transition-colors group-hover:text-accent">
                chrome extension
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-2xl text-ink transition-transform duration-300 group-hover:translate-x-1">
              {cs.name}
            </h2>
            <span
              className={cn(
                'inline-flex items-center gap-1.5 font-mono text-xs',
                shipped ? 'text-shipped' : 'text-ink-faint',
              )}
            >
              <span
                className={cn('h-1.5 w-1.5 rounded-full', shipped ? 'bg-shipped-bright' : 'bg-ink-faint')}
                aria-hidden="true"
              />
              {cs.status}
            </span>
          </div>
          <p className="mt-2 text-sm text-ink-soft">{cs.tagline}</p>
          <p className="mt-3 font-mono text-xs text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {cs.hoverMetric}
          </p>
          <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
            {cs.stack.slice(0, 3).map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </div>
        </div>
      </Link>
    </Reveal>
  )
}

export default function Work() {
  const [filter, setFilter] = useState('All')

  const matches = (item) => filter === 'All' || item.domains.includes(filter)
  const featured = useMemo(() => caseStudies.filter(matches), [filter])
  const selected = useMemo(() => selectedWork.filter(matches), [filter])

  return (
    <>
      <SeoHead
        title="Work"
        description="Three shipped products told as build → ship → result stories, plus selected work across ML, computer vision, and real-time 3D."
        path="/work"
      />

      <section className="mx-auto max-w-5xl px-6 pb-6 pt-16 sm:px-10">
        <Reveal>
          <h1 className="font-display text-display text-ink">Work</h1>
          <p className="mt-4 max-w-[52ch] text-lg text-ink-soft">
            Three complete products, each told as its own build → ship → result story — plus the
            range behind them.
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter work by domain">
            {domainFilters.map((d) => (
              <button
                key={d}
                type="button"
                aria-pressed={filter === d}
                onClick={() => setFilter(d)}
                className={cn(
                  'rounded-full border px-3.5 py-1.5 font-mono text-xs transition-colors',
                  filter === d
                    ? 'border-shipped bg-shipped text-paper'
                    : 'border-rule text-ink-soft hover:border-ink-faint hover:text-ink',
                )}
              >
                {d}
              </button>
            ))}
          </div>
        </Reveal>
      </section>

      {featured.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 pb-10 sm:px-10" aria-label="Featured case studies">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((cs) => (
              <WorkCard key={cs.slug} cs={cs} />
            ))}
          </div>
        </section>
      )}

      {selected.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 pb-10 sm:px-10" aria-labelledby="selected-work-heading">
          <Reveal>
            <h2 id="selected-work-heading" className="font-display text-section text-ink">
              Selected work
            </h2>
            <p className="mt-3 max-w-[52ch] text-ink-soft">
              Group projects, a thesis, and course finals — the range behind the web work.
            </p>
          </Reveal>
          <SelectedWorkGrid items={selected} />
        </section>
      )}

      {featured.length === 0 && selected.length === 0 && (
        <section className="mx-auto max-w-5xl px-6 pb-16 sm:px-10">
          <p className="font-mono text-sm text-ink-faint">Nothing under that filter yet.</p>
        </section>
      )}
    </>
  )
}
