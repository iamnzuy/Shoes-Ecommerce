import { createBrowserRouter, Navigate, RouterProvider, useNavigate} from "react-router";
import adminRoutes from "./routes/admin_routes";
import clientRoutes from "./routes/client_routes";
import { loginRoute, registerRoute } from "./routes/main_route";
import { useEffect } from "react";
import useAuthStore from "./store/authStore";
import Loader from "./components/Loader";

const router = createBrowserRouter([adminRoutes, clientRoutes,loginRoute,registerRoute]);

function App() {
  let {checkAuth,ischecking}=useAuthStore()
  useEffect(()=>{
     checkAuth();
  },[])
  return <>
      {ischecking ? <Loader/> : <RouterProvider router={router} />}
    
  </>;
}

export default App;
