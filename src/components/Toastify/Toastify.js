import { toast } from "react-toastify";

const successToast = (message) => {
  toast.success(message, {
    draggable: true,
    pauseOnFocusLoss: false,
    hideProgressBar: true,
    autoClose: 4000,
    position: toast.POSITION.TOP_RIGHT,
  });
};

const errorToast = (message) => {
  toast.error(message, {
    draggable: true,
    pauseOnFocusLoss: false,
    hideProgressBar: true,
    autoClose: 6000,
    position: toast.POSITION.TOP_RIGHT,
  });
};

export { successToast, errorToast };
