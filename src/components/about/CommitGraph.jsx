import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Reveal } from '../primitives/Reveal.jsx'
import { Tag } from '../primitives/Tag.jsx'
import { cn } from '../../lib/cn.js'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js'

gsap.registerPlugin(ScrollTrigger)

// The career as a commit graph: a continuous `main` line (jade, drawing in with scroll) with
// feature-branch commits jutting off and tag markers. The site's Ship Log thesis, applied to a life.
// Reduced motion → the line is full and static; rows reveal instantly.

function NodeDot({ type, head }) {
  // init = hollow origin ring; feat/ship = filled; head pulses (the current commit)
  if (type === 'init') {
    return <span className="block h-3 w-3 rounded-full border-2 border-accent bg-paper" />
  }
  return (
    <span className="relative block h-3 w-3 rounded-full bg-accent">
      {head && (
        <span className="absolute inset-0 animate-ping rounded-full bg-accent motion-reduce:animate-none" />
      )}
    </span>
  )
}

function CommitRow({ item }) {
  const branch = item.lane === 'branch'
  return (
    <Reveal as="li" className="relative pl-14">
      {/* rail: connector (branch only) + node dot */}
      {branch && (
        <span aria-hidden="true" className="absolute left-[11px] top-[10px] h-px w-5 bg-rule" />
      )}
      <span
        aria-hidden="true"
        className={cn('absolute top-[5px]', branch ? 'left-[25px]' : 'left-[5px]')}
      >
        <NodeDot type={item.type} head={item.head} />
      </span>

      {/* content */}
      <div className="pb-9">
        <p className="font-mono text-xs text-accent">
          {item.date}
          {item.head && <span className="ml-2 rounded-sm bg-accent px-1.5 py-0.5 text-paper">HEAD</span>}
        </p>
        <p className="mt-1 font-mono text-[11px] text-ink-faint">
          {branch ? `branch ${item.branch}` : item.label}
        </p>
        <h3 className="mt-1.5 font-display text-xl text-ink">{item.org}</h3>
        <p className="mt-0.5 text-ink-soft">{item.role}</p>
        <ul className="mt-2 flex flex-col gap-1.5">
          {item.points.map((p, i) => (
            <li key={i} className="text-sm leading-relaxed text-ink-soft">
              {p}
            </li>
          ))}
        </ul>
        {item.tags?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {item.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        )}
      </div>
    </Reveal>
  )
}

export function CommitGraph({ items, certifications = [] }) {
  const reduced = usePrefersReducedMotion()
  const containerRef = useRef(null)
  const fillRef = useRef(null)

  useEffect(() => {
    const fill = fillRef.current
    if (!fill) return
    if (reduced || !containerRef.current) {
      fill.style.height = '100%'
      return
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        fill,
        { height: '0%' },
        {
          height: '100%',
          ease: 'none',
          scrollTrigger: { trigger: containerRef.current, start: 'top 70%', end: 'bottom 80%', scrub: true },
        },
      )
    }, containerRef)
    return () => ctx.revert()
  }, [reduced])

  return (
    <div ref={containerRef} className="relative">
      {/* the main branch: rule track + jade fill that draws in on scroll */}
      <div aria-hidden="true" className="absolute bottom-2 left-[11px] top-1 w-px bg-rule">
        <div ref={fillRef} className="w-px bg-accent" style={{ height: '0%' }} />
      </div>

      <ol className="flex flex-col">
        {items.map((item) => (
          <CommitRow key={item.id} item={item} />
        ))}

        {/* the tag node — certifications as git tags */}
        {certifications.length > 0 && (
          <Reveal as="li" className="relative pl-14">
            <span
              aria-hidden="true"
              className="absolute left-[6px] top-[4px] h-2.5 w-2.5 rotate-45 border border-accent bg-paper"
            />
            <div>
              <p className="font-mono text-xs text-accent">tags/</p>
              <p className="mt-1 font-mono text-[11px] text-ink-faint">certifications</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {certifications.map((c) => (
                  <Tag key={c}>{c}</Tag>
                ))}
              </div>
            </div>
          </Reveal>
        )}
      </ol>
    </div>
  )
}
