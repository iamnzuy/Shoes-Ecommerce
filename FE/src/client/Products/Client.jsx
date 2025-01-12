import Header from "../header/Header.jsx";
import BreadCrumb from "../header/BreadCrumb.jsx";
import { Outlet } from "react-router";

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