import { create } from "zustand";
import { notifyError, notifySuccess } from "../utils/toast";
import axiosInstance from "../utils/axios";

// store
const useProductStore = create((set) => ({
  products: [],
  isLoading: false,
  productToDelete: "",
  fetchProducts: async () => {
    try {
      set({isLoading: true})
      const response = await axiosInstance.get("/products/all")
      .catch((err) => console.log(err))
      .then((res) => set({products:res.data}));
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally{
      set({isLoading: false})
    }
  },
  setProductToDelete: async (product) => {
    set({ productToDelete: product });
  },

  deleteProduct: async (productID) => {
    try {
      set({isLoading: true})
      const response = await axiosInstance.delete(
        `/products/${productID}`
      );
      console.log(response.data);
      set({ products: response.data });
      notifySuccess("Product deleted");
    } catch (error) {
      console.error(error);
      notifyError();
    } finally {
      set({isLoading: false})
    }
  },

  createProduct: async (e, navigate) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      set({isLoading: true})
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
    } finally {
      set({isLoading: false})
    }
  },
  updateProduct: async (e, id, navigate) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      set({isLoading: true})
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
    } finally {
      set({isLoading: false})
    }
  },
}));

export default useProductStore;
