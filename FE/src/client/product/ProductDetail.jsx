import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Loader from "../../components/Loader";
import cartStore from "../../store/cartStore";
import useAuthStore from "../../store/authStore";
import useFetch from "../../hooks/useFetch";
import { notifyError, notifySuccess } from "../../utils/toast";

function ProductDetail() {
  const { pid } = useParams();
  const [quantity, setQuantity] = useState(1);
  let {data: product,isLoading}=useFetch(`/products/single/${pid}`)
  const user = useAuthStore((state) => state.user);
  const addToCart = cartStore((state) => state.addToCart);
  const navigate = useNavigate();
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  const handleQuantityChange = (e) => {
    setQuantity(Math.max(Number(e.target.value), 1));
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!user) {
      notifyError("You have to login to add item to cart!");
       navigate("/login");
      return
    }
    const item = {
      ...product,
      quantity: quantity,
    };

    addToCart(item);
   notifySuccess("Add to cart successful");
  };

  if (isLoading) return <Loader />;
  if (!product) return <div>Product not found</div>;

  return (
    <>
      <div className="mx-12 bg-slate-100 border rounded-xl flex flex-col my-2">
        <div className="flex flex-row justify-center gap-4 my-4">
          <div className="basis-5/12">
            <div className="border rounded-2xl w-fit h-fit p-4 mx-auto">
              <a href="#">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-96 h-96"
                />
              </a>
            </div>
          </div>

          <div className="basis-5/12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 my-4 text-wrap break-all">
                {product.name}
              </h2>
            </div>
            <div>
              <h3 className="text-sm text-gray-900">Brand: {product.brand}</h3>
            </div>
            <div>
              <h3 className="text-sm text-gray-900">
                Category: {product.category}
              </h3>
            </div>
            <div>
              <h3 className="mb-2 text-3xl font-bold text-gray-900 my-4 text-wrap">
                {formatPrice(product.price * quantity)} <span>&#8363;</span>
              </h3>
            </div>
            <form>
              <div className="my-4 row-span-1 col-span-6">
                <button
                  type="button"
                  onClick={() =>
                    handleQuantityChange({ target: { value: quantity + 1 } })
                  }
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <i className="fa fa-plus"></i>
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="flex-shrink-0 text-gray-900 border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"
                />
                <button
                  type="button"
                  onClick={() =>
                    handleQuantityChange({ target: { value: quantity - 1 } })
                  }
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <i className="fa fa-minus"></i>
                </button>
             
              </div>
              <button
                type="submit"
                className="row-span-1 my-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleAddToCart}
              >
                <i className="fa fa-cart-plus"></i>&nbsp; Add to cart
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 mx-4">
          <div className="border-b-2 m-0 p-0">
            <span className="mx-2 text-2xl font-bold text-gray-900 text-wrap break-all pb-4 px-2">
              Description
            </span>
          </div>
          <div className="row-span-3 my-2">
            <p className="mb-3 text-black-500 text-2x text-wrap break-all">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
