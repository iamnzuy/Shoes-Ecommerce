import "./App.css";
import { createBrowserRouter, RouterProvider, Link } from "react-router";
import adminRoutes from "./components/PageAdmin/admin_routes";
const router = createBrowserRouter([adminRoutes]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
