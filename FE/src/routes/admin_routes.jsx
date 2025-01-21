import DashBoard from "../client/PageAdmin/Dashboard";
import Order from "../client/PageAdmin/Orders/Orders";
import Products from "../client/PageAdmin/Products/Products";
import ProductCreate from "../client/PageAdmin/Products/product_create";
import ProductView from "../client/PageAdmin/Products/product_view";
import ProductUpdate from "../client/PageAdmin/Products/product_update";
import Admin from "../client/PageAdmin/admin";
import { ProtectedAdmin } from "./ProtectedRoute";

const adminRoutes = {
  path: "/admin",
  element: (
    <ProtectedAdmin>
      <Admin />
    </ProtectedAdmin>
  ),
  children: [
    { path: "dashboard", element: <DashBoard /> },
    {
      path: "products",
      element: <Products />,
    },
    { path: "products/create", element: <ProductCreate /> },
    { path: "products/view/:id", element: <ProductView /> },
    { path: "products/update/:id", element: <ProductUpdate /> },
    { path: "order", element: <Order /> },
  ],
};

export default adminRoutes;
