
import { useState } from "react";
import { assets} from "../assets/assets";
import { Link } from 'react-router-dom';


const Navbar = () => {

  const [isSeller, setIsSeller] = useState(false)

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">
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
        </Link>
        <Link to="/all-products" className="hover:text-gray-900 transition">
          Shop
        </Link>
        <Link to="/" className="hover:text-gray-900 transition">
          About Us
        </Link>
        <Link to="/" className="hover:text-gray-900 transition">
          Contact
        </Link>

      </div>

      <ul className="hidden md:flex items-center gap-4 ">
        {/* <img className="w-4 h-4" src={assets.search_icon} alt="search icon" /> */}
        <button className="flex items-center gap-2 hover:text-gray-900 transition">
          <img src={assets.user_icon} alt="user icon" />
          Account
        </button>
      </ul>

      <div className="flex items-center md:hidden gap-3">
        {isSeller && <button onClick={() => {}} className="text-xs border px-4 py-1.5 rounded-full">Seller Dashboard</button>}
        <button className="flex items-center gap-2 hover:text-gray-900 transition">
          <img src={assets.user_icon} alt="user icon" />
          Account
        </button>
      </div>
      </div>
    </nav>
  );
};

export default Navbar;