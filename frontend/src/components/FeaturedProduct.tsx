import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const products = [
  {
    id: 1,
    image: assets.teddy_bear_1,
    title: "Cuddly Companion",
    description: "Snuggle up with our soft and huggable teddy bears.",
  },
  {
    id: 2,
    image: assets.teddy_bear_2,
    title: "Teddy's Best Friend",
    description: "Your perfect cuddly friend for every adventure.",
  },
  {
    id: 3,
    image: assets.teddy_bear_3,
    title: "Tiny Teddy Treasure",
    description: "Perfect for little hands, the cutest teddy bears for kids.",
  },
];

const FeaturedProduct = () => {
  const navigate = useNavigate();
  
  return (
    <div data-aos="zoom-in" className="mt-14">
      <div className="flex flex-col items-center">
        <p className="text-3xl font-medium text-gray-600">Featured <span className="font-medium text-[#E8C2A5]">Products</span></p>
        <div className="w-28 h-0.5 bg-[#E8C2A5] mt-2"></div>
      </div>

      <div data-aos="fade-up"className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-14 mt-12 md:px-14 px-4">
        {products.map(({ id, image, title, description }) => (
          <div key={id} className="relative group">
            <img
              src={image}
              alt={title}
              className="group-hover:brightness-75 transition duration-300 w-full h-auto object-cover rounded-2xl"
            />
            <div className="group-hover:-translate-y-4 transition duration-300 absolute bottom-8 left-8 text-white space-y-2">
              <p className="font-medium text-xl lg:text-2xl">{title}</p>
              <p className="text-sm lg:text-base leading-5 max-w-60">
                {description}
              </p>
              <button onClick={()=>{navigate(`/shop`);}} className="flex items-center gap-1.5 bg-[#E8C2A5] rounded-full text-[#895025] hover:bg-[#e8c2a5c7] px-4 py-2">
                Buy now <img className="h-3 w-3" src={assets.redirect_icon} alt="Redirect Icon" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProduct;
