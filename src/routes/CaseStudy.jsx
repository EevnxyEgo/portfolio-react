import { useParams, Navigate, Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { SeoHead } from '../components/primitives/SeoHead.jsx'
import { Reveal } from '../components/primitives/Reveal.jsx'
import { Rule } from '../components/primitives/Rule.jsx'
import { CaseStudyHero } from '../components/work/CaseStudyHero.jsx'
import { BuildSequence } from '../components/work/BuildSequence.jsx'
import { ResultPanel } from '../components/work/ResultPanel.jsx'
import { JobFitVisual } from '../components/work/JobFitVisual.jsx'
import { caseStudies } from '../data/projects.js'

// Each section is numbered because problem → build → ship → result is a genuine sequence
// (the deployment arc) — the one place numbering is earned.
function Section({ kicker, title, children }) {
  return (
    <Reveal as="section" className="mx-auto max-w-3xl px-6 py-10 sm:px-10">
      <p className="font-mono text-xs tracking-[0.1em] text-shipped">{kicker}</p>
      <h2 className="mt-2 font-display text-section text-ink">{title}</h2>
      <div className="mt-5">{children}</div>
    </Reveal>
  )
}

export default function CaseStudy() {
  const { slug } = useParams()
  const index = caseStudies.findIndex((c) => c.slug === slug)
  if (index === -1) return <Navigate to="/work" replace />

  const project = caseStudies[index]
  const next = caseStudies[(index + 1) % caseStudies.length]

  return (
    <>
      <SeoHead title={project.name} description={project.tagline} path={`/work/${project.slug}`} />

      <article className="pb-8">
        <div className="mx-auto max-w-3xl px-6 pt-12 sm:px-10 sm:pt-16">
          <CaseStudyHero project={project} />
        </div>

        <div className="mx-auto mt-10 max-w-4xl px-6 sm:px-10">
          {project.cover ? (
            <img
              src={project.cover.src}
              alt={project.cover.alt}
              className="w-full rounded-xl border border-rule"
              decoding="async"
            />
          ) : project.designedVisual === 'jobfit-boundary' ? (
            <JobFitVisual />
          ) : null}
        </div>

        <Section kicker="01 · problem" title="The problem">
          <p className="text-lg leading-relaxed text-ink-soft">{project.problem}</p>
        </Section>

        <Section kicker="02 · build" title="The build">
          <BuildSequence repo={project.repo} beats={project.build} />
        </Section>

        <Section kicker="03 · ship" title="The ship">
          <p className="text-lg leading-relaxed text-ink-soft">{project.ship}</p>
        </Section>

        <Section kicker="04 · result" title="The result">
          <ResultPanel result={project.result} gallery={project.gallery} />
        </Section>

        <div className="mx-auto max-w-3xl px-6 py-8 sm:px-10">
          <Rule />
          <div className="mt-8 rounded-xl border border-rule bg-raised p-6 sm:p-8">
            <p className="max-w-[34ch] font-display text-2xl text-ink">{project.cta}</p>
            <Link
              to="/contact"
              className="mt-4 inline-flex items-center gap-2 font-mono text-sm text-shipped transition-opacity hover:opacity-80"
            >
              Arsenius is open to work <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>

          <Link
            to={`/work/${next.slug}`}
            className="group mt-4 flex items-center justify-between gap-4 rounded-xl border border-rule p-5 transition-colors hover:border-ink-faint"
          >
            <span className="font-mono text-xs text-ink-faint">next case study</span>
            <span className="inline-flex items-center gap-2 font-display text-xl text-ink">
              {next.name}
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="text-ink-faint transition-transform group-hover:translate-x-1"
              />
            </span>
          </Link>
        </div>
      </article>
    </>
  )
}
