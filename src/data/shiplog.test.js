import { describe, it, expect } from 'vitest'
import shiplog from './shiplog.json'
import { caseStudies } from './projects.js'

const REPOS = new Set(['reel', 'react-playground', 'jobfit'])
const TYPES = new Set(['init', 'feat', 'fix', 'chore', 'docs', 'deploy'])

describe('shiplog data', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(shiplog)).toBe(true)
    expect(shiplog.length).toBeGreaterThan(0)
  })

  it('every entry has a valid ISO date, a known repo, a known type, and a message', () => {
    for (const entry of shiplog) {
      expect(Number.isNaN(Date.parse(entry.date)), `bad date: ${entry.date}`).toBe(false)
      expect(REPOS.has(entry.repo), `unknown repo: ${entry.repo}`).toBe(true)
      expect(TYPES.has(entry.type), `unknown type: ${entry.type}`).toBe(true)
      expect(typeof entry.message).toBe('string')
      expect(entry.message.length).toBeGreaterThan(0)
    }
  })

  it('deploy entries carry an absolute url', () => {
    for (const entry of shiplog.filter((e) => e.type === 'deploy')) {
      expect(entry.url).toMatch(/^https?:\/\//)
    }
  })

  it('is sorted newest-first', () => {
    for (let i = 1; i < shiplog.length; i++) {
      expect(Date.parse(shiplog[i - 1].date)).toBeGreaterThanOrEqual(Date.parse(shiplog[i].date))
    }
  })

  it('every case study repo appears in the ship log', () => {
    const reposInLog = new Set(shiplog.map((e) => e.repo))
    for (const cs of caseStudies) {
      expect(reposInLog.has(cs.repo), `no ship-log entries for ${cs.repo}`).toBe(true)
    }
  })
})
