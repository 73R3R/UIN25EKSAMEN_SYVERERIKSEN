import { Link } from "react-router-dom";
import '../assets/styles/eventcard.scss'


export default function EventCard({ festivals }){

    return(
        <>
        {festivals?.map((festival)=> {

        const festivalNAME = festival._embedded?.attractions?.[0]?.name
        return(
            <article className="eventkort" key={festival.id}>
                <img src={festival.images[0].url} alt={festivalNAME} />
                <h2>{festivalNAME}</h2>
                <Link to={`event/${festival.id}`}>Les mer om {festivalNAME}</Link>
            </article>
        )
        })}
        </>
    )
}