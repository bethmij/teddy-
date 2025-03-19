import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import { AppContextProvider } from "./context/AppContext";
import ProductView from "./pages/ProductView";
import Cart from "./pages/Cart";
import UserView from "./pages/UserDashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Auth from "./pages/auth";
import SellerLayout from "./seller/SellerLayout";
import ManageProduct from "./seller/ManageProduct";
import ProductListView from "./seller/ProductListView";
import OrdersView from "./seller/OrdersView";
import UsersView from "./seller/UsersView";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; 

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false, 
      offset: 100,
    });
  }, []);
  return (
    <>
      <AppContextProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/shop" element={<Products />} />
              <Route path="/shop/:id" element={<ProductView />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/account" element={<UserView />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/auth" element={<Auth />} />
            </Route>

            <Route element={<SellerLayout />}>
              <Route index path="/add-product" element={<ManageProduct />} />
              <Route path="/product-list" element={<ProductListView />} />
              <Route path="/view-orders" element={<OrdersView />} />
              <Route path="/view-users" element={<UsersView />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </>
  );
}

export default App;
