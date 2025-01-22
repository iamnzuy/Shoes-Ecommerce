import SideBar from "./Sidebar";
import NavBar from "./Navbar";
import { Outlet } from "react-router";

function adminPage() {
  return (
    <div className="flex flex-col bg-gray-50">
      <NavBar />
      <div className="flex flex-row items-start h-[calc(100vh-56px)]">
        <SideBar />
        <div className="w-full h-full hide-scrollbar overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default adminPage;
