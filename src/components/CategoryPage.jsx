import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import CatEventCard from "./CatEventCard"
import CatAttractionCard from "./CatAttractionCard"
import '../assets/styles/catpage.scss'


export default function CategoryPage(){

    const { slug } = useParams()

    const [catEvent, setCatEvent] = useState()
    const [catAttraction, setCatAttraction] = useState()

    const [search, setSearch] = useState("")
    const [searchEventResult, setSearchEventResult] = useState([]);
    const [searchAttractionResult, setSearchAttractionResult] = useState([]);
    const [IsSearching, setIsSearching] = useState(false)

    const [filterDato, setFilterDato] = useState("")
    const [filterLand, setFilterLand] = useState("")
    const [filterBy, setFilterBy] = useState("")
    const [filtEvent, setFiltEvent] = useState()
    const [filtAttraction, setFiltAttraction] = useState()
    const [isFiltering, setIsFiltering] = useState(false)
    

    const getCatEvent = async () => {
        fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=yWdCXPTsPw3L7xhXkdX8QHbiLgkrx7Fl&classificationName=${slug}&size=9`)
        .then((response) => response.json())
        .then((data) => setCatEvent(data?._embedded?.events))
        .catch((error) => console.error("Feil ved fetch av catEvent", error))
    }

    useEffect(() => {
        getCatEvent()
    }, [slug])

    /*useEffect(() => {
        console.log("catEvent liste", catEvent)
    }, [catEvent])*/

    const getCatAttraction = async () => {
        fetch(`https://app.ticketmaster.com/discovery/v2/attractions?apikey=yWdCXPTsPw3L7xhXkdX8QHbiLgkrx7Fl&locale=*&classificationName=${slug}&size=9`)
        .then((response) => response.json())
        .then((data) => setCatAttraction(data?._embedded?.attractions))
        .catch((error) => console.error("fecth av attractions gikk feil", error))
    }

    useEffect(() => {
        getCatAttraction()
    }, [slug])

    /*useEffect(() => {
        console.log("attractiones", catAttraction)
    }, [catAttraction])*/

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        handleClick()
        handleClick2()
        setIsSearching(true)
    }

    //søkefunksjon funksjoner
    const handleClick = async () => {
        fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=yWdCXPTsPw3L7xhXkdX8QHbiLgkrx7Fl&size=9&keyword=${search}`)
        .then((response) => response.json())
        .then((data) => setSearchEventResult(data?._embedded?.events))
        .catch((error) => console.error("feil ved search fetch", error))
    }

    const handleClick2 = async () => {
        fetch(`https://app.ticketmaster.com/discovery/v2/attractions?apikey=yWdCXPTsPw3L7xhXkdX8QHbiLgkrx7Fl&size=9&keyword=${search}`)
        .then((response) => response.json())
        .then((data) => setSearchAttractionResult(data?._embedded?.attractions))
        .catch((error) => console.error("feil ved search fetch", error))
    }


    //dato og land og by filtrering fetch
    const getFilteredData = async () => {
        try {
            setIsFiltering(true)
          const eventRes = await fetch(`
            https://app.ticketmaster.com/discovery/v2/events.json?apikey=yWdCXPTsPw3L7xhXkdX8QHbiLgkrx7Fl&size=9&city=${filterBy}&countryCode=${filterLand}&startDateTime=${filterDato}T00:00:00Z`);
          const eventData = await eventRes.json()
          setFiltEvent(eventData._embedded?.events)
    
          const attractionRes = await fetch(`https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=yWdCXPTsPw3L7xhXkdX8QHbiLgkrx7Fl&size=9&keyword=${filterBy, filterLand}`);
          const attractionData = await attractionRes.json()
          setFiltAttraction(attractionData._embedded?.attractions)
        } catch (error) {
          console.error("Feil under filtrering", error)
        }
      }

      useEffect(() => {
        console.log("filtrert  at", filtAttraction)
      }, [filtAttraction])

      useEffect(() => {
        console.log("filtrert  ev", filtEvent)
      }, [filtEvent])

    return(
        <>
        <h1>{slug}</h1>
        <section className="catpage">
            <form onSubmit={(e) => {
                e.preventDefault()
                getFilteredData()}}>
                <h2>Filtrert søk</h2>
                <label htmlFor="dato">Dato:</label>
                <input type="date" id="dato" value={filterDato} onChange={(e) => setFilterDato(e.target.value)} name="dato" />
                <label htmlFor="land">Land:</label>
                <select id="land" value={filterLand} onChange={(e) => setFilterLand(e.target.value)}>
                    <option value="">Velg et land</option>
                    <option value="NO">Norge</option>
                    <option value="SE">Sverige</option>
                    <option value="DE">Tyskland</option>
                </select>
                <label htmlFor="by">By:</label>
                <select id="by" value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
                    <option value="">Velg by</option>
                    <option value="oslo">Oslo</option>
                    <option value="stockholm">Stockholm</option>
                    <option value="berlin">Berlin</option>
                </select>
                <button type="submit">Filtrer</button>
            </form>
            <form onSubmit={handleSubmit}>
                <label htmlFor="search">Søk etter event, attraksjon eller spillested</label>
                <input type="search" id="search" onChange={handleChange} placeholder="festival"/>
                <button>Søk</button>
            </form>
        </section>

        {IsSearching ? (
            //printer ut basert på om en bruker søke/filter funksjon
        <>
        {searchEventResult.length > 0 && (
            <CatEventCard catEvent={searchEventResult} />
            )}
            {searchAttractionResult.length > 0 && (
             <CatAttractionCard catAttraction={searchAttractionResult} />
            )}
            </>
        ) : isFiltering ? (
            <>
        {filtEvent?.length > 0 && (
            <CatEventCard catEvent={filtEvent} />
        )}
        {filtAttraction?.length > 0 && (
            <CatAttractionCard catAttraction={filtAttraction} />
        )}
            </>
        ) : (
            <>
                <CatEventCard catEvent={catEvent} />
                <CatAttractionCard catAttraction={catAttraction} />
            </>
        )}
        </>
    )
}