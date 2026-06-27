import { Routes, Route } from 'react-router-dom'
import Home from './routes/Home.jsx'

// Routes are filled in milestone by milestone (Work, About, Contact, 404 land in later tasks).
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}
