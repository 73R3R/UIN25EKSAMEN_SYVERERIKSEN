import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Home from './components/Home'
import EventPage from './components/EventPage'
import CategoryPage from './components/CategoryPage'
import Dashboard from './components/Dashboard'
import { useEffect, useState } from 'react'

function App() {

  const [festivals, setFestivals] = useState([])
        
//ID i HomeFestivals, er hentet fra https://developer.ticketmaster.com/api-explorer/v2/
  const HomeFestivals = [
    "Z698xZb_Z16v7eGkFy", 
    "Z698xZb_Z17q339", 
    "Z698xZb_Z17qfao", 
    "Z698xZb_Z17q3qg"
  ]

  const fetchFestivals = async () => {
  try {
      const results = []

      for (const id of HomeFestivals) {
      const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=yWdCXPTsPw3L7xhXkdX8QHbiLgkrx7Fl`)
      const data = await response.json()
      results.push(data)
      }
      setFestivals(results)
  } catch (error) {
      console.error("Feil ved henting", error)
  }
  }

  useEffect(() => {
    fetchFestivals()
  }, [])

  useEffect(() => {
    console.log(festivals)
  }, [festivals])

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home festivals={festivals} />} />
        <Route path="/event/:id" element={<EventPage festivals={festivals} />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </Layout>
  )
}

export default App
