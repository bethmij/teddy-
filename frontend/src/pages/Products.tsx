import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import {ToastContainer } from "react-toastify";


import api from "../api/api";
import showToast from "../alert/alert";
import { useAppContext } from "../context/AppContext";
import Swal from "sweetalert2";
import Loading from "../components/Loading";

const Products = () => {
      const { getUser, getRole } = useAppContext();
      const [products, setProducts] = useState([]);
      const [user, setUser] = useState<any>(null);
      const [role, setRole] = useState<any>(null);
      const [isLoading, setLoading] = useState(true);

      useEffect(() => {
        setUser(getUser()); 
        setRole(getRole()); 
        getAllProducts(); 
      }, []);
      
      const removeFromWishlist = (itemName: string, isInWishlist:boolean) => {
        setProducts((prevProducts:any) =>
          prevProducts.map((product:any) =>
            product.itemName === itemName ? { ...product, isInWishlist: !isInWishlist } : product
          )
        );
      };
      
        const getAllProducts = async ()=> {
          setLoading(true);
          try {
            const response = await api.get(`/product/all/${getUser()}`);
           if (response.status === 200) {   
              setProducts(response.data.data)
              setLoading(false);
              return
           } 
            showToast('An unexpected error occurred',"error");
            setLoading(false);
         } catch (err) {
          console.log(err)
            showToast('Error getting Products',"error");
            setLoading(false);
         }
        }

      
  const  wishlistClick = async (itemName:string,isInWishlist:boolean) => {
    try {
      
        const response = await api.post('/wishlist',{
          email: user,
          item: itemName,
          state: isInWishlist
        });

        if (response.status === 201 || response.status === 200) {  
          removeFromWishlist(itemName,isInWishlist)         
          Swal.fire({
            title: response.data.message,
            icon: "success"
          });
          return 
        }
      
      } catch (err:any) {
        Swal.fire({
          title: err.response.data.message,
          icon: "error"
        });
      }
  }

    return (
        <>

            <div className="flex flex-col items-start px-6 md:px-16 lg:px-32">
                <div data-aos="fade-right" className="flex flex-col items-end pt-12">
                    <p className="text-2xl font-medium text-gray-600">All <span className="font-medium text-[#E8C2A5]">Products</span></p>
                    <div className="w-16 h-0.5 bg-[#E8C2A5] rounded-full"></div>
                </div>
                <div data-aos="zoom-in" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-12 pb-14 w-full">
                {isLoading ? <Loading /> : products.map((product, index) => <ProductCard key={index} screen="products" product={product} wishlistClick={(name,isInWishlist)=>{wishlistClick(name,isInWishlist)}} user={user} role={role}/>) }
                </div>
                <ToastContainer className={"overflow-x-hidden"}/>
            </div>

        </>
    );
};

export default Products;
