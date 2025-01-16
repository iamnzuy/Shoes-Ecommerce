import Cart from "../client/cart/cart.jsx";
import LoginPage from "../client/Login/Login.jsx";
import RegisterPage from "../client/Register/Register.jsx";

export const loginRoute = {
  path: "/login",
  element: <LoginPage />,
};
export const registerRoute = {
  path: "/register",
  element: <RegisterPage />,
};
export const cartRoute = {
  path: "/cart",
  element: <Cart/>,
};

