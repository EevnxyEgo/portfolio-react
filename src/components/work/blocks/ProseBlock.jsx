import { Reveal } from '../../primitives/Reveal.jsx'

// A titled paragraph. The kicker carries the project's accent so each "world" tints its
// own section labels. Body comes single-sourced from the project (e.g. problem / ship).
export function ProseBlock({ kicker, title, body }) {
  if (!body) return null
  return (
    <Reveal as="section" className="mx-auto max-w-3xl px-6 py-10 sm:px-10">
      {kicker && <p className="font-mono text-xs tracking-[0.1em] text-accent">{kicker}</p>}
      <h2 className="mt-2 font-display text-section text-ink">{title}</h2>
      <p className="mt-5 text-lg leading-relaxed text-ink-soft">{body}</p>
    </Reveal>
  )
}
