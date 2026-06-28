import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme.js'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isLight = theme === 'light'
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-rule text-ink-soft transition-colors hover:border-ink-faint hover:text-ink"
    >
      {isLight ? <Moon size={15} aria-hidden="true" /> : <Sun size={15} aria-hidden="true" />}
    </button>
  )
}
