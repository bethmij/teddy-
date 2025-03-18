import ProductCard from "../components/ProductCard";
import { useState } from "react";
import { assets } from "../assets/assets";

const Products = () => {

      const [products] = useState([
        {
          id: 1,
          name: "Teddy 1",
          description: "The cutest, most squeezable teddy bear for your little one",
          rating: 4.5,
          offerPrice: "99.99",
          imgSrc: assets.teddy_1,
        },
        {
          id: 2,
          name: "Teddy 2",
          description: "The cutest, most squeezable teddy bear for your little one",
          rating: 4.5,
          offerPrice: "329.99",
          imgSrc: assets.teddy_1,
        },
        {
          id: 3,
          name: "Teddy 3",
          description: "The cutest, most squeezable teddy bear for your little one",
          rating: 4.5,
          offerPrice: "799.99",
          imgSrc: assets.teddy_1,
        },
        {
          id: 4,
          name: "Teddy 4",
          description: "The cutest, most squeezable teddy bear for your little one",
          rating: 4.5,
          offerPrice: "349.99",
          imgSrc: assets.teddy_1,
        },
        {
          id: 5,
          name: "Teddy 5",
          description: "The cutest, most squeezable teddy bear for your little one",
          rating: 4.5,
          offerPrice: "499.99",
          imgSrc: assets.teddy_1,
        }]);

    return (
        <>

            <div className="flex flex-col items-start px-6 md:px-16 lg:px-32">
                <div className="flex flex-col items-end pt-12">
                    <p className="text-2xl font-medium">All products</p>
                    <div className="w-16 h-0.5 bg-[#E8C2A5] rounded-full"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-12 pb-14 w-full">
                    {products.map((product, index) => <ProductCard key={index} product={product} />)}
                </div>
            </div>

        </>
    );
};

export default Products;
