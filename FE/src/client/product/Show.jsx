import useProductStore from "../../store/productStore";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useSearchParams } from "react-router";

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
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categoryCheckedState, setCategoryCheckedState] = useState({});
  const [brandCheckedState, setBrandCheckedState] = useState({});
  const [searchItem, setSearchItem] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

 
  useEffect(() => {
    const initializeFilters = async () => {
      await fetchProducts();
      
      const diffCategories = [...new Set(products.map(p => p.category))].sort();
      const diffBrands = [...new Set(products.map(p => p.brand))].sort();
      
      setCategories(diffCategories);
      setBrands(diffBrands);
      
      const initCategoryState = Object.fromEntries(
        diffCategories.map(category => [category, false])
      );
      const initBrandState = Object.fromEntries(
        diffBrands.map(brand => [brand, false])
      );

      setCategoryCheckedState(initCategoryState);
      setBrandCheckedState(initBrandState);

      const categoryParams = searchParams.getAll("category");
      const brandParams = searchParams.getAll("brand");

      if (categoryParams.length > 0 || brandParams.length > 0) {
        const updatedCategoryState = { ...initCategoryState };
        const updatedBrandState = { ...initBrandState };

        categoryParams.forEach(category => {
          if (diffCategories.includes(category)) {
            updatedCategoryState[category] = true;
          }
        });

        brandParams.forEach(brand => {
          if (diffBrands.includes(brand)) {
            updatedBrandState[brand] = true;
          }
        });

        setCategoryCheckedState(updatedCategoryState);
        setBrandCheckedState(updatedBrandState);
      }
    };

    initializeFilters();
  }, [products]);
  let timer;
  const handleInputChange = (e) => {
    let text=e.target.value
    clearTimeout(timer)
    timer=setTimeout(()=>{
      setSearchItem(text);
    },500)
  };

  const updateSearchParams = (newCategoryState, newBrandState) => {
    const params = new URLSearchParams();
    
    Object.entries(newCategoryState).forEach(([category, isChecked]) => {
      if (isChecked) {
        params.append("category", category);
      }
    });

    Object.entries(newBrandState).forEach(([brand, isChecked]) => {
      if (isChecked) {
        params.append("brand", brand);
      }
    });

    if (searchItem) {
      params.set("search", searchItem);
    }

    setSearchParams(params, {
      preventScrollReset: true,
    });
  };

  const handleCategoryChange = (category) => {
    const updatedState = {
      ...categoryCheckedState,
      [category]: !categoryCheckedState[category]
    };
    setCategoryCheckedState(updatedState);
    updateSearchParams(updatedState, brandCheckedState);
  };

  const handleBrandChange = (brand) => {
    const updatedState = {
      ...brandCheckedState,
      [brand]: !brandCheckedState[brand]
    };
    setBrandCheckedState(updatedState);
    updateSearchParams(categoryCheckedState, updatedState);
  };

 
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchItem.toLowerCase());
    
    const selectedCategories = Object.entries(categoryCheckedState)
      .filter(([_, isChecked]) => isChecked)
      .map(([category]) => category);

    const selectedBrands = Object.entries(brandCheckedState)
      .filter(([_, isChecked]) => isChecked)
      .map(([brand]) => brand);
    
    const matchesCategory = 
      selectedCategories.length === 0 || 
      selectedCategories.includes(product.category);
    
    const matchesBrand = 
      selectedBrands.length === 0 || 
      selectedBrands.includes(product.brand);

    return matchesSearch && matchesCategory && matchesBrand;
  });

  return (
    <div className="box-border">
      <div className="flex flex-col content-center justify-center">
        <div className="mx-8">
          <input
            className="p-2 border rounded w-full"
            placeholder="Type to search"
            type="text"
            onChange={handleInputChange}
            // value={searchItem}
          />
        </div>
        
        <div className="mx-4 mt-4 w-full">
          <h3 className="font-medium mb-2">Categories ({categories.length})</h3>
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <div key={category} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`category-${category}`}
                  checked={categoryCheckedState[category] || false}
                  onChange={() => handleCategoryChange(category)}
                  className="w-4 h-4"
                />
                <label htmlFor={`category-${category}`}>{category}</label>
              </div>
            ))}
          </div>

          <h3 className="font-medium mb-2 mt-4">Brands ({brands.length})</h3>
          <div className="flex flex-wrap gap-4">
            {brands.map((brand) => (
              <div key={brand} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`brand-${brand}`}
                  checked={brandCheckedState[brand] || false}
                  onChange={() => handleBrandChange(brand)}
                  className="w-4 h-4"
                />
                <label htmlFor={`brand-${brand}`}>{brand}</label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-row flex-wrap gap-4 justify-between my-12">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product._id}
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