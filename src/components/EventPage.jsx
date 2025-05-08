import { useParams } from "react-router-dom"
import ArtistCard from "./ArtistCard"

export default function EventPage({ festivals }){

    if (!festivals || festivals.length === 0) {
        return <p>Tekst en ikke skal se, eventpage</p>
    }

    const { id } = useParams()

    const festival = festivals?.find(f => f.id === id)
    const festivalNAME = festival?._embedded?.attractions?.[0]?.name

    return(
        <>
        <h1 key={festival.id}>{festivalNAME}</h1>
        <ArtistCard festivals={festivals} id={id}/>
        </>
    )
}