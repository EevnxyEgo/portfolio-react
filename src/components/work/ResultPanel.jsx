import { Reveal } from '../primitives/Reveal.jsx'

// Result section: the summary line, real metrics, and the real screenshot gallery.
export function ResultPanel({ result, gallery = [] }) {
  return (
    <div>
      <p className="max-w-[52ch] text-lg text-ink-soft">{result.summary}</p>

      <dl className="mt-8 grid grid-cols-3 gap-3">
        {result.metrics.map((m) => (
          <div key={m.label} className="rounded-xl border border-rule bg-raised px-4 py-5">
            <dd className="font-mono text-2xl text-ink sm:text-3xl">{m.value}</dd>
            <dt className="mt-1 font-mono text-xs text-ink-faint">{m.label}</dt>
          </div>
        ))}
      </dl>

      {gallery.length > 0 && (
        <div className="mt-8 flex flex-col gap-5">
          {gallery.map((img, i) => (
            <Reveal key={img.src} delay={i * 0.05}>
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                decoding="async"
                className="w-full rounded-xl border border-rule"
              />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  )
}
