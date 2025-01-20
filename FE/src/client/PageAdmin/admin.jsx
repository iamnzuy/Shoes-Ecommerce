import SideBar from "./Sidebar";
import NavBar from "./Navbar";
import { Outlet } from "react-router";

function adminPage() {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <NavBar />
      <div className="flex flex-row h-full ">
        <SideBar />
        <div className="w-full h-full shadow-inner">
          <Outlet />
        </div>
      </div>
     
    </div>
  );
}

export default adminPage;
