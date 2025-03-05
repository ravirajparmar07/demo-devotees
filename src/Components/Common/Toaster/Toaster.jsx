import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      closeButton={true}
    />
  );
};

export const showToast = (type, message) => {
  switch (type) {
    case "success":
      toast.success(message, { closeButton: true });
      break;
    case "error":
      toast.error(message, { closeButton: true });
      break;
    case "info":
      toast.info(message, { closeButton: true });
      break;
    case "warning":
      toast.warning(message, { closeButton: true });
      break;
    default:
      toast(message, { closeButton: true });
  }
};

export default Toast;
