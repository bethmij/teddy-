import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useEffect, useState } from "react";
import api from "../api/api";
import showToast from "../alert/alert";
import { ToastContainer } from "react-toastify";



const ProductView = () => {
    const navigate = useNavigate();
    const { addToCart, getRole } = useAppContext();
    const [role, setRole] = useState<any>(null);
    const { id } = useParams(); 
    const [products, setProducts] = useState([]);
    const [productData, setProductData] = useState<any>({});

        useEffect(()=>{
            setRole(getRole()); 
            getProduct();
            getFeaturedProducts();
        },[])
      
        const getProduct = async ()=> {
          try {
            const response = await api.get(`/product/${id}`);
           if (response.status === 200) {           
              return setProductData(response.data.data)
           } 
            showToast('An unexpected error occurred',"error");
        
         } catch (err) {
            showToast('Error getting Product', "error");
         }
        }

        const getFeaturedProducts = async ()=> {
            try {
              const response = await api.get(`/product/featured/items`);
             if (response.status === 200) {           
                return setProducts(response.data.data)
             } 
              
           } catch (err) {
              
           }
          }

    return productData ? (<>
        <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="px-5 lg:px-16 xl:px-20">
                    <div className="rounded-lg overflow-hidden bg-[#F8F2EE] mb-4">
                        <img
                            src={productData.image == "" || !productData.image ? assets.image_error : productData.image}
                            alt="alt"
                            className="w-full h-auto object-cover mix-blend-multiply"
                        />
                    </div>
 
                </div>

                <div className="flex flex-col">
                    <h1 className="text-3xl font-medium text-gray-600 mb-4">
                        {productData.itemName}
                    </h1>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-0.5">
                            <img className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                            <img className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                            <img className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                            <img className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                            <img
                                className="h-4 w-4"
                                src={assets.star_dull_icon}
                                alt="star_dull_icon"
                            />
                        </div>
                        <p>(4.5)</p>
                    </div>
                    <p className="text-gray-600 mt-3">
                        {productData.description}
                    </p>
                    <p className="text-3xl font-medium mt-6 text-gray-600">
                        ${productData.offerPrice}
                        <span className="text-base font-normal text-gray-800/60 line-through ml-2">
                            ${productData.price}
                        </span>
                    </p>
                    <hr className="bg-gray-600 my-6" />
                    <div className="overflow-x-auto">
                        <table className="table-auto border-collapse w-full max-w-72">
                            <tbody>
                                <tr>
                                    <td className="text-gray-600 font-medium">Quantity</td>
                                    <td className="text-gray-800/50 ">{productData.qty}</td>
                                </tr>
                                <tr>
                                    <td className="text-gray-600 font-medium">Color</td>
                                    <td className="text-gray-800/50 ">{productData.colour}</td>
                                </tr>
                                <tr>
                                    <td className="text-gray-600 font-medium">Category</td>
                                    <td className="text-gray-800/50">
                                        {productData.category}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="flex items-center mt-10 gap-4">
                        <button onClick={() => {
                           if( getRole() == "USER"){
                            addToCart(productData.itemName);  showToast(`${productData.itemName} Add to cart`,"success");
                           }}} className="w-full py-2.5 rounded-3xl bg-[#e8c2a580] text-[#895025] hover:bg-[#e8c2a5c7] transition">
                            Add to Cart
                        </button>
                        <button onClick={() => {
                            if( getRole() == "USER"){ addToCart(productData.itemName);  navigate("/cart");}
                            }} className="w-full py-2.5 rounded-3xl bg-[#E8C2A5] text-[#895025] hover:bg-[#e8c2a580] transition">
                            Buy now
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <div className="flex flex-col items-center mb-4 mt-16">
                    <p className="text-3xl font-medium text-gray-600">Featured <span className="font-medium text-[#E8C2A5]">Products</span></p>
                    <div className="w-28 h-0.5 bg-[#E8C2A5] mt-2"></div>
                </div>
                <div className="gap-6 mt-6 pb-14 w-full flex justify-center items-center">
                    {products.slice(0, 5).map((product, index) => <ProductCard key={index} product={product} type="featured" role={role}/>)}
                </div>
                <button onClick={()=>{navigate(`/shop`);}} className="px-8 py-1.5 mb-16 border  border-[#E8C2A5] rounded-3xl text-gray-500/70 hover:bg-[#e8c2a580] transition">
                    See more
                </button>
            </div>
            <ToastContainer className={"overflow-x-hidden"}/>
        </div>
    </>
    ) : <Loading />
};

export default ProductView;