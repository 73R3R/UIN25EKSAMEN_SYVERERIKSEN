import { useParams } from "react-router-dom"
import ArtistCard from "./ArtistCard"
import '../assets/styles/eventpage.scss'


export default function EventPage({ festivals, tickets }){

    //sjekker at festival har innhold før den kjører resten av koden/ kommer det ikke innhold står som følgende i p tag
    if (!festivals || festivals.length === 0) {
        return <p>Tekst en ikke skal se, eventpage</p>
    } 


    //hente id fra url
    const { id } = useParams()

    //finne festival fra id 
    const festival = festivals?.find(f => f.id === id)


    const eventetNS = festival?._embedded?.attractions?.[0]
    const sjang = festival?.classifications?.[0]


    // Filtrerer billetter basert på eventetNS.id
    const festivalTickets = tickets.filter(ticket => {
        const ticketAttraction = ticket._embedded?.attractions?.[0]
        return ticketAttraction?.id === eventetNS?.id
    })

    // Logger de filtrerte billettene (kan fjernes i produksjon)
    console.log("Filtrerte billetter:", festivalTickets)




    return(
        <>
        <h1>{eventetNS.name}</h1>
        <section>
            <article className="eventinfo">
                <h2>Sjanger</h2>
                <article>
                    <p>{sjang?.genre?.name}</p>
                    <p>{sjang?.subGenre?.name}</p>
                    <p>{sjang?.segment?.name}</p>
                </article>
                <h2>Sosiale Medier</h2> 
                <article className="sosiale">
                    {festival._embedded?.attractions?.[0]?.externalLinks &&
                    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
                    //Ligger array i array, object entries konverterer objektet extrenallinks til en array [type, links] / instgram, url
                    Object.entries(festival._embedded.attractions[0].externalLinks).map(
                        ([type, links]) =>
                        links.map((link, index) => (
                            <a key={index} href={link.url}>{type}</a>
                        ))
                    )}
                </article>
            </article>
        <article>
            <h2>Billetter</h2>
            <section>
            {festivalTickets.map(ticket => (
                <article className="eventsidekort" key={ticket.id}>
                    <img src={ticket.images?.[0].url} alt={ticket.name}/>
                    <h2>{ticket.name}</h2>
                    <article>
                        <p>{ticket.dates.timezone}</p>
                        <p>{ticket.dates.start.localDate}</p>
                    </article>
                    <article>
                        <button>Kjøp</button>
                        <button>Legg i ønskeliste</button>
                    </article>
                </article>
            ))}
            </section>
        </article>
        </section>
        <section className="artistkortene">
            <ArtistCard festivals={festivals} id={id}/>
        </section>
        </>
    )
}