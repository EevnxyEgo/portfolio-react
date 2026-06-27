import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout.jsx'
import Home from './routes/Home.jsx'

// Home loads eagerly for a fast first paint; everything else is code-split.
// This keeps GSAP (used only by case studies) out of the initial bundle.
const Work = lazy(() => import('./routes/Work.jsx'))
const CaseStudy = lazy(() => import('./routes/CaseStudy.jsx'))
const About = lazy(() => import('./routes/About.jsx'))
const Contact = lazy(() => import('./routes/Contact.jsx'))
const NotFound = lazy(() => import('./routes/NotFound.jsx'))

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="work" element={<Work />} />
        <Route path="work/:slug" element={<CaseStudy />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
