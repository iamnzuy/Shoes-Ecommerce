import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";;

createRoot(document.getElementById("root")).render(
  <>
   <ToastContainer/>
    <App />
  </>
);
