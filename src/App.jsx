import { Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import './App.css'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ContactPage from './pages/ContactPage'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
      </Routes>
      <Analytics />
    </>
  )
}

export default App
