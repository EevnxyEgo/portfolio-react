// A subtle film-grain overlay for warmth/texture — fixed, non-interactive, very low opacity.
// Sits above the page background but below the sticky header and command palette.
const NOISE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"

export function Grain() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[5] opacity-[0.045] mix-blend-soft-light"
      style={{ backgroundImage: `url("${NOISE}")`, backgroundSize: '140px 140px' }}
    />
  )
}
