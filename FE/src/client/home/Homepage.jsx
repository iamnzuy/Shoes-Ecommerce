import { useState, useEffect } from "react";
import useProductStore from "../../store/productStore.js";
import ProductCard from "../product/ProductCard.jsx";
import Slideshow from "./Slide/Slideshow";
import ProductSlideshow from "./Slide/ProductSlideshow.jsx";
import { Link } from "react-router";
import Loader from "../../components/Loader.jsx";

function BestSeller(props) {
  const products = props.products;
  return (
    // lấy 3 cái đầu làm best seller
    <div className="flex ">
      {products.slice(0, 3).map((product, index) => (
        <ProductCard
          key={index}
          name={product.name}
          price={product.price}
          image={product.image}
          id={product._id}
        />
      ))}
    </div>
  );
}

function NikeShoes(props) {
  const nikeProducts = props.products.filter(
    (product) => product.brand === "Nike"
  );
  return (
    <div className="flex flex-col items-center justify-evenly w-full mx-auto my-36">
      <h1 className="text-4xl text-blue-500 font-bold">Nike shoes</h1>
      <ProductSlideshow products={nikeProducts} />
    </div>
  );
}

function AdidasShoes(props) {
  const adidasProducts = props.products.filter(
    (product) => product.brand === "Adidas"
  );
  return (
    <div className="flex flex-col items-center justify-evenly w-full mx-auto my-36">
      <h1 className="text-4xl text-red-500 font-bold">Adidas shoes</h1>
      <ProductSlideshow products={adidasProducts} />
    </div>
  );
}

function PumaShoes(props) {
  
  const pumaProducts = props.products.filter(
    (product) => product.brand === "Puma"
  );
  return (
    <div className="flex flex-col items-center justify-evenly w-full mx-auto my-36">
      <h1 className="text-4xl text-blue-500 font-bold">Puma shoes</h1>
      <ProductSlideshow products={pumaProducts} />
    </div>
  );
}

function ConverseShoes(props) {
  const converseProducts = props.products.filter(
    (product) => product.brand === "Converse"
  );
  return (
    <div className="flex flex-col items-center justify-evenly w-full mx-auto my-36">
      <h1 className="text-4xl text-red-500 font-bold">Converse shoes</h1>
      <ProductSlideshow products={converseProducts} />
    </div>
  );
}

function Homepage() {
  const { fetchProducts, products ,isLoading} = useProductStore();
  useEffect(
    () => async () => {
      await fetchProducts();
    },
    []
  );
  if (isLoading) return <Loader/>
  return (
    <div>
      <div className="border w-full h-full py-24 pb-32 bg-gray-200">
        <div className="flex flex-row items-center w-fit mx-auto gap-36 h-96">
          <div>
            <h1 className="text-6xl font-bold">
              <span className="text-red-600">Shooting</span>{" "}
              <span className="text-blue-600">Shoes</span>
            </h1>
            <p className="text-5xl ">Blast off with every step</p>
          </div>
          <Slideshow />
        </div>
      </div>
      <div className="flex flex-col items-center ">
        <div className="flex items-center justify-evenly w-full mx-auto gap-96 my-12">
          <h1 className="text-4xl text-red-500 font-bold">Best seller</h1>
          {/* link to show products later */}
          <Link to="/products">
            <button className="hover:text-blue-600 transition-color duration-300">
              All products
            </button>
          </Link>
        </div>
        <BestSeller products={products} />
      </div>
      <NikeShoes products={products} />
      <AdidasShoes products={products} />
      <PumaShoes products={products} />
      <ConverseShoes products={products} />
    </div>
  );
}

export default Homepage;
