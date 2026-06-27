import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'

import './styles/tokens.css'
import './styles/base.css'

// Fonts (self-hosted, only the weights we use) — display / body / mono.
import '@fontsource/newsreader/400.css'
import '@fontsource/newsreader/500.css'
import '@fontsource/hanken-grotesk/400.css'
import '@fontsource/hanken-grotesk/500.css'
import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/jetbrains-mono/500.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)

// A small hello for the developers who actually open devtools.
console.log(
  '%cArsenius Audley%c\nFull-stack developer who finishes what he starts.\n\nFound the console — try ⌘K / Ctrl+K anywhere to jump around.\nSource: https://github.com/EevnxyEgo',
  'font: 500 20px Newsreader, serif; color: #0f6b47;',
  'font: 13px JetBrains Mono, monospace; color: #5e5749;',
)
