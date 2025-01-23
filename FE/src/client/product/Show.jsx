import { useEffect, useState, useMemo, useCallback } from "react";
import useProductStore from "../../store/productStore";
import { useSearchParams } from "react-router";
import ProductCard from "./ProductCard";
import Loader from "../../components/Loader";

function Show() {
  const { fetchProducts, products, isLoading } = useProductStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    categoryChecks: {},
    brandChecks: {},
    searchText: ""
  });

  // optimize by memorizing
  const { uniqueCategories, uniqueBrands } = useMemo(() => ({
    uniqueCategories: [...new Set(products.map(p => p.category))].sort(),
    uniqueBrands: [...new Set(products.map(p => p.brand))].sort()
  }), [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(filters.searchText.toLowerCase());
      
      const selectedCategories = Object.entries(filters.categoryChecks)
        .filter(([_, isChecked]) => isChecked)
        .map(([category]) => category);

      const selectedBrands = Object.entries(filters.brandChecks)
        .filter(([_, isChecked]) => isChecked)
        .map(([brand]) => brand);
      
      return matchesSearch && 
        (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
        (selectedBrands.length === 0 || selectedBrands.includes(product.brand));
    });
  }, [products, filters]);

  const handleSearch = useCallback((e) => {
    const text = e.target.value;
    setFilters(prev => ({ ...prev, searchText: text }));
    
    const params = new URLSearchParams(searchParams);
    if (text) params.set("search", text);
    else params.delete("search");
    setSearchParams(params);
  }, [searchParams, setSearchParams]);

  const handleFilterChange = useCallback((type, item) => {
    setFilters(prev => {
      const checks = type === 'category' ? 'categoryChecks' : 'brandChecks';
      const newChecks = {
        ...prev[checks],
        [item]: !prev[checks][item]
      };
      
      const params = new URLSearchParams();
      Object.entries(newChecks)
        .filter(([_, isChecked]) => isChecked)
        .forEach(([value]) => params.append(type, value));
      
      Object.entries(prev[type === 'category' ? 'brandChecks' : 'categoryChecks'])
        .filter(([_, isChecked]) => isChecked)
        .forEach(([value]) => params.append(type === 'category' ? 'brand' : 'category', value));
      
      if (prev.searchText) params.set("search", prev.searchText);
      setSearchParams(params);

      return { ...prev, [checks]: newChecks };
    });
  }, [setSearchParams]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (isLoading) return <Loader />;

  return (
    <div className="box-border my-2">
      <div className="flex flex-col content-center justify-center">
        <input
          className="p-2 border rounded w-full mx-8"
          placeholder="Type to search"
          type="text"
          onChange={handleSearch}
        />
        
        <div className="mx-4 mt-4 w-full">
          <h3 className="font-medium mb-2">Categories ({uniqueCategories.length})</h3>
          <div className="flex flex-wrap gap-4">
            {uniqueCategories.map((category, index, key) => (
              <div key={category} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`category-${category}`}
                  checked={filters.categoryChecks[category] || false}
                  onChange={() => handleFilterChange('category', category)}
                  className="w-4 h-4"
                />
                <label htmlFor={`category-${category}`}>{category}</label>
              </div>
            ))}
          </div>

          <h3 className="font-medium mb-2 mt-4">Brands ({uniqueBrands.length})</h3>
          <div className="flex flex-wrap gap-4">
            {uniqueBrands.map((brand) => (
              <div key={brand} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`brand-${brand}`}
                  checked={filters.brandChecks[brand] || false}
                  onChange={() => handleFilterChange('brand', brand)}
                  className="w-4 h-4"
                />
                <label htmlFor={`brand-${brand}`}>{brand}</label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 w-[90%] justify-between my-12 mx-auto">
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