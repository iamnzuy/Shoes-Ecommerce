import DashBoard from "../client/PageAdmin/admin_dashboard";
import Products from "../client/PageAdmin/Products/admin_products";
import ProductCreate from "../client/PageAdmin/Products/product_create";
import ProductView from "../client/PageAdmin/Products/product_view";
import Admin from "../client/PageAdmin/admin";

const adminRoutes = {
  path: "/admin",
  element: <Admin />,
  children: [
    { path: "dashboard", element: <DashBoard /> },
    {
      path: "products",
      element: <Products />,
    },
    { path: "products/create", element: <ProductCreate /> },
    { path: "products/view/:id", element: <ProductView /> },
  ],
};

export default adminRoutes;
