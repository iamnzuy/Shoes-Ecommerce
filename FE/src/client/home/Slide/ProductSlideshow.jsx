import { useState, useEffect } from "react";
import ProductCard from "../../product/ProductCard";

function ProductSlideshow(props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the next image
  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === Math.ceil(props.products.length / 3) - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.ceil(props.products.length / 3) - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 4000);
    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div className="relative w-full max-w-6xl mx-auto overflow-hidden my-12">
      <div
        className="flex transition-transform duration-500"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {props.products.map((product, index) => (
          <div key={index}>
            <ProductCard
              name={product.name}
              price={product.price}
              image={product.image}
              id={product._id}
              full="1"
            />
          </div>
        ))}
      </div>
      {/* Left Button */}
      <button
        onClick={prevImage}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
      >
        &lt;
      </button>
      {/* Right Button */}
      <button
        onClick={nextImage}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
      >
        &gt;
      </button>
    </div>
  );
}

export default ProductSlideshow;
