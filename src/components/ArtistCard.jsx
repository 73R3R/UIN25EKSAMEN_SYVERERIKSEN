import '../assets/styles/artistcard.scss'

export default function ArtistCard({ festivals, id }) {

    //console.log("artistkortet her", festivals)

    const festival = festivals?.find(f => f.id === id)
    const artist = festival?._embedded?.attractions

    if (!artist || artist.length === 0) {
        return <p>Ingen artister funnet for denne festivalen.</p>
    }

    return (
        <>
        <h2>Artister:</h2>
        <section>
            {artist.map((artist) => (
                <article className='artistkort' key={artist.id}>
                    <img src={artist.images[0].url}/>
                    <h3>{artist.name}</h3>
                </article>
            ))}
        </section>
        </>
    )
}