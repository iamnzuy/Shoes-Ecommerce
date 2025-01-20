import { create } from "zustand";
import axios from "axios";
import { notifyError, notifySuccess } from "../utils/toast";

// store
const useProductStore = create((set) => ({
  products: [],
  productToDelete: "",
  fetchProducts: async () => {
    try {
      const response = await axios.get("http://localhost:5000/products/all");
      set({ products: response.data });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },
  setProductToDelete: async (product) => {
    set({ productToDelete: product });
  },

  deleteProduct: async (productID) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/products/${productID}`
      );
      notifySuccess("Product deleted");
    } catch (error) {
      console.error(error);
      notifyError();
    }
  },

  createProduct: async (e, navigate) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const response = await axios.post(
        "http://localhost:5000/products/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      notifySuccess("Product created successfully");
      navigate("/admin/products");
    } catch (error) {
      console.error(error);
      notifyError();
    }
  },
  updateProduct: async (e, id, navigate) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const response = await axios.put(
        "http://localhost:5000/products/update/" + id,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      set({ products: response.data });
      notifySuccess("Product updated successfully");
      navigate("/admin/products");
    } catch (error) {
      console.error(error);
      notifyError();
    }
  },
}));

export default useProductStore;
