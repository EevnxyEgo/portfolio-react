import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Reveal } from '../../primitives/Reveal.jsx'
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion.js'

gsap.registerPlugin(ScrollTrigger)

// The build as a true numbered sequence (problem→ship is a real arc, so numbering is earned).
// A vertical rail in the project's accent grows with scroll — a build progressing toward shipped.
// The real commit trail lives separately in the spine (ShipLog). Reduced motion → full static rail.
export function BuildLogBlock({ kicker = 'the build', title = 'The build', beats = [] }) {
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
          scrollTrigger: { trigger: containerRef.current, start: 'top 65%', end: 'bottom 75%', scrub: true },
        },
      )
    }, containerRef)
    return () => ctx.revert()
  }, [reduced])

  if (!beats.length) return null

  return (
    <Reveal as="section" className="mx-auto max-w-3xl px-6 py-10 sm:px-10">
      <p className="font-mono text-xs tracking-[0.1em] text-accent">{kicker}</p>
      <h2 className="mt-2 font-display text-section text-ink">{title}</h2>

      <div ref={containerRef} className="relative mt-6 pl-10">
        <div className="absolute bottom-2 left-3 top-2 w-px bg-rule" aria-hidden="true">
          <div ref={fillRef} className="w-px bg-accent" style={{ height: '0%' }} />
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
      </div>
    </Reveal>
  )
}
