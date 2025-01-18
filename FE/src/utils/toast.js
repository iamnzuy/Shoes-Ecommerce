import { toast } from "react-toastify";
// toast notify
export const notifySuccess = (message) => {
    toast.success(message || "successfully", {
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
  
 export const notifyError = (message) => {
    toast.error(message || "Something went wrong", {
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