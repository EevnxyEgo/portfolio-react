import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '../primitives/Reveal.jsx'
import { Tag } from '../primitives/Tag.jsx'
import { selectedWork } from '../../data/projects.js'

const EXTERNAL = { target: '_blank', rel: 'noreferrer' }

// The compact evidence grid for work beyond the three deep case studies.
export function SelectedWorkGrid() {
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2">
      {selectedWork.map((item, i) => {
        const Wrapper = item.link ? 'a' : 'div'
        const wrapperProps = item.link ? { href: item.link, ...EXTERNAL } : {}
        return (
          <Reveal key={item.name} delay={i * 0.05}>
            <Wrapper
              {...wrapperProps}
              className={
                'flex h-full flex-col rounded-xl border border-rule bg-raised p-5 ' +
                (item.link ? 'group transition-colors hover:border-ink-faint' : '')
              }
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-xl text-ink">{item.name}</h3>
                {item.link && (
                  <ArrowUpRight
                    size={16}
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-ink-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                )}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.blurb}</p>
              <p className="mt-3 font-mono text-xs text-ink-faint">{item.role}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {item.stack.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>
            </Wrapper>
          </Reveal>
        )
      })}
    </div>
  )
}
