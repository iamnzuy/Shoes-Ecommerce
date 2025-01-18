import DashBoard from "../client/PageAdmin/Dashboard";
import Products from "../client/PageAdmin/Products/Products";
import ProductCreate from "../client/PageAdmin/Products/product_create";
import ProductView from "../client/PageAdmin/Products/product_view";
import ProductUpdate from "../client/PageAdmin/Products/product_update";
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
    { path: "products/update/:id", element: <ProductUpdate /> },
  ],
};

export default adminRoutes;
