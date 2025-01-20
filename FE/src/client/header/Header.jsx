import { NavLink, Link } from "react-router"
import useAuthStore from "../../store/authStore"
import { useEffect } from "react";
import "./Header.css"
// import BreadCrumb from "./BreadCrumb"


function Header(){
    const user = useAuthStore(state => state.user);
    const logout = useAuthStore(state => state.logout);
    
 
    const handleLogout = () => {
        logout();
    }

    return (
        <header className="sticky top-0 bg-white block py-2 border-b-2 shadow-md">
            <div className="flex flex-row justify-between items-center">
                <div  className="mx-2">
                    <img src={`/logo.png`} alt="" className="w-36 h-14"/>
                </div>
                <nav className="">
                    <NavLink to="/client" className="py-2 mx-3 text-xl font-medium no-underline text-slate-900 hover:text-slate-600">Home</NavLink>
                    <NavLink to="/client/products" className="mx-3 text-xl font-medium no-underline text-slate-900 hover:text-slate-600">Products</NavLink>
                    <NavLink to="/client/contact" className="mx-3 text-xl font-medium no-underline text-slate-900 hover:text-slate-600">Contact</NavLink>
                    <NavLink to="/client/cart" className="mx-2 p-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><i className="fa fa-cart-plus"></i></NavLink>
                    {(!user) ? 
                    (<>
                        <NavLink to="/register" className="mx-3 text-xl font-medium no-underline text-slate-900 hover:text-slate-600">Register</NavLink>
                        <span>/</span>
                        <NavLink to="/login" className="mx-3 text-xl font-medium no-underline text-slate-900 hover:text-slate-600">Login</NavLink>
                    </>) :
                    (<>
                    <div className="dropdown px-2 mx-2">
                        <button className="">{user.username}</button>
                        <div className="dropdown-content bg-slate-100">
                            <NavLink to={`${(user.role === "admin") ? "/admin/dashboard" : "/client"}`} className="py-2 px-4 hover:bg-slate-300 block">Profile</NavLink>
                            <button className="hover:bg-slate-300 block py-2 px-4" onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                    {/* <NavLink to={`${(user.role === "admin") ? "/admin/dashboard" : "/client"}`}>{user.username}</NavLink> */}
                    </>)
                    }
                    
                </nav>
            </div>
        </header>
    )
}


export default Header