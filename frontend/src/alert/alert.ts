import { Bounce, toast } from "react-toastify";


const showToast = (message:any , type: "success" | "error") => {

    const defaultOptions:any = {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      style: {
        fontSize: '18px', 
      }
    };
  
   { type == "success" &&  toast.success(message, defaultOptions);}
   { type == "error" && toast.error(message, defaultOptions);}
   
  };

  export default showToast;