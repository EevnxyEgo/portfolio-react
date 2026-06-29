import { memo, useLayoutEffect, useRef, useState } from 'react'
import { Reveal } from '../../primitives/Reveal.jsx'

// React Playground's signature: the project's whole thesis is "make React's invisible parts
// visible" — so the case study does exactly that, live. Click to re-render the parent and watch
// which components actually re-render. Toggle React.memo to watch the child opt out.
//
// useRenderFlash is a faithful mini-version of the app's real hook: on every commit it restarts
// a CSS flash on the element. The "rendered ×N" counter (incremented in render) is the
// reduced-motion-safe signal when the flash itself is suppressed.

function useRenderFlash() {
  const ref = useRef(null)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    el.classList.remove('render-flash')
    void el.offsetWidth // force reflow so the animation restarts every commit
    el.classList.add('render-flash')
  })
  return ref
}

function ChildInner({ tint }) {
  const ref = useRenderFlash()
  const renders = useRef(0)
  renders.current += 1 // render-count pattern; doubles only under dev StrictMode
  return (
    <div ref={ref} className="rounded-lg border border-rule bg-paper p-4">
      <p className="font-mono text-xs text-ink-faint">Child</p>
      <p className="mt-1 text-sm text-ink-soft">
        props: <span className="font-mono text-ink">{tint}</span> · never changes
      </p>
      <p className="mt-2 font-mono text-xs text-accent">rendered ×{renders.current}</p>
    </div>
  )
}

const MemoChild = memo(ChildInner)

export function PlaygroundRerender() {
  const [count, setCount] = useState(0)
  const [memoized, setMemoized] = useState(false)

  const parentRef = useRenderFlash()
  const parentRenders = useRef(0)
  parentRenders.current += 1

  const Child = memoized ? MemoChild : ChildInner

  return (
    <Reveal as="section" className="mx-auto max-w-3xl px-6 py-10 sm:px-10">
      <p className="font-mono text-xs tracking-[0.1em] text-accent">the signature · try it</p>
      <h2 className="mt-2 font-display text-section text-ink">See a re-render</h2>
      <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-ink-soft">
        Re-renders are invisible — until you make them visible. Click the button; every component
        that re-renders flashes. Then memoize the child and watch it opt out.
      </p>

      <div ref={parentRef} className="mt-7 rounded-xl border border-accent bg-raised p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-xs text-ink-faint">Parent</p>
          <p className="font-mono text-xs text-accent">rendered ×{parentRenders.current}</p>
        </div>

        <div className="mt-4">
          <Child tint="steady" />
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
          <button
            type="button"
            onClick={() => setCount((c) => c + 1)}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 font-mono text-sm text-paper transition-transform hover:-translate-y-0.5"
            data-cursor-label="click"
          >
            setCount → {count}
          </button>

          <label className="inline-flex cursor-pointer items-center gap-2 font-mono text-sm text-ink-soft">
            <input
              type="checkbox"
              checked={memoized}
              onChange={(e) => setMemoized(e.target.checked)}
              className="h-4 w-4 accent-[var(--color-accent)]"
            />
            wrap child in <span className="text-ink">React.memo</span>
          </label>
        </div>

        <p className="mt-4 font-mono text-xs leading-relaxed text-ink-soft">
          {memoized
            ? '→ React.memo skips the child: its props never changed, so only the parent re-renders.'
            : '→ The child re-renders with the parent — even though its props never changed. That’s the default.'}
        </p>
      </div>
    </Reveal>
  )
}
