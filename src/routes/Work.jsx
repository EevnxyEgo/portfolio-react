import { Link } from 'react-router-dom'
import { SeoHead } from '../components/primitives/SeoHead.jsx'
import { Reveal } from '../components/primitives/Reveal.jsx'
import { Tag } from '../components/primitives/Tag.jsx'
import { SelectedWorkGrid } from '../components/work/SelectedWorkGrid.jsx'
import { caseStudies } from '../data/projects.js'
import { cn } from '../lib/cn.js'

function WorkCard({ cs }) {
  const shipped = cs.status === 'shipped'
  return (
    <Reveal>
      <Link
        to={`/work/${cs.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-xl border border-rule bg-raised transition-colors hover:border-ink-faint"
      >
        <div className="aspect-[16/10] overflow-hidden border-b border-rule bg-paper">
          {cs.cover ? (
            <img
              src={cs.cover.src}
              alt={cs.cover.alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-top"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="font-mono text-sm text-ink-faint">chrome extension</span>
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-2xl text-ink">{cs.name}</h2>
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
  return (
    <>
      <SeoHead
        title="Work"
        description="Three shipped products told as build → ship → result stories, plus selected work across ML, computer vision, and real-time 3D."
        path="/work"
      />

      <section className="mx-auto max-w-5xl px-6 pb-10 pt-16 sm:px-10">
        <Reveal>
          <h1 className="font-display text-display text-ink">Work</h1>
          <p className="mt-4 max-w-[52ch] text-lg text-ink-soft">
            Three complete products, each told as a build → ship → result story.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((cs) => (
            <WorkCard key={cs.slug} cs={cs} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-10 sm:px-10" aria-labelledby="selected-work-heading">
        <Reveal>
          <h2 id="selected-work-heading" className="font-display text-section text-ink">
            Selected work
          </h2>
          <p className="mt-3 max-w-[52ch] text-ink-soft">
            Group projects, a thesis, and course finals — the range behind the web work.
          </p>
        </Reveal>
        <SelectedWorkGrid />
      </section>
    </>
  )
}
