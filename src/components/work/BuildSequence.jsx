import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check } from 'lucide-react'
import { Reveal } from '../primitives/Reveal.jsx'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js'
import { shipDate } from '../../lib/format.js'
import { cn } from '../../lib/cn.js'
import shiplog from '../../data/shiplog.json'

gsap.registerPlugin(ScrollTrigger)

// The scroll-driven build sequence: a vertical rail whose emerald fill grows with scroll
// (a build progressing toward "shipped"), the curated build beats as a true numbered
// sequence, and the project's real commit trail. Under reduced motion the rail is full and static.
export function BuildSequence({ repo, beats }) {
  const reduced = usePrefersReducedMotion()
  const containerRef = useRef(null)
  const fillRef = useRef(null)
  const commits = shiplog.filter((e) => e.repo === repo)

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
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 65%',
            end: 'bottom 75%',
            scrub: true,
          },
        },
      )
    }, containerRef)
    return () => ctx.revert()
  }, [reduced])

  return (
    <div ref={containerRef} className="relative pl-10">
      <div className="absolute bottom-2 left-3 top-2 w-px bg-rule" aria-hidden="true">
        <div ref={fillRef} className="w-px bg-shipped" style={{ height: '0%' }} />
      </div>

      <ol className="flex flex-col gap-7">
        {beats.map((beat, i) => (
          <Reveal as="li" key={i} delay={i * 0.05} className="relative">
            <span
              className="absolute -left-[2.35rem] top-0 flex h-6 w-6 items-center justify-center rounded-full border border-rule bg-paper font-mono text-[11px] text-ink-soft"
              aria-hidden="true"
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <p className="text-ink-soft">{beat}</p>
          </Reveal>
        ))}
      </ol>

      <Reveal className="mt-9">
        <p className="font-mono text-[11px] tracking-[0.08em] text-ink-faint">~ git log · {repo}</p>
        <ul className="mt-3 flex flex-col gap-2">
          {commits.map((c, i) => {
            const isDeploy = c.type === 'deploy'
            return (
              <li key={i} className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 font-mono text-sm">
                <span className="w-[3.4rem] shrink-0 text-ink-faint">{shipDate(c.date)}</span>
                <span
                  className={cn(
                    'inline-flex w-16 shrink-0 items-center gap-1',
                    isDeploy ? 'text-shipped' : 'text-ink-faint',
                  )}
                >
                  {isDeploy && <Check size={12} aria-hidden="true" />}
                  {c.type}
                </span>
                <span className="text-ink-soft">{c.message}</span>
              </li>
            )
          })}
        </ul>
      </Reveal>
    </div>
  )
}
