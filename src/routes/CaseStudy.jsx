import { useParams, Navigate, Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { SeoHead } from '../components/primitives/SeoHead.jsx'
import { Rule } from '../components/primitives/Rule.jsx'
import { CaseStudyHero } from '../components/work/CaseStudyHero.jsx'
import { ProseBlock } from '../components/work/blocks/ProseBlock.jsx'
import { GalleryBlock } from '../components/work/blocks/GalleryBlock.jsx'
import { BuildLogBlock } from '../components/work/blocks/BuildLogBlock.jsx'
import { SignatureBlock } from '../components/work/blocks/SignatureBlock.jsx'
import { ShipLog } from '../components/work/blocks/ShipLog.jsx'
import { MetricBand } from '../components/work/blocks/MetricBand.jsx'
import { caseStudies } from '../data/projects.js'

// Renders one story block. Each project orders its own blocks (see projects.js → story[]),
// so no two case studies share a section sequence — that's the anti-template move.
function StoryBlock({ block, project }) {
  switch (block.type) {
    case 'prose':
      return <ProseBlock kicker={block.kicker} title={block.title} body={project[block.from]} />
    case 'gallery':
      return <GalleryBlock kicker={block.kicker} title={block.title} images={project[block.from]} />
    case 'buildLog':
      return <BuildLogBlock kicker={block.kicker} title={block.title} beats={project.build} />
    case 'signature':
      return <SignatureBlock kind={block.kind} />
    default:
      return null
  }
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

      {/* data-accent enters this project's "world": text-accent / bg-accent / border-accent
          throughout the page resolve to the project's colour. */}
      <article data-accent={project.accent} className="pb-8">
        <CaseStudyHero project={project} />

        {/* the variable middle — each project's own ordered story + its one signature */}
        {project.story.map((block, i) => (
          <StoryBlock key={i} block={block} project={project} />
        ))}

        {/* the shared evidence spine — the git thesis, on every project */}
        <ShipLog repo={project.repo} />
        <MetricBand summary={project.result.summary} metrics={project.result.metrics} />

        <div className="mx-auto max-w-3xl px-6 py-8 sm:px-10">
          <Rule />
          <div className="mt-8 rounded-xl border border-rule bg-raised p-6 sm:p-8">
            <p className="max-w-[34ch] font-display text-2xl text-ink">{project.cta}</p>
            <Link
              to="/contact"
              className="mt-4 inline-flex items-center gap-2 font-mono text-sm text-accent transition-opacity hover:opacity-80"
            >
              Arsenius is open to work <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>

          <Link
            to={`/work/${next.slug}`}
            data-cursor-label="next"
            className="group mt-4 flex items-center justify-between gap-4 rounded-xl border border-rule p-5 transition-colors hover:border-ink-faint"
          >
            <span className="font-mono text-xs text-ink-faint">next build</span>
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
