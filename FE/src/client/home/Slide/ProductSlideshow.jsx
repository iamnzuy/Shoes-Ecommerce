import { useState, useEffect } from "react";
import ProductCard from "../../product/ProductCard";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";

function ProductSlideshow(props) {
  const swiper = useSwiper();
  const [swiperInstance, setSwiperInstance] = useState(null);
  return (
    <div className="relative w-full max-w-8xl mx-auto overflow-hidden my-12">
      <Swiper
        onSwiper={(swiper) => setSwiperInstance(swiper)}
        slidesPerView={3}
      >
        {props.products.map((product, index) => (
          <SwiperSlide key={index}>
            <ProductCard
              image={product.image}
              price={product.price}
              name={product.name}
              id={product._id}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        onClick={() => swiperInstance?.slidePrev()}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
      >
        &lt;
      </button>
      {/* Right Button */}
      <button
        onClick={() => swiperInstance?.slideNext()}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
      >
        &gt;
      </button>
    </div>
  );
}

export default ProductSlideshow;
