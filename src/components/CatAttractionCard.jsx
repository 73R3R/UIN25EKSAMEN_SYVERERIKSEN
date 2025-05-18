import '../assets/styles/catcard.scss'


export default function CatAttractionCard({ catAttraction }) {

    if (!catAttraction || catAttraction.length === 0) {
        return <p>catAttraction er tom.</p>
    }

    return(
        <>
        <h1>Artister</h1>
        <section>
            {catAttraction.map((catAttraction) => (
                <article className="catKort" key={catAttraction.id}>
                    <img src={catAttraction.images?.[0].url} alt={catAttraction.name}/>
                    <h2>{catAttraction.name}</h2>
                    <button>Like</button>
                </article>
            ))}
        </section>
        </>
    )
}