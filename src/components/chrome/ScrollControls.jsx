import { useEffect, useState } from 'react'
import { ArrowUp, ArrowDown } from 'lucide-react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js'
import { smoothScrollTo } from '../../lib/lenis.js'

// A small fixed control (à la onur.design) to jump to the top or bottom of the page.
// Appears once you've scrolled a little; respects reduced motion.
export function ScrollControls() {
  const reduced = usePrefersReducedMotion()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (getTop) => () => smoothScrollTo(getTop(), { immediate: reduced })

  return (
    <div
      {...(!visible && { inert: '' })}
      className={
        'fixed bottom-5 right-5 z-40 flex flex-col overflow-hidden rounded-full border border-rule bg-raised transition-opacity duration-300 ' +
        (visible ? 'opacity-100' : 'pointer-events-none opacity-0')
      }
    >
      <button
        type="button"
        onClick={go(() => 0)}
        aria-label="Scroll to top"
        className="flex h-10 w-10 items-center justify-center text-ink-soft transition-colors hover:text-ink"
      >
        <ArrowUp size={16} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={go(() => document.body.scrollHeight)}
        aria-label="Scroll to bottom"
        className="flex h-10 w-10 items-center justify-center border-t border-rule text-ink-soft transition-colors hover:text-ink"
      >
        <ArrowDown size={16} aria-hidden="true" />
      </button>
    </div>
  )
}
