import { Navigate, useNavigate } from "react-router";
import { useState, React, useEffect } from "react";
import { useParams } from "react-router";
import axiosInstance from "../../../utils/axios";
function ProductView() {
  const { id } = useParams();
  const [Product, setProduct] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axiosInstance.get(
          `/single/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProduct();
  }, []);

  return (
    <div className="px-16 py-12">
      <h2>Product details</h2>
      <div className="mx-12 py-8  px-2 flex gap-10">
        <img className="w-96 h-96" src={Product.image}></img>
        <div className="w-3/4 h-96 font-normal">
          <h2>{Product.name}</h2>
          <p>
            <span className="font-bold">Brand:</span> {Product.brand}
          </p>
          <p>
            <span className="font-bold">Category:</span> {Product.category}
          </p>
          <p>
            <span className="font-bold"> Price:</span>{" "}
            {Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(Product.price)}
          </p>
          <div className="my-4">
            <h3>Description</h3>
            <div className="w-full">{Product.description}</div>
          </div>
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="no-underline rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-blue-500  flex gap-2 items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
            >
              <path d="m11.5,3c1.381,0,2.5,1.119,2.5,2.5s-1.119,2.5-2.5,2.5-2.5-1.119-2.5-2.5,1.119-2.5,2.5-2.5Zm5.304,11.106l-1.433-3.106h1.349c.389,0,.745.228.908.58l1.08,2.339c.232.503.828.721,1.327.489.501-.231.72-.826.488-1.327l-1.08-2.34c-.489-1.058-1.558-1.741-2.724-1.741,0,0-3.006-.01-3.068,0-.76.071-1.472.444-1.98,1.023-.044.05-1.441,2.474-1.441,2.474-.178.311-.51.503-.868.503h-2.364c-.552,0-1,.447-1,1s.448,1,1,1h2.364c1.072,0,2.069-.577,2.603-1.508l.222-.387,1.664,3.609-1.728,1.411c-.7.572-1.102,1.42-1.102,2.324v2.551c0,.553.448,1,1,1s1-.447,1-1v-2.551c0-.302.134-.585.367-.775l2.315-1.89c1.191-.79,1.661-2.31,1.099-3.678Zm4.196,4.894h-2.339c-.209,0-.41-.064-.581-.186-.45-.32-1.074-.215-1.395.234-.32.45-.215,1.074.235,1.395.511.364,1.113.557,1.74.557h2.339c.552,0,1-.447,1-1s-.448-1-1-1ZM15,2c1.654,0,3,1.346,3,3v1c0,.553.448,1,1,1s1-.447,1-1v-1c0-2.757-2.243-5-5-5H6.002C3.246,0,1.002,2.242,1.002,4.999l-.002,18.001c0,.552.448,1,1,1s1-.447,1-1l.002-18.001c0-1.653,1.346-2.999,3-2.999h8.998Z" />
            </svg>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductView;
