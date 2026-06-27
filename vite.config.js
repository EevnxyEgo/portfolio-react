import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Vite + React (plain JS) + Tailwind CSS v4 (via the dedicated plugin, no PostCSS config).
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Surface large assets early; keep the bundle inspectable for the Lighthouse perf gate.
    chunkSizeWarningLimit: 900,
  },
})
