import { create } from "zustand";
import axios from "axios";
const useProductStore = create((set) => ({
  products: [],

  fetchProducts: async () => {
    try {
      const response = await axios.get("http://localhost:5000/products/all");
      set({ products: response.data });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },

  productToDelete: "",
  setProductToDelete: async (product) => {
    set({ productToDelete: product });
  },

  deleteProduct: async (productID) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/products/${productID}`
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useProductStore;
