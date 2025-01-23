import Home from "../client/home/Home.jsx";
import Homepage from "../client/home/Homepage.jsx";
import Show from "../client/product/Show.jsx";
import ProductDetail from "../client/product/ProductDetail.jsx";
import Contact from "../client/contact/Contact.jsx";
import Cart from "../client/cart/cart.jsx";
import NotFound from "../components/404_notfound/404_notfound.jsx";
import Order from "../client/order/order.jsx";
import { ProtectedRoute } from "./ProtectedRoute.jsx";

const clientRoutes = {
  path: "/",
  element: <Home />,
  children: [
    { path: "", element: <Homepage /> },
    { path: "products", element: <Show /> },
    { path: "products/:pid", element: <ProductDetail /> },
    { path: "contact", element: <Contact /> },
    {
      path: "cart",
      element: <ProtectedRoute><Cart /></ProtectedRoute>,
    },
    {
      path: "order",
      element: <ProtectedRoute><Order /></ProtectedRoute>,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
};

export default clientRoutes;
