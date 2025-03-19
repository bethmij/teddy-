import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import Loading from "./Loading";

interface HomeProductProps{
  products:any[];
  isLoading:boolean;
}
const HomeProducts = ({products, isLoading}:HomeProductProps) => {
  const { getRole } = useAppContext();
  const [role, setRole] = useState<any>(null);
  const navigate = useNavigate();

   useEffect(()=>{
     setRole(getRole());       
   },[])
        
  return (
    <div className="flex flex-col justify-center items-center pt-14 mx-22 ">
      
       <div className="flex flex-col items-start ">

        <div className="flex flex-col items-center w-full">
          <div data-aos="zoom-in" className="flex flex-col items-end">
            <p className="text-2xl font-medium text-gray-600">Popular <span className="font-medium text-[#E8C2A5]">Products</span></p>
          </div>
          <div className="w-16 h-0.5 text-[#E8C2A5] rounded-full mt-1"></div>
        </div>
       
        <div data-aos="zoom-in" className="flex flex-row flex-wrap items-center gap-6 mt-5 pb-14">
        {isLoading ? <div className="w-[20vw]"><Loading/> </div>: products.map((product:any, index:any) => <ProductCard key={index} product={product} role={role}/>)}
        </div>
        
      </div>

        <button data-aos="fade-down" onClick={()=>{navigate(`/shop`);}} className="px-8 py-1.5 border border-[#E8C2A5] rounded-3xl text-gray-500/70 hover:bg-[#e8c2a580] transition">
            See more
        </button>
    </div>
  );
};

export default HomeProducts;
