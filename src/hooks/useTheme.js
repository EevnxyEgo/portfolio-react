import { useCallback, useState } from 'react'

// Reads the theme set pre-paint by the inline script in index.html, and toggles it
// (updating <html data-theme> + localStorage). Defaults to dark.
function current() {
  if (typeof document === 'undefined') return 'dark'
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'
}

export function useTheme() {
  const [theme, setTheme] = useState(current)

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light'
      document.documentElement.setAttribute('data-theme', next)
      try {
        localStorage.setItem('theme', next)
      } catch {
        /* storage unavailable — choice just won't persist */
      }
      return next
    })
  }, [])

  return { theme, toggle }
}
