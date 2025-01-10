import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router";
import Show from './client/product/Show.jsx'
import Detail from './client/product/Detail.jsx';

createRoot(document.getElementById('root')).render(
 
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} >
      </Route>

      <Route path="products">
          <Route index element={<Show />} />
          <Route path=":pid" element={<Detail />} />
      </Route> 
      
    </Routes>
    
  </BrowserRouter>
 
)
