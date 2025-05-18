import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import CityCard from "./CityCard";
import '../assets/styles/home.scss'


export default function Home({ festivals }){

    const [city, setCity] = useState(null)
    const [cityEvent, setCityEvent] = useState([])

    //funksjon for fetching av by innhold

    const getCity = async (city) => {
        fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=yWdCXPTsPw3L7xhXkdX8QHbiLgkrx7Fl&size=10&locale=*&city=${city}`)
        .then((response) => response.json())
        .then((data) => setCityEvent(data))
        .catch((error) =>
        console.error("byeventfetchern", error))
    }

    useEffect(() => {
        if (city) {
            getCity(city)
        }
    }, [city])

    useEffect(() => {
        console.log("by event listen", cityEvent)
    }, [cityEvent])




    return(
        <>
        <h1>Sommerens Festivaler</h1>
        <section>
         <EventCard festivals={festivals} />
        </section>
        <h2>{city ? `Hva skjer i ${city}?` : "Hva skjer i verdens storbyer!"}</h2>
        <article className="byfiltrering">
            <button onClick={() => setCity("Oslo")}>Oslo</button>
            <button onClick={() => setCity("Stockholm")}>Stockholm</button>
            <button onClick={() => setCity("Berlin")}>Berlin</button>
            <button onClick={() => setCity("London")}>London</button>
            <button onClick={() => setCity("Paris")}>Paris</button>
        </article>
        <section>
            <CityCard cityEvent={cityEvent}/>
        </section>
        </>
    )
}