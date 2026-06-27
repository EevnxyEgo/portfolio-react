import { Reveal } from '../primitives/Reveal.jsx'
import { Rule } from '../primitives/Rule.jsx'

// A two-column timeline row used for both experience and education entries.
export function ExperienceList({ items }) {
  return (
    <div className="mt-6">
      {items.map((item, i) => (
        <Reveal key={item.org} delay={i * 0.05}>
          <Rule />
          <div className="grid gap-2 py-6 sm:grid-cols-[10rem_1fr] sm:gap-8">
            <div>
              <p className="font-mono text-xs text-ink-faint">{item.period}</p>
            </div>
            <div>
              <h3 className="font-display text-xl text-ink">{item.org}</h3>
              {item.role && <p className="mt-0.5 text-sm text-ink-soft">{item.role}</p>}
              {item.detail && <p className="mt-0.5 text-sm text-ink-soft">{item.detail}</p>}
              {item.points && (
                <ul className="mt-3 flex flex-col gap-2">
                  {item.points.map((p, j) => (
                    <li key={j} className="flex gap-2.5 text-ink-soft">
                      <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-shipped" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              )}
              {item.note && <p className="mt-2 text-ink-soft">{item.note}</p>}
            </div>
          </div>
        </Reveal>
      ))}
      <Rule />
    </div>
  )
}
