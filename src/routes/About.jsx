import { Link } from 'react-router-dom'
import { SeoHead } from '../components/primitives/SeoHead.jsx'
import { Reveal } from '../components/primitives/Reveal.jsx'
import { Tag } from '../components/primitives/Tag.jsx'
import { ExperienceList } from '../components/about/ExperienceList.jsx'
import { experience, education, credentials } from '../data/experience.js'

const RANGE = ['Web', 'Machine learning', 'Computer vision', 'Real-time 3D']

export default function About() {
  return (
    <>
      <SeoHead
        title="About"
        description="Arsenius Audley — a full-stack developer from Indonesia who builds and ships complete things across web, ML, and real-time 3D."
        path="/about"
      />

      <section className="mx-auto max-w-5xl px-6 pb-10 pt-16 sm:px-10">
        <Reveal>
          <h1 className="font-display text-display text-ink">About</h1>
        </Reveal>

        <div className="mt-10 grid gap-8 sm:grid-cols-[300px_1fr] sm:gap-12 lg:grid-cols-[340px_1fr]">
          <Reveal>
            <figure className="sm:sticky sm:top-24">
              <img
                src="/photos/about.webp"
                width="820"
                height="1092"
                alt="Arsenius Audley, seated and wearing a batik shirt with an award medal, against a light studio backdrop."
                className="w-full max-w-[280px] rounded-xl border border-rule sm:max-w-none"
                loading="eager"
                decoding="async"
              />
            </figure>
          </Reveal>

          <div>
            <Reveal delay={0.06}>
              <div className="flex max-w-[60ch] flex-col gap-5 text-lg leading-relaxed text-ink-soft">
                <p className="text-xl text-ink">
                  I&rsquo;m a full-stack developer based in Indonesia. I like building complete things
                  — not demos that fall apart when you click the second button, but products that ship,
                  hold up, and read as considered.
                </p>
                <p>
                  Most of what I make starts as a problem I actually have: a way to learn React that
                  shows you the re-renders, a job-hunt tool that keeps your data on your own machine, a
                  booking flow that feels designed rather than assembled.
                </p>
                <p>
                  I studied Computer Engineering at Institut Teknologi Sepuluh Nopember, where my thesis
                  was a 360° camera system with dynamic view control for a digital-twin music concert —
                  four camera modes and a finite-state machine, all in Unreal Engine 5. That range is
                  the throughline: I&rsquo;ve shipped web apps, trained ML models, done computer vision,
                  and built real-time 3D. The common thread isn&rsquo;t a single stack — it&rsquo;s
                  finishing.
                </p>
                <p>
                  Right now I&rsquo;m in the Korea–ASEAN Digital Academy, an intensive full-stack
                  program, sharpening the web side. Before that I interned as a software engineer at
                  IDstar, where I automated the busywork out of a recruitment pipeline.
                </p>
                <p className="text-ink">
                  If you&rsquo;re hiring, or you have something that needs to actually get built and
                  shipped, I&rsquo;m{' '}
                  <Link to="/contact" className="text-shipped underline-offset-4 hover:underline">
                    open to work
                  </Link>
                  .
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-10">
                <p className="font-mono text-xs tracking-[0.1em] text-ink-faint">the range</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {RANGE.map((r) => (
                    <Tag key={r}>{r}</Tag>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-10 sm:px-10" aria-labelledby="experience-heading">
        <Reveal>
          <h2 id="experience-heading" className="font-display text-section text-ink">
            Experience
          </h2>
        </Reveal>
        <ExperienceList items={experience} />
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-10 sm:px-10" aria-labelledby="education-heading">
        <Reveal>
          <h2 id="education-heading" className="font-display text-section text-ink">
            Education
          </h2>
        </Reveal>
        <ExperienceList items={education} />
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-14 sm:px-10" aria-labelledby="credentials-heading">
        <Reveal>
          <h2 id="credentials-heading" className="font-display text-section text-ink">
            Achievements and certifications
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="mt-6 grid gap-8 sm:grid-cols-2">
            <ul className="flex flex-col gap-3">
              {credentials.achievements.map((a) => (
                <li key={a} className="flex gap-2.5 text-ink-soft">
                  <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-shipped" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
            <ul className="flex flex-col gap-3">
              {credentials.certifications.map((c) => (
                <li key={c} className="flex gap-2.5 text-ink-soft">
                  <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-faint" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>
    </>
  )
}
