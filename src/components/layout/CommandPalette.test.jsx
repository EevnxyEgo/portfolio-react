import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import { CommandPalette } from './CommandPalette.jsx'

function renderPalette() {
  const onClose = vi.fn()
  render(
    <MemoryRouter>
      <CommandPalette open onClose={onClose} />
    </MemoryRouter>,
  )
  return { onClose, input: screen.getByRole('combobox') }
}

describe('CommandPalette', () => {
  it('filters actions by query', () => {
    const { input } = renderPalette()
    fireEvent.change(input, { target: { value: 'reel' } })
    const options = screen.getAllByRole('option')
    expect(options.some((o) => /REEL/i.test(o.textContent))).toBe(true)
    expect(options.some((o) => /About/i.test(o.textContent))).toBe(false)
  })

  it('shows a no-matches row for an unknown query', () => {
    const { input } = renderPalette()
    fireEvent.change(input, { target: { value: 'zzzznope' } })
    expect(screen.queryAllByRole('option')).toHaveLength(0)
    expect(screen.getByText(/no matches/i)).toBeInTheDocument()
  })

  it('closes on Escape', () => {
    const { onClose, input } = renderPalette()
    fireEvent.keyDown(input, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('moves the active option with ArrowDown', () => {
    const { input } = renderPalette()
    const first = screen.getByRole('option', { selected: true })
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    const next = screen.getByRole('option', { selected: true })
    expect(next).not.toBe(first)
  })
})
