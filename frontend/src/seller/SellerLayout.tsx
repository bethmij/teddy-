import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "../components/Footer";
import Sidebar from "./Sidebar";


export default function SellerLayout() {
  return (
    <>
      <Navbar/>
      <div className='flex w-full'>
        <Sidebar />
        <Outlet/>
      </div>
      <Footer />
    </>
  );
}
