import { Link, useLocation } from 'react-router-dom'
import { SeoHead } from '../components/primitives/SeoHead.jsx'

// 404 themed as a missing deploy — consistent with the Ship Log thesis.
export default function NotFound() {
  const { pathname } = useLocation()
  return (
    <>
      <SeoHead title="Not found" description="This route never shipped." path={pathname} />

      <section className="mx-auto max-w-2xl px-6 py-24 sm:px-10 sm:py-32">
        <p className="font-mono text-sm text-ink-faint">404 · route not found</p>
        <h1 className="mt-3 font-display text-display text-ink">This route never shipped.</h1>

        <div className="mt-8 rounded-[10px] border border-rule bg-raised p-5">
          <p className="font-mono text-[11px] tracking-[0.08em] text-ink-faint">~ deploy log</p>
          <div className="mt-3 flex flex-wrap items-center gap-3 font-mono text-sm">
            <span className="h-2 w-2 rounded-full bg-alert" aria-hidden="true" />
            <span className="text-ink-faint">404</span>
            <span className="text-ink">GET {pathname}</span>
            <span className="text-ink-soft">→ no deploy found</span>
          </div>
        </div>

        <div className="mt-8 flex gap-6 font-mono text-sm">
          <Link to="/" className="text-shipped transition-opacity hover:opacity-80">
            → home
          </Link>
          <Link to="/work" className="text-ink-soft transition-colors hover:text-ink">
            → work
          </Link>
        </div>
      </section>
    </>
  )
}
