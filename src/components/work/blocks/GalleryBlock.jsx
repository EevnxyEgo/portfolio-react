import { Reveal } from '../../primitives/Reveal.jsx'

// Real, honest screenshots stacked full-width. Skipped entirely when a project has none
// (JobFit, by design — its case study shows the trust-boundary diagram instead).
export function GalleryBlock({ kicker = 'in the wild', title = 'The product', images = [] }) {
  if (!images.length) return null
  return (
    <section className="mx-auto max-w-4xl px-6 py-10 sm:px-10">
      <Reveal>
        {kicker && <p className="font-mono text-xs tracking-[0.1em] text-accent">{kicker}</p>}
        <h2 className="mt-2 font-display text-section text-ink">{title}</h2>
      </Reveal>
      <div className="mt-6 flex flex-col gap-5">
        {images.map((img, i) => (
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
    </section>
  )
}
