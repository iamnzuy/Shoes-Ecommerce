import { NavLink, Link } from "react-router"
// import BreadCrumb from "./BreadCrumb"

// for testing purpose

function Header(){
    return (
        <header className="sticky top-0 bg-white inline-block py-2 my-2">
            <nav className="">
                <NavLink>Home</NavLink>
                <NavLink>Products</NavLink>
            </nav>
            
        </header>
    )
}


export default Header