import "./App.css";
import { createBrowserRouter, RouterProvider, Link } from "react-router";
import adminRoutes from "./components/PageAdmin/admin_routes";
import clientRoutes from "./client/client_routes";
const router = createBrowserRouter([adminRoutes, clientRoutes]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
