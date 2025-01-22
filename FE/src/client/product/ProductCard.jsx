import { Link } from "react-router";

function ProductCard(props) {
  return (
    <Link
      to={`/products/${props.id}`}
      className={`flex flex-col items-center mx-12  ${
        props.full ? "w-full" : "w-fit"
      }  group no-underline text-gray-700`}
    >
      <img
        src={props.image}
        className="w-64 h-64 transition-all duration-500 group-hover:scale-110 rounded-md"
      ></img>
      <p className="text-xl font-bold my-4 group-hover:text-red-600 transition-colors duration-500">
        {props.name}
      </p>
      <p className="text-2xl">
        {Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(props.price)}
      </p>
    </Link>
  );
}

export default ProductCard;
