import { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { Reveal } from '../../primitives/Reveal.jsx'
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion.js'
import { cn } from '../../../lib/cn.js'

// REEL's signature: its actual standout feature, made touchable. Pick a showtime and seats on a
// keyboard-navigable map; the price ticker updates live; a generated e-ticket stub renders with a
// QR motif seeded by the selection. The real, scannable ticket lives in the screenshot gallery —
// this is the interactive preview of it. Reduced motion drops the ticker animation only.

const SHOWTIMES = ['13:00', '16:30', '20:00']
const ROWS = ['A', 'B', 'C', 'D', 'E']
const COLS = [1, 2, 3, 4, 5, 6, 7, 8]
const PRICE = 45000
const MAX_SEATS = 6

// Deterministic "house" — the same seats are always taken, so it reads as a real screening.
const TAKEN = new Set(['A4', 'A5', 'B2', 'C6', 'C7', 'D1', 'E4', 'E5', 'E8'])

const rupiah = (n) => 'Rp ' + n.toLocaleString('id-ID')

// — tiny deterministic PRNG so the QR motif is stable per selection —
function hashStr(s) {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}
function mulberry32(a) {
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const QR = 21
const inFinder = (r, c) =>
  (r <= 7 && c <= 7) || (r <= 7 && c >= 13) || (r >= 13 && c <= 7)

function QrGlyph({ seed }) {
  const cells = useMemo(() => {
    const rng = mulberry32(hashStr(seed))
    const out = []
    for (let r = 0; r < QR; r++) {
      for (let c = 0; c < QR; c++) {
        if (inFinder(r, c)) continue
        if (rng() > 0.52) out.push([c, r])
      }
    }
    return out
  }, [seed])

  const finder = (x, y) => (
    <g key={`${x}-${y}`}>
      <rect x={x} y={y} width="7" height="7" fill="var(--color-accent)" />
      <rect x={x + 1} y={y + 1} width="5" height="5" fill="var(--color-raised)" />
      <rect x={x + 2} y={y + 2} width="3" height="3" fill="var(--color-accent)" />
    </g>
  )

  return (
    <svg viewBox={`0 0 ${QR} ${QR}`} className="h-24 w-24 shrink-0" role="img" aria-label="ticket QR code">
      {cells.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="var(--color-ink)" />
      ))}
      {finder(0, 0)}
      {finder(14, 0)}
      {finder(0, 14)}
    </svg>
  )
}

function Seat({ id, state, onToggle }) {
  const taken = state === 'taken'
  return (
    <button
      type="button"
      disabled={taken}
      aria-pressed={state === 'selected'}
      aria-label={`Seat ${id}, ${state}`}
      onClick={() => onToggle(id)}
      data-cursor-label={taken ? undefined : 'pick'}
      className={cn(
        'h-6 w-6 rounded-[5px] border font-mono text-[9px] transition-colors sm:h-7 sm:w-7',
        taken && 'cursor-not-allowed border-rule bg-transparent text-ink-faint/40',
        state === 'available' && 'border-rule text-ink-faint hover:border-accent hover:text-ink',
        state === 'selected' && 'border-accent bg-accent text-paper',
      )}
    >
      {id.slice(1)}
    </button>
  )
}

export function ReelTicket() {
  const reduced = usePrefersReducedMotion()
  const [showtime, setShowtime] = useState(SHOWTIMES[1])
  const [seats, setSeats] = useState(() => new Set(['B4']))

  const toggle = (id) =>
    setSeats((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else if (next.size < MAX_SEATS) next.add(id)
      return next
    })

  const chosen = [...seats].sort()
  const total = chosen.length * PRICE
  const seed = `${showtime}|${chosen.join(',')}`

  const Price = reduced ? 'span' : motion.span

  return (
    <Reveal as="section" className="mx-auto max-w-4xl px-6 py-10 sm:px-10">
      <p className="font-mono text-xs tracking-[0.1em] text-accent">the signature · try it</p>
      <h2 className="mt-2 font-display text-section text-ink">Build your ticket</h2>
      <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-ink-soft">
        The booking flow, in miniature. Pick a showtime and your seats — the price tracks live, and
        your e-ticket prints itself.
      </p>

      <div className="mt-7 grid gap-5 rounded-xl border border-rule bg-raised p-5 sm:p-7 lg:grid-cols-[1fr_auto] lg:gap-8">
        {/* controls */}
        <div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Showtime">
            {SHOWTIMES.map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={showtime === t}
                onClick={() => setShowtime(t)}
                data-cursor-label="set"
                className={cn(
                  'rounded-full border px-3 py-1 font-mono text-xs transition-colors',
                  showtime === t
                    ? 'border-accent bg-accent text-paper'
                    : 'border-rule text-ink-soft hover:border-accent',
                )}
              >
                Today {t}
              </button>
            ))}
          </div>

          <div className="mt-6">
            <div className="mx-auto mb-3 w-full max-w-[18rem] border-b border-accent/50 pb-1 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
              screen
            </div>
            <div className="flex flex-col items-center gap-1.5">
              {ROWS.map((row) => (
                <div key={row} className="flex items-center gap-1.5">
                  <span className="w-3 font-mono text-[10px] text-ink-faint">{row}</span>
                  {COLS.map((col) => {
                    const id = `${row}${col}`
                    const state = TAKEN.has(id) ? 'taken' : seats.has(id) ? 'selected' : 'available'
                    return (
                      <span key={id} className={col === 5 ? 'ml-3' : undefined}>
                        <Seat id={id} state={state} onToggle={toggle} />
                      </span>
                    )
                  })}
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] text-ink-faint">
              <span className="inline-flex items-center gap-1">
                <span className="h-2.5 w-2.5 rounded-[3px] border border-rule" /> available
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="h-2.5 w-2.5 rounded-[3px] bg-accent" /> yours
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="h-2.5 w-2.5 rounded-[3px] border border-rule bg-transparent opacity-40" /> taken
              </span>
            </div>
          </div>
        </div>

        {/* the e-ticket stub */}
        <div className="relative w-full overflow-hidden rounded-lg border border-rule bg-paper p-5 lg:w-72">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
            <span className="text-accent">REEL</span>
            <span>e-ticket</span>
          </div>
          <p className="mt-3 font-display text-xl text-ink">The Grand Budapest Hotel</p>
          <dl className="mt-3 grid grid-cols-2 gap-y-2 font-mono text-xs">
            <dt className="text-ink-faint">showtime</dt>
            <dd className="text-right text-ink">Today {showtime}</dd>
            <dt className="text-ink-faint">seats</dt>
            <dd className="text-right text-ink">{chosen.length ? chosen.join(', ') : '—'}</dd>
            <dt className="text-ink-faint">total</dt>
            <dd className="text-right">
              <Price
                key={reduced ? undefined : total}
                {...(reduced
                  ? {}
                  : { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.25 } })}
                className="text-accent"
              >
                {rupiah(total)}
              </Price>
            </dd>
          </dl>

          {/* perforation */}
          <div className="relative my-4 border-t border-dashed border-rule">
            <span className="absolute -left-7 -top-2 h-4 w-4 rounded-full bg-raised" aria-hidden="true" />
            <span className="absolute -right-7 -top-2 h-4 w-4 rounded-full bg-raised" aria-hidden="true" />
          </div>

          <div className="flex items-center gap-3">
            <QrGlyph seed={seed} />
            <p className="font-mono text-[10px] leading-relaxed text-ink-faint">
              {chosen.length ? 'scan at the door' : 'pick a seat to issue'}
              <br />
              <span className="text-ink-soft">REEL-{hashStr(seed).toString(36).slice(0, 6).toUpperCase()}</span>
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  )
}
