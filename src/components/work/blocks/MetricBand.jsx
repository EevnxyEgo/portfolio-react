import { Reveal } from '../../primitives/Reveal.jsx'

// Spine block: the project's real result metrics. The summary line carries the accent edge;
// the numbers stay ink for legibility.
export function MetricBand({ summary, metrics = [] }) {
  return (
    <Reveal as="section" className="mx-auto max-w-3xl px-6 py-10 sm:px-10">
      <p className="font-mono text-xs tracking-[0.1em] text-accent">the result</p>
      {summary && <p className="mt-2 max-w-[52ch] font-display text-section text-ink">{summary}</p>}

      <dl className="mt-8 grid grid-cols-3 gap-3">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-xl border border-rule bg-raised px-4 py-5 transition-colors hover:border-accent"
          >
            <dd className="font-mono text-2xl text-ink sm:text-3xl">{m.value}</dd>
            <dt className="mt-1 font-mono text-xs text-ink-faint">{m.label}</dt>
          </div>
        ))}
      </dl>
    </Reveal>
  )
}
