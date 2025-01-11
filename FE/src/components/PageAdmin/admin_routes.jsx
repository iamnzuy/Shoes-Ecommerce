import DashBoard from "./admin_dashboard";
import Products from "./Products/admin_products";
import ProductCreate from "./Products/product_create";
import Admin from "./admin";

const adminRoutes = {
  path: "/admin",
  element: <Admin />,
  children: [
    { path: "dashboard", element: <DashBoard /> },
    { path: "products", element: <Products /> },
    { path: "products/create", element: <ProductCreate /> },
  ],
};

export default adminRoutes;
