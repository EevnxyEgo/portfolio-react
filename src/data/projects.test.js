import { describe, it, expect } from 'vitest'
import { caseStudies, selectedWork, domainFilters } from './projects.js'

const ACCENTS = ['reel', 'playground', 'jobfit']
const SIGNATURE_KINDS = ['reel-ticket', 'playground-rerender', 'jobfit-boundary']
const BLOCK_TYPES = ['prose', 'gallery', 'buildLog', 'signature']

describe('case study data model', () => {
  it('every case study has an accent world, domains, and a story', () => {
    for (const cs of caseStudies) {
      expect(ACCENTS, `${cs.slug} accent`).toContain(cs.accent)
      expect(cs.domains.length, `${cs.slug} domains`).toBeGreaterThan(0)
      expect(Array.isArray(cs.story) && cs.story.length, `${cs.slug} story`).toBeTruthy()
    }
  })

  it('story blocks are valid and reference real fields', () => {
    for (const cs of caseStudies) {
      for (const block of cs.story) {
        expect(BLOCK_TYPES, `${cs.slug} block type`).toContain(block.type)
        if (block.type === 'prose' || block.type === 'gallery') {
          // `from` must point at a field that actually exists on the project
          expect(cs, `${cs.slug} ${block.type}.from=${block.from}`).toHaveProperty(block.from)
        }
        if (block.type === 'signature') {
          expect(SIGNATURE_KINDS, `${cs.slug} signature`).toContain(block.kind)
        }
      }
    }
  })

  it('each case study composes its own unique block sequence (anti-template)', () => {
    const sequences = caseStudies.map((cs) => cs.story.map((b) => b.type + (b.kind || '')).join('>'))
    expect(new Set(sequences).size, 'no two case studies share a sequence').toBe(sequences.length)
  })

  it('every case study has exactly one signature moment', () => {
    for (const cs of caseStudies) {
      const signatures = cs.story.filter((b) => b.type === 'signature')
      expect(signatures.length, `${cs.slug} signature count`).toBe(1)
    }
  })
})

describe('work filter taxonomy', () => {
  it('every domain used by any project is offered as a filter', () => {
    const used = new Set([
      ...caseStudies.flatMap((c) => c.domains),
      ...selectedWork.flatMap((w) => w.domains),
    ])
    for (const d of used) expect(domainFilters, `filter for ${d}`).toContain(d)
  })

  it('selected work all carry domains', () => {
    for (const w of selectedWork) {
      expect(w.domains?.length, `${w.name} domains`).toBeGreaterThan(0)
    }
  })
})
