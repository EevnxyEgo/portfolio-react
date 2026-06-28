import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { lenisRef } from '../../lib/lenis.js'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js'

// Buttery smooth scrolling (Lenis). Disabled entirely under reduced motion — native
// scrolling then handles everything. Also resets scroll on route change.
export function SmoothScroll() {
  const reduced = usePrefersReducedMotion()
  const { pathname } = useLocation()

  useEffect(() => {
    if (reduced) return undefined
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 0.9 })
    lenisRef.current = lenis
    let frame = requestAnimationFrame(function loop(time) {
      lenis.raf(time)
      frame = requestAnimationFrame(loop)
    })
    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [reduced])

  useEffect(() => {
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname])

  return null
}
