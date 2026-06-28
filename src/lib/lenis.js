// Shared handle to the active Lenis instance so any component (scroll buttons, route
// changes) can drive smooth scrolling — with a graceful native fallback when Lenis is
// off (reduced motion / not mounted).
export const lenisRef = { current: null }

export function smoothScrollTo(target, options = {}) {
  const lenis = lenisRef.current
  if (lenis) {
    lenis.scrollTo(target, options)
    return
  }
  const top = typeof target === 'number' ? target : 0
  window.scrollTo({ top, behavior: options.immediate ? 'auto' : 'smooth' })
}
