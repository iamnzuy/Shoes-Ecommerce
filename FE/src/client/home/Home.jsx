import { Outlet } from "react-router";
import { useEffect } from "react";
import Header from "../header/Header";
import useProductStore from "../../store/productStore";

function Home() {
  const {fetchProducts} = useProductStore();
  useEffect(() => async () => {
    await fetchProducts();
  });

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default Home;
