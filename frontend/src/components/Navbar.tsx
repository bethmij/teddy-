
import { useEffect, useState } from "react";
import { assets} from "../assets/assets";
import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from "../context/AppContext";


const Navbar = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const { getCartCount, getUser, getRole, logOut } = useAppContext();
  const [path, setPath] = useState("")
  
  useEffect(() => {

  if (location.pathname == "/shop" || matchPath("/shop/:id", location.pathname)) {
      setPath("shop");
      return;
   }else if(location.pathname == "/about") {
     setPath("about");
     return;
   }
   else if(location.pathname == "/contact") {
     setPath("contact");
     return;
   }
   else if(location.pathname == "/account" || location.pathname == "/auth") {
     setPath("account");
     return;
   }
   else if(location.pathname == "/cart") {
    setPath("cart");
    return;
  }
  else if(location.pathname == "/") {
    setPath("home");
    return;
  }
  

  }, [location]);


  const checkUserLogin = ()=>{
    const user = getUser();
    const role = getRole();
  
    if (!user || !role) {
      navigate("/auth");
      return;
    }
  
    if (role === "USER") {
      navigate("/account");
      return;
    }
  
    if (role === "ADMIN") {
      navigate("/add-product");
      return;
    }
    
  }

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-[#F5ECE6] text-gray-700 bg-[#F8F2EE]">
      <img
        className="cursor-pointer w-28 md:w-32"
        onClick={() => {}}
        src={assets.logo}
        alt="logo"
      />

      <div className="flex flex-row gap-12 lg:gap-24">
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">

        <img className="w-4 h-4 mt-0.5 lg:mt-1" src={assets.search_icon} alt="search icon" />
        <Link to="/" className="hover:text-gray-900 transition">
          Home
          {path == "home" && <div className="w-full h-0.5 bg-[#E8C2A5] rounded-full"></div>}
        </Link>
        <Link to="/shop" className="hover:text-gray-900 transition">
          Shop
          {path == "shop" && <div className="w-full h-0.5 bg-[#E8C2A5] rounded-full"></div>}
        </Link>
        <Link to="/about" className="hover:text-gray-900 transition">
          About Us
          {path == "about" && <div className="w-full h-0.5 bg-[#E8C2A5] rounded-full"></div>}
        </Link>
        <Link to="/contact" className="hover:text-gray-900 transition">
          Contact
          {path == "contact" && <div className="w-full h-0.5 bg-[#E8C2A5] rounded-full"></div>}
        </Link>

      </div>

      <ul className="hidden md:flex items-center gap-4 ">

        <div className="flex flex-col justify-center items-center w-4 h-full relative">
          {getCartCount() > 0 && <div className="w-2 h-2 bg-[#E8C2A5] rounded-full absolute -top-1.5 ml-0.5"></div>}
          {getRole() == "USER" && <img className="w-4 h-4" src={assets.cart_icon} alt="search icon" onClick={() => { if( getRole() == "USER") {navigate("/cart")}}} />}
          {path == "cart" && <div className="w-full h-0.5 bg-[#E8C2A5] rounded-full absolute -bottom-0.5 ml-0.5"></div>}
        </div>
        
        <img src={assets.user_icon} alt="user icon" />
        <div className="flex flex-col justify-center items-center">
        <button onClick={() => {checkUserLogin()}} className="flex items-center gap-2 hover:text-gray-900 transition">
          Account
        </button>
        {path == "account" && <div className="w-full h-0.5 bg-[#E8C2A5] rounded-full"></div>}
        </div>

        {getUser() && <button className='bg-[#e8c2a5c7] rounded-full text-[#895025] hover:bg-[#E8C2A5] px-5 py-2 sm:px-5 sm:py-1.5 text-xs sm:text-sm font-medium' 
        onClick={()=>{logOut(); navigate("/auth"); return;}}>Logout</button>}
      </ul>
      
      </div>
    </nav>
  );
};

export default Navbar;