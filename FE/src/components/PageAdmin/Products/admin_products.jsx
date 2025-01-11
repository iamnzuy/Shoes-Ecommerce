import ProductCard from "./product_card";
import { Link } from "react-router";
function ProductHeader() {
  return (
    <thead>
      <tr className="text-xs border text-center text-gray-500 uppercase border-black">
        <th className="px-4 py-3 text-gray-700 text-base">Id</th>
        <th className="px-4 py-3 text-gray-700 text-base">Image</th>
        <th className="px-4 py-3 text-gray-700 text-base">Name</th>
        <th className="px-4 py-3 text-gray-700 text-base">Price</th>
        <th className="px-4 py-3 text-gray-700 text-base">Factory</th>
        <th className="px-4 py-3 text-gray-700 text-base">Status</th>
        <th className="px-16 py-3 text-gray-700 text-base">Action</th>
      </tr>
    </thead>
  );
}

const productList = [
  {
    id: 1,
    name: "Product Name",
    price: "1,000,000 đ",
    brand: "Brand",
    // change status later
    status: "Available",
  },
];

function ProductList() {
  return (
    <>
      {productList.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          brand={product.brand}
          status={product.status}
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
        <Link to="create" className="bigBtn">
          Create new product
        </Link>
      </div>
      <table className="w-full">
        <ProductHeader />
        <ProductList />
      </table>
    </div>
  );
}

export default Products;
