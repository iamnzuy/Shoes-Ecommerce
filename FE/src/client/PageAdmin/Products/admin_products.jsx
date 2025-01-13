import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./product_card";
import { Link } from "react-router";
function ProductHeader() {
  return (
    <thead>
      <tr className="text-xs border text-center text-gray-500 uppercase border-gray-100">
        <th className="px-4 py-3 text-gray-700 text-base">Id</th>
        <th className="px-4 py-3 text-gray-700 text-base">Image</th>
        <th className="px-4 py-3 text-gray-700 text-base">Name</th>
        <th className="px-4 py-3 text-gray-700 text-base">Price</th>
        <th className="px-4 py-3 text-gray-700 text-base">Branch</th>
        <th className="px-4 py-3 text-gray-700 text-base">Status</th>
        <th className="px-16 py-3 text-gray-700 text-base">Action</th>
      </tr>
    </thead>
  );
}

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("http://localhost:5000/products/all");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);
  return (
    <>
      {products.map((product, index) => (
        <ProductCard
          key={index + 1}
          id={index + 1}
          name={product.name}
          price={product.price}
          brand={product.brand}
          status={product.status}
          image={product.image}
        />
      ))}
    </>
  );
}

function Products() {
  return (
    <div className="w-full px-16 ">
      <div className="flex justify-between items-center">
        <h1 className="my-6 text-2xl font-semibold text-gray-700">Products</h1>
        <Link to="create" className="bigBtn no-underline text-white">
          Create new product
        </Link>
      </div>
      <table className="w-full">
        <ProductHeader />
        <tbody>
          <ProductList />
        </tbody>
      </table>
    </div>
  );
}

export default Products;
