import Header from "../header/Header"
import BreadCrumb from "../header/BreadCrumb"
import { Outlet } from "react-router"
function Client(){
    return (
        <>
            <Header />
            <BreadCrumb />
            <Outlet />
        </>
    )
}

export default Client;