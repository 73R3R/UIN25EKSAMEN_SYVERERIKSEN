import { Link } from "react-router-dom";
import '../assets/styles/layout.scss'

export default function Layout({ children }){
    //Generell struktur
    return(
        <>
        <header>
            <nav>
                <Link className="Logo" to="/">BillettLyst</Link>
                <ul>
                    <li><Link to="category/music">MUSIKK</Link></li>
                    <li><Link to="category/sports">SPORT</Link></li>
                    <li><Link to="category/theatre">TEATER/SHOW</Link></li>
                </ul>
                <Link to="dashboard">LOGG INN</Link>
            </nav>
        </header>
        <main>
            {children}
        </main>
        <footer>
            <a href="https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/">Ticketmaster Discovery API</a>
        </footer>
        </>
    )
}