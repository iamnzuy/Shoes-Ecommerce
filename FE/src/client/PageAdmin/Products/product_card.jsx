import { FaEye } from "react-icons/fa";
import { FaRegTrashCan, FaPenToSquare } from "react-icons/fa6";
import { Link } from "react-router";
import { useState } from "react";
import useProductStore from "../../../store/productStore.js";

function ProductCard(props) {
  const { setProductToDelete } = useProductStore();
  return (
    <tr>
      {/* numbering goes here */}
      <td>
        <div>{props.number}</div>
      </td>
      {/* image goes here */}
      <td>
        <img
          src={props.image}
          alt="product"
          className="w-20 h-20 mx-auto"
        ></img>
      </td>
      {/* name goes here */}
      <td className="px-4 py-3 text-sm font-medium text-gray-500">
        {props.name}
      </td>

      {/* price goes here (formatted to VND) */}
      <td className="px-4 py-3 text-sm font-medium text-gray-500">
        {Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(props.price)}
      </td>

      {/* brand goes here */}
      <td className="px-4 py-3 text-sm font-medium text-gray-500">
        {props.brand}
      </td>

      {/* status goes here */}
      <td className="px-4 py-3 text-sm font-medium text-green-800">
        <span className="fa fa-thumbs-down">In stock</span>
      </td>

      {/* action goes here & change a to Link later */}
      <td className="px-4 py-3 text-sm flex justify-center">
        <Link
          to={`view/${props.id}`}
          className="flex flex-row items-center gap-2 no-underline px-2 py-2 text-sm font-medium leading-5 text-black transition-colors duration-150 bg-green-600 border border-transparent rounded-lg active:bg-green-600 hover:bg-green-700 "
        >
          <FaEye />
          View
        </Link>
        <Link
          to={`update/${props.id}`}
          className="flex flex-row items-center gap-2 no-underline mx-2 px-2 py-2 text-sm font-medium leading-5 text-gray-600 transition-colors duration-150 bg-yellow-300 border border-transparent rounded-lg active:bg-yellow-400 hover:bg-yellow-400 "
        >
          <FaPenToSquare className="text-gray-600" />
          Update
        </Link>
        <button
          onClick={async () => {
            setProductToDelete(props);
          }}
          className="flex flex-row items-center gap-2 no-underline px-2 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-red-600 border border-transparent rounded-lg active:bg-red-600 hover:bg-red-700"
        >
          <FaRegTrashCan />
          Delete
        </button>
      </td>
    </tr>
  );
}

export default ProductCard;
