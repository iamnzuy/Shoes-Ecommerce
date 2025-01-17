import { useState, useEffect } from "react";
import ProductCard from "./product_card";
import { Link } from "react-router";
import useProductStore from "../../../store/productStore.js";
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

function DeleteConfirmation() {
  const { productToDelete, setProductToDelete, deleteProduct } =
    useProductStore();
  return (
    <div className="w-full  border border-black shadow-inner  my-48">
      <div className="text-center  p-2 text-4xl bold">
        Are you sure you want to delete "{productToDelete.name}"?
      </div>
      <div className="flex justify-evenly  p-2">
        <button
          onClick={() => {
            deleteProduct(productToDelete.id);
            setProductToDelete("");
          }}
          className="px-4 py-2 text-sm font-medium leading-5 text-black transition-colors duration-150 bg-green-600 border border-transparent rounded-lg active:bg-green-600 hover:bg-green-700"
        >
          Yes
        </button>
        <button
          onClick={() => {
            setProductToDelete("");
          }}
          className="px-4 py-2 text-sm font-medium leading-5 text-black transition-colors duration-150 bg-red-600 border border-transparent rounded-lg active:bg-red-600 hover:bg-red-700"
        >
          No
        </button>
      </div>
    </div>
  );
}
function ProductList() {
  const { products, setProductToDelete, deleteProduct, fetchProducts } =
    useProductStore();
  useEffect(
    () => async () => {
      await fetchProducts();
    },
    []
  );
  return (
    <>
      {products.map((product, index) => (
        <ProductCard
          key={index + 1}
          number={index + 1}
          id={product._id}
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
  const { productToDelete, deleteProduct } = useProductStore();
  const { isDelete, setIsDelete } = useState(true);
  return (
    <div className="w-full px-16 ">
      {productToDelete != "" ? (
        <DeleteConfirmation productToDelete={productToDelete} />
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="my-6 text-2xl font-semibold text-gray-700">
              Products
            </h1>
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
        </>
      )}
    </div>
  );
}

export default Products;
