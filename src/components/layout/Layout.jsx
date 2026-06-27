import { useEffect, Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header.jsx'
import { Footer } from './Footer.jsx'
import { CommandPalette } from './CommandPalette.jsx'
import { useCommandPalette } from '../../hooks/useCommandPalette.js'

// App shell: skip link → header → routed page → footer, plus the ⌘K command palette.
export function Layout() {
  const { pathname } = useLocation()
  const { open, openPalette, closePalette } = useCommandPalette()

  // Reset scroll on route change (SPA navigation doesn't do this by default).
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:border focus:border-ink focus:bg-paper focus:px-3 focus:py-2 focus:font-mono focus:text-sm focus:text-ink"
      >
        Skip to content
      </a>
      <Header onOpenCommand={openPalette} />
      <main id="main">
        <Suspense fallback={<div className="min-h-[60vh]" aria-hidden="true" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <CommandPalette open={open} onClose={closePalette} />
    </>
  )
}
