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
  const [tickets, setTickets] = useState([])
        
//ID i HomeFestivals, er hentet fra https://developer.ticketmaster.com/api-explorer/v2/
  const HomeFestivals = [
    "Z698xZb_Z16v7eGkFy", 
    "Z698xZb_Z17q339", 
    "Z698xZb_Z17qfao", 
    "Z698xZb_Z17q3qg"
  ]

 const fetchFestivals = async () => {
  fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=yWdCXPTsPw3L7xhXkdX8QHbiLgkrx7Fl&id=Z698xZb_Z16v7eGkFy&id=Z698xZb_Z17q339&id=Z698xZb_Z17qfao&id=Z698xZb_Z17q3qg&locale=*`)
  .then((response) => response.json())
  .then((data) => setFestivals(data._embedded.events))
  .catch((error) => console.error("4festivalsfecth har gått galt", error))
 }

  useEffect(() => {
    fetchFestivals()
  }, [])


  const fetchTickets = async () => {
    setTimeout(() => {
    fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=yWdCXPTsPw3L7xhXkdX8QHbiLgkrx7Fl&attractionId=K8vZ917oWOV&attractionId=K8vZ917K7fV&attractionId=K8vZ917bJC7&attractionId=K8vZ917_YJf&locale=*&size=23`)
    .then((response) => response.json())
    .then((data) => setTickets(data._embedded.events))
    .catch((error) => console.error("4festivalsfecth har gått galt", error))
  }, 5000)} //5 sek delay for å unngå 429 feilkode

  useEffect(() => {
    fetchTickets()
  }, [])

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home festivals={festivals} />} />
        <Route path="/event/:id" element={<EventPage festivals={festivals} tickets={tickets} />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </Layout>
  )
}

export default App
