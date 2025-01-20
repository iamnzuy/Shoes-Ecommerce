import Client from '../client/product/Client.jsx';
import Show from '../client/product/Show.jsx'
import ProductDetail from '../client/product/ProductDetail.jsx';
import Cart from '../client/cart/cart.jsx';
import { ProtectedRoute } from './ProtectedRoute.jsx';


const clientRoutes = {
    path: "/client",
    element: <Client />,
    children: [
      { path: "products", element: <Show/> },
      { path: "products/:pid", element: <ProductDetail /> },
      { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute>},
    ],
  };

  
export default clientRoutes;