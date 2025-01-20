import useProductStore from "../../store/productStore";
import { useEffect } from "react";
import ProductCard from "./ProductCard";

function Show() {
  const { fetchProducts, products } = useProductStore();
  useEffect(
    () => async () => {
      await fetchProducts();
    },
    []
  );
  console.log(products);
  return (
    <div className="flex flex-row flex-wrap gap-4 justify-between my-12 border">
      {products.map((product, index) => (
        <ProductCard
          key={index}
          name={product.name}
          image={product.image}
          price={product.price}
          id={product._id}
        />
      ))}
    </div>
  );
}

export default Show;
