import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useState } from "react";



const ProductView = () => {

    const [products, setProducts] = useState([
          {
            id: "1",
            name: "Teddy 1",
            description: "The cutest, most squeezable teddy bear for your little one",
            rating: 4.5,
            offerPrice: "99.99",
            image: assets.teddy_1,
          },
          {
            id: "2",
            name: "Teddy 2",
            description: "The cutest, most squeezable teddy bear for your little one",
            rating: 4.5,
            offerPrice: "329.99",
            image: assets.teddy_1,
          },
          {
            id: "3",
            name: "Teddy 3",
            description: "The cutest, most squeezable teddy bear for your little one",
            rating: 4.5,
            offerPrice: "799.99",
            image: assets.teddy_1,
          },
          {
            id: "4",
            name: "Teddy 4",
            description: "The cutest, most squeezable teddy bear for your little one",
            rating: 4.5,
            offerPrice: "349.99",
            image: assets.teddy_1,
          },
          {
            id: "5",
            name: "Teddy 5",
            description: "The cutest, most squeezable teddy bear for your little one",
            rating: 4.5,
            offerPrice: "499.99",
            image: assets.teddy_1,
          }]);

    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useAppContext();

    const [productData, setProductData] = useState({
        id: "1",
        name: "Teddy 1",
        description: "The cutest, most squeezable teddy bear for your little one",
        rating: 4.5,
        offerPrice: "99.99",
        image: assets.teddy_1,
        price: "399.99",
        category:"Dolls",
        colour: "Multi",
      });

    

    return productData ? (<>
        <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="px-5 lg:px-16 xl:px-20">
                    <div className="rounded-lg overflow-hidden bg-gray-500/10 mb-4">
                        <img
                            src={productData.image || ""}
                            alt="alt"
                            className="w-full h-auto object-cover mix-blend-multiply"
                        />
                    </div>
 
                </div>

                <div className="flex flex-col">
                    <h1 className="text-3xl font-medium text-gray-800/90 mb-4">
                        {productData.name}
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
                    <p className="text-3xl font-medium mt-6">
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
                                    <td className="text-gray-600 font-medium">Brand</td>
                                    <td className="text-gray-800/50 ">Generic</td>
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
                        <button onClick={() => {addToCart(productData.id);}} className="w-full py-2.5 rounded-3xl bg-[#e8c2a580] text-[#895025] hover:bg-[#e8c2a5c7] transition">
                            Add to Cart
                        </button>
                        <button onClick={() => {addToCart(productData.id);  navigate("/cart"); }} className="w-full py-2.5 rounded-3xl bg-[#E8C2A5]  bg-[#e8c2a5c7]- text-[895025] hover:bg-[#e8c2a580] transition">
                            Buy now
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <div className="flex flex-col items-center mb-4 mt-16">
                    <p className="text-3xl font-medium">Featured <span className="font-medium text-orange-600">Products</span></p>
                    <div className="w-28 h-0.5 bg-orange-600 mt-2"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full">
                    {products.slice(0, 5).map((product, index) => <ProductCard key={index} product={product} />)}
                </div>
                <button onClick={()=>{navigate(`/shop`);}} className="px-8 py-1.5 mb-16 border  border-[#E8C2A5] rounded-3xl text-gray-500/70 hover:bg-[#e8c2a580] transition">
                    See more
                </button>
            </div>
        </div>
    </>
    ) : <Loading />
};

export default ProductView;