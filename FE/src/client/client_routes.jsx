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

// createRoot(document.getElementById('root')).render(
 
//   <BrowserRouter>
//     <Routes>
//       <Route path="/" element={<App />} >
//       </Route>

//       <Route path="products">
//           <Route index element={<Show />} />
//           <Route path=":pid" element={<Detail />} />
//       </Route> 
      
//     </Routes>
    
//   </BrowserRouter>
 
// )