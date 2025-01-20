import Home from "../client/home/Home.jsx";
import Homepage from "../client/home/Homepage.jsx";
import Show from "../client/product/Show.jsx";
import ProductDetail from "../client/product/ProductDetail.jsx";
import Cart from "../client/cart/cart.jsx";
import { ProtectedRoute } from "./ProtectedRoute.jsx";

const clientRoutes = {
  path: "/",
  element: <Home />,
  children: [
    { path: "", element: <Homepage /> },
    { path: "products", element: <Show /> },
    { path: "products/:pid", element: <ProductDetail /> },
    {
      path: "cart",
      element: (
        <ProtectedRoute>
          <Cart />
        </ProtectedRoute>
      ),
    },
  ],
};

export default clientRoutes;
