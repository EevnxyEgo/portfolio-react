import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { Reveal } from './Reveal.jsx'

function mockReducedMotion(reduced) {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: reduced,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('Reveal', () => {
  it('renders children plainly (visible) when reduced motion is preferred', () => {
    mockReducedMotion(true)
    render(<Reveal>build log</Reveal>)
    expect(screen.getByText('build log')).toBeVisible()
  })

  it('still renders children when motion is allowed', () => {
    mockReducedMotion(false)
    // jsdom lacks IntersectionObserver; provide a no-op so whileInView mounts cleanly.
    global.IntersectionObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
    render(<Reveal>animated content</Reveal>)
    expect(screen.getByText('animated content')).toBeInTheDocument()
  })

  it('honors the `as` prop for the rendered element tag', () => {
    mockReducedMotion(true)
    render(<Reveal as="section">section content</Reveal>)
    expect(screen.getByText('section content').tagName).toBe('SECTION')
  })
})
