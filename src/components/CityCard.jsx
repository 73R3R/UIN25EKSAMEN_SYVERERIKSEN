import '../assets/styles/citycard.scss'


export default function CityCard({ cityEvent }){

    if (!cityEvent || cityEvent.length === 0) {
        return <p>...</p>
    }
    const cityInfo = cityEvent._embedded.events

    return(
        <>
        {cityInfo.map((city) => (
            <article className="citykort" key={city.id}>
                <img src={city.images?.[0].url} alt={city.name} />
                <h3>{city.name}</h3>
                <p>{city.dates.start.localDate}</p>
                <p>{city.dates.start.localTime}</p>
                <p>{city.dates.timezone}</p>
                <p>{city._embedded.venues[0].name}</p>
            </article>
        ))}
        </>
    )
}