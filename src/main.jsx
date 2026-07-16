import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import { LocaleProvider } from './i18n/LocaleContext'
import './index.css'
import './styles/tokens.css'
import './styles/base.css'
import './styles/motion.css'
import './styles/i18n.css'

const root = document.getElementById('root')
const isPrerendered = root.dataset.prerendered === 'true'
const application = (
  <React.StrictMode>
    <Router>
      <LocaleProvider>
        <App />
      </LocaleProvider>
    </Router>
  </React.StrictMode>
)

if (isPrerendered) {
  hydrateRoot(root, application)

  // The generated HTML keeps primary hero copy visible while the animation
  // runtime hydrates. Remove the guard only after the entrance timeline has
  // completed so there is no flash of hidden LCP content.
  const revealDelay = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ? 0
    : 1400
  window.setTimeout(() => root.removeAttribute('data-prerendered'), revealDelay)
} else {
  createRoot(root).render(application)
}
