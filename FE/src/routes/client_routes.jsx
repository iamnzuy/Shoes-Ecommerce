import Client from '../client/product/Client.jsx';
import Show from '../client/product/Show.jsx'
import ProductDetail from '../client/product/ProductDetail.jsx';


const clientRoutes = {
    path: "/client",
    element: <Client />,
    children: [
      { path: "products", element: <Show/> },
      { path: "products/:pid", element: <ProductDetail /> },
    ],
  };

  
export default clientRoutes;