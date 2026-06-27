import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout.jsx'
import Home from './routes/Home.jsx'
import Work from './routes/Work.jsx'
import CaseStudy from './routes/CaseStudy.jsx'

// About, Contact, and 404 land in later tasks.
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/:slug" element={<CaseStudy />} />
      </Route>
    </Routes>
  )
}
