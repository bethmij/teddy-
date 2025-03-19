import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div data-aos="fade-up" className="flex flex-col md:flex-row items-center justify-between pl-6 py-14 md:py-0 bg-[#F8F2EE] my-16 rounded-xl overflow-hidden">
      <img
        className="max-w-80"
        src={assets.teddy_7}
        alt="jbl_soundbox_image"
      />
      <div className="flex flex-col items-center justify-center text-center space-y-2 px-4 md:px-0">
        <h2 className="text-2xl md:text-3xl font-semibold max-w-[350px] text-gray-600">
          Spark Creativity and Fun with Our Toys
        </h2>
        <p className="max-w-[343px] font-medium text-gray-800/60">
          From educational toys to fun-filled adventures everything your child needs to grow and play
        </p>
        <button onClick={()=>{navigate(`/shop`);}} className="group flex items-center justify-center gap-1 px-12 py-2.5 bg-[#e8c2a5c7] rounded-full text-[#895025] hover:bg-[#E8C2A5]">
          Buy now
          <img className="group-hover:translate-x-1 transition ml-0.5 pt-1" src={assets.arrow_icon} alt="arrow_icon" />
        </button>
      </div>
      <img
        className="hidden md:block max-w-80"
        src={assets.teddy_6}
        alt="md_controller_image"
      />
      <img
        className="md:hidden"
        src={assets.teddy_6}
        alt="sm_controller_image"
      />
    </div>
  );
};

export default Banner;