import { create } from "zustand";
import { notifyError, notifySuccess } from "../utils/toast";
import axiosInstance from "../utils/axios";

// store
const useProductStore = create((set) => ({
  products: [],
  productToDelete: "",
  fetchProducts: async () => {
    try {
      const response = await axiosInstance.get("/products/all");
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
      const response = await axiosInstance.delete(
        `/products/${productID}`
      );
      console.log(response.data);
      set({ products: response.data });
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
      const response = await axiosInstance.post(
        "/products/create",
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
      notifyError(error.response?.data?.message);
    }
  },
  updateProduct: async (e, id, navigate) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const response = await axiosInstance.put(
        "/products/update/" + id,
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
