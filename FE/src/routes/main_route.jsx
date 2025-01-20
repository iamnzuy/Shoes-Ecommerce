import Cart from "../client/cart/cart.jsx";
import LoginPage from "../client/Login/Login.jsx";
import RegisterPage from "../client/Register/Register.jsx";
import { RedirectUser } from "./ProtectedRoute.jsx";

export const loginRoute = {
  path: "/login",
  element: <RedirectUser><LoginPage /></RedirectUser>,
};
export const registerRoute = {
  path: "/register",
  element: <RedirectUser><RegisterPage/></RedirectUser>,
};
