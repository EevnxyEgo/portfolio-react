import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// Logic tests only (data shape, validation, palette filtering). Visual fidelity is checked
// with Playwright, not unit tests — see docs/superpowers/plans.
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
    include: ['src/**/*.test.{js,jsx}'],
  },
})
