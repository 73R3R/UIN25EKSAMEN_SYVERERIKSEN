import { useParams } from "react-router-dom"

export default function CategoryPage(){

    const { slug } = useParams()

    console.log(slug)

    return(
        <h1>{slug}</h1>
    )
}