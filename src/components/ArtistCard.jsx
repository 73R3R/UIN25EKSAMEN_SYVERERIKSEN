export default function ArtistCard({ festivals, id }) {

    //console.log("artistkortet her", festivals)

    const festival = festivals?.find(f => f.id === id)
    const artist = festival?._embedded?.attractions

    if (!artist || artist.length === 0) {
        return <p>Ingen artister funnet for denne festivalen.</p>
    }

    return (
        <section>
            <h2>Artister:</h2>
            {artist.map((artist) => (
                <article key={artist.id}>
                    <img src={artist.images[0].url}/>
                    <h3>{artist.name}</h3>
                </article>
            ))}
        </section>
    )
}