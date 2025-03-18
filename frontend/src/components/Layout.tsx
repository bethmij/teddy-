import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {

  return (
    <>
      <Navbar/>
      <div className="px-6 md:px-16 lg:px-32">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
