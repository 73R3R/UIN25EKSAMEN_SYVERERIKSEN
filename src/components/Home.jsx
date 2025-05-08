import EventCard from "./EventCard";

export default function Home({ festivals }){

    return(
        <>
        <h1>Sommerens Festivaler</h1>
        <EventCard festivals={festivals} />
        </>
    )
}