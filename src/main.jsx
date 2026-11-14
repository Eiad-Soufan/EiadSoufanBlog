import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import { LocaleProvider } from './i18n/LocaleContext'
import { loadPrerenderedRoute } from './pages/routeComponents'
import './index.css'
import './styles/tokens.css'
import './styles/base.css'
import './styles/motion.css'
import './styles/i18n.css'

const root = document.getElementById('root')
const isPrerendered = root.dataset.prerendered === 'true'
const renderApplication = (routeComponents) => (
  <React.StrictMode>
    <Router>
      <LocaleProvider>
        <App routeComponents={routeComponents} />
      </LocaleProvider>
    </Router>
  </React.StrictMode>
)

if (isPrerendered) {
  // Keep the generated page usable if its route chunk cannot load.
  loadPrerenderedRoute(window.location.pathname)
    .then((routeComponents) => hydrateRoot(root, renderApplication(routeComponents)))
    .catch((error) => console.error('Page scripts could not be loaded.', error))
} else {
  createRoot(root).render(renderApplication())
}
