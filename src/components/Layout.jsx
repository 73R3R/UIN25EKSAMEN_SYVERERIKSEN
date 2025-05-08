import { Link } from "react-router-dom";

export default function Layout({ children }){
    return(
        <>
        <header>
            <header>
                <Link to="/">BillettLyst</Link>
                <ul>
                    <li><Link to="category/music">MUSIKK</Link></li>
                    <li><Link to="category/sport">SPORT</Link></li>
                    <li><Link to="category/theatre">TEATER/SHOW</Link></li>
                </ul>
                <Link to="dashboard">LOGG INN</Link>
            </header>
        </header>
        <main>
            {children}
        </main>
        </>
    )
}