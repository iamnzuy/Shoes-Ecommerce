import { create } from "zustand";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
// toast notify
const notifySuccess = () => {
  toast.success("Successfully!", {
    position: "top-right",
    autoClose: 3500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

const notifyError = () => {
  toast.error("Error", {
    position: "top-right",
    autoClose: 3500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

// store
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
      notifySuccess();
    } catch (error) {
      console.error(error);
      notifyError();
    }
  },

  createProduct: async (e) => {
    e.preventDefault();
    const form = document.getElementById("productForm");
    const formData = new FormData(form);
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/products/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file uploads
          },
        }
      );
      console.log(response.data);
      e.target.reset();
      notifySuccess();
    } catch (error) {
      console.error(error);
      notifyError();
    }
  },
}));

export default useProductStore;
