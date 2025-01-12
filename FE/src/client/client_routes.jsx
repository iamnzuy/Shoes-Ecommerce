import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";
import Client from './product/Client.jsx';
import Show from './product/Show.jsx'
import ProductDetail from './product/ProductDetail.jsx';


const clientRoutes = {
    path: "/client",
    element: <Client />,
    children: [
      { path: "products", element: <Show/> },
      { path: "products/:pid", element: <ProductDetail /> },
    ],
  };

export default clientRoutes;