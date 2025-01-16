import { createBrowserRouter, RouterProvider} from "react-router";
import adminRoutes from "./routes/admin_routes";
import clientRoutes from "./routes/client_routes";
import { loginRoute, registerRoute } from "./routes/main_route";
import { cartRoute } from "./routes/main_route";

const router = createBrowserRouter([adminRoutes, clientRoutes,loginRoute,registerRoute,cartRoute]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
