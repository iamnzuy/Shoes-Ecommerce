import { NavLink, Link } from "react-router"
// import BreadCrumb from "./BreadCrumb"

// for testing purpose

function Header(){
    return (
        <header className="sticky top-0 bg-white block py-2 my-2 border-b-2 shadow-md">
            <div className="flex flex-row justify-between">
                <div>Logo</div>
                <nav className="">
                    <NavLink to="/client" className="mx-2">Home</NavLink>
                    <NavLink to="/client/products" className="mx-2">Products</NavLink>
                    <NavLink to="/client/contact" className="mx-2">Contact</NavLink>
                    <NavLink to="/client/cart" className="mx-2">Cart</NavLink>
                    <NavLink to="/login" className="mx-2">Login</NavLink>
                </nav>
            </div>
        </header>
    )
}


export default Header