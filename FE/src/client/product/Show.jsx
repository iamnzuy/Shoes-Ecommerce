import useProductStore from "../../store/productStore";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const categories = [
  "Running shoes",
  "Basketball shoes",
  "Soccer shoes",
  "Walking shoes",
];

const brands = ["Nike", "Adidas", "Puma", "Converse"];

function Filter({
  selectedCategory,
  setSelectedCategory,
  selectedBrand,
  setSelectedBrand,
}) {
  return (
    <div className="w-1/2 fixed">
      <div className="mb-4">
        <h1 className="font-bold">Category:</h1>
        <div className="flex flex-col w-32">
          {categories.map((category, index) => {
            return (
              <button
                className={
                  selectedCategory === category
                    ? "bg-gray-300 font-semibold"
                    : ""
                }
                key={index}
                onClick={() =>
                  selectedCategory === category
                    ? setSelectedCategory("")
                    : setSelectedCategory(category)
                }
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <h1 className="font-bold">Brand:</h1>
        <div className="flex flex-col  w-32">
          {brands.map((brand, index) => {
            return (
              <button
                className={
                  selectedBrand === brand ? "bg-gray-300 font-semibold" : ""
                }
                key={index}
                onClick={() =>
                  selectedBrand === brand
                    ? setSelectedBrand("")
                    : setSelectedBrand(brand)
                }
              >
                {brand}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Show() {
  const { fetchProducts, products } = useProductStore();
  // const = useProductStore(state => state.fetchProducts());
  useEffect(
    () => () => {
      fetchProducts();
    },
    [products]
  );
  // console.log(products);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesBrand = selectedBrand ? product.brand === selectedBrand : true;
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;
    return matchesBrand && matchesCategory;
  });
  return (
    <div>
      <Filter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedBrand={selectedBrand}
        setSelectedBrand={setSelectedBrand}
      />
      <div className="flex flex-row flex-wrap gap-2 justify-between my-12 border ml-32">
        {filteredProducts.map((product, index) => (
          <ProductCard
            key={index}
            name={product.name}
            image={product.image}
            price={product.price}
            id={product._id}
          />
        ))}
      </div>
    </div>
  );
}

export default Show;
