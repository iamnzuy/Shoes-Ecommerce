import { NavLink, Link } from "react-router"
// import BreadCrumb from "./BreadCrumb"

// for testing purpose

function Header(){
    return (
        <header className="sticky top-0 bg-white block py-2 my-2 border-b-2 shadow-md">
            <div className="flex flex-row justify-between">
                <div>logo</div>
                <nav className="">
                    <NavLink to="/client" className="mx-2 text-xl font-medium">Home</NavLink>
                    <NavLink to="/client/products" className="mx-2  text-xl font-medium">Products</NavLink>
                    <NavLink to="/client/contact" className="mx-2 text-xl font-medium">Contact</NavLink>
                    <NavLink to="/client/cart" className="mx-2 text-xl font-medium">Cart</NavLink>
                    <NavLink to="/login" className="mx-2 text-xl font-medium">Login</NavLink>
                </nav>
            </div>
        </header>
    )
}


export default Header