import { NavLink, Link } from "react-router";
import useAuthStore from "../../store/authStore";

// import BreadCrumb from "./BreadCrumb"

// for testing purpose

function Header() {
  const user = useAuthStore();

  return (
    <header className="sticky top-0 bg-white block z-50">
      <div className="flex flex-row justify-between px-32 items-center py-2 border-b-2 ">
        <div>
          <Link to={'/'}><img src={`/logo.png`} alt="logo" className="w-36 h-14"></img></Link> 
        </div>
        <nav className="flex flex-row">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "linkActive" : "linkBase")}
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) => (isActive ? "linkActive" : "linkBase")}
          >
            Products
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "linkActive" : "linkBase")}
          >
            Contacts
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? "linkActive" : "linkBase")}
          >
            Cart
          </NavLink>
          {user == null ? (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "linkActive" : "linkBase"
              }
            >
              Login
            </NavLink>
          ) : (
            ""
          )}
          <p>"User image"</p>
        </nav>
      </div>
    </header>
  );
}
export default Header;
