import Client from '../client/product/Client.jsx';
import Show from '../client/product/Show.jsx'
import ProductDetail from '../client/product/ProductDetail.jsx';
import Cart from '../client/cart/cart.jsx';


const clientRoutes = {
    path: "/client",
    element: <Client />,
    children: [
      { path: "products", element: <Show/> },
      { path: "products/:pid", element: <ProductDetail /> },
      { path: "cart", element: <Cart />},
    ],
  };

  
export default clientRoutes;