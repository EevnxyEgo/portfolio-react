import { ArrowRight, ArrowDown } from 'lucide-react'

// An honest architecture diagram (not a fake UI mockup) of JobFit's real design:
// one background.js is the single boundary that touches your key, storage, and the model.
function Box({ title, sub, accent = false }) {
  return (
    <div
      className={
        'flex-1 rounded-lg border bg-paper px-4 py-3 text-center ' +
        (accent ? 'border-shipped' : 'border-rule')
      }
    >
      <p className={'font-mono text-sm ' + (accent ? 'text-shipped' : 'text-ink')}>{title}</p>
      {sub && <p className="mt-1 text-xs text-ink-soft">{sub}</p>}
    </div>
  )
}

export function JobFitVisual() {
  return (
    <figure className="rounded-xl border border-rule bg-raised p-5 sm:p-7">
      <figcaption className="font-mono text-[11px] tracking-[0.08em] text-ink-faint">
        the trust boundary
      </figcaption>

      <div className="mt-4 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
        <Box title="job posting" sub="LinkedIn · Indeed · Glassdoor" />
        <Arrow label="content.js" />
        <Box title="background.js" sub="the only file touching your key + storage" accent />
        <Arrow label="https" />
        <Box title="Gemini API" sub="your own free key" />
      </div>

      <p className="mt-4 font-mono text-xs text-ink-soft">
        chrome.storage.local holds the key and data · nothing else leaves the browser — no server,
        no analytics
      </p>
    </figure>
  )
}

function Arrow({ label }) {
  return (
    <div className="flex shrink-0 flex-col items-center justify-center px-1 text-ink-faint">
      <ArrowRight size={18} aria-hidden="true" className="hidden sm:block" />
      <ArrowDown size={18} aria-hidden="true" className="sm:hidden" />
      <span className="mt-0.5 font-mono text-[10px]">{label}</span>
    </div>
  )
}
