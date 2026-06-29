import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './Header.jsx'
import { Footer } from './Footer.jsx'
import { CommandPalette } from './CommandPalette.jsx'
import { Grain } from '../chrome/Grain.jsx'
import { ScrollControls } from '../chrome/ScrollControls.jsx'
import { SmoothScroll } from '../chrome/SmoothScroll.jsx'
import { CursorFollower } from '../chrome/CursorFollower.jsx'
import { useCommandPalette } from '../../hooks/useCommandPalette.js'

// App shell: skip link → header → routed page → footer, plus smooth scroll, custom cursor,
// scroll controls, and the ⌘K command palette. SmoothScroll also handles scroll-on-route.
export function Layout() {
  const { open, openPalette, closePalette } = useCommandPalette()

  return (
    <>
      <SmoothScroll />
      <Grain />
      <CursorFollower />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:border focus:border-ink focus:bg-paper focus:px-3 focus:py-2 focus:font-mono focus:text-sm focus:text-ink"
      >
        Skip to content
      </a>
      <Header onOpenCommand={openPalette} />
      <main id="main">
        {/* Reserve a full viewport so the footer starts below the fold while a lazy route
            loads — otherwise the fallback→content swap shifts the footer (CLS). */}
        <Suspense fallback={<div className="min-h-screen" aria-hidden="true" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <ScrollControls />
      <CommandPalette open={open} onClose={closePalette} />
    </>
  )
}
