import '../assets/styles/catcard.scss'


export default function CatEventCard({ catEvent }) {


    if (!catEvent || catEvent.length === 0) {
        return <p>catEvent er tom.</p>
    }

   // console.log("Full catEvent data:", catEvent)

    return(
        <>
        <h1>Eventer</h1>
        <section>
            {catEvent.map((catEvent) => (
                <article className="catKort" key={catEvent.id}>
                    <img src={catEvent.images?.[0].url} alt={catEvent.name}/>
                    <h2>{catEvent.name}</h2>
                    <button>Like</button>
                </article>
            ))}
        </section>
        </>
    )
}
