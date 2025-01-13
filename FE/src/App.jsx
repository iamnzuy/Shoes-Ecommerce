import { createBrowserRouter, RouterProvider, Link } from "react-router";
import adminRoutes from "./routes/admin_routes";
import clientRoutes from "./routes/client_routes";
import { loginRoute, registerRoute } from "./routes/auth_routes";

const router = createBrowserRouter([adminRoutes, clientRoutes,loginRoute,registerRoute]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
