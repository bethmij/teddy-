import { useEffect } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">

      <div data-aos="fade-down" className="bg-[#F8F2EE]/80 rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl md:text-4xl font-medium text-gray-600">
              About <span className="font-medium text-[#E8C2A5]">Teddy Toy Shop</span>
            </h1>
            <div className="w-28 h-0.5 bg-[#E8C2A5]"></div>
            <p className="text-gray-600 mt-2">
              Creating childhood memories with our cuddly companions since 2005.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden">
            <img
              src={assets.logo || "/teddy-hero.jpg"}
              alt="Teddy Toy Shop"
              className="w-full h-auto object-cover mix-blend-multiply"
            />
          </div>
        </div>
      </div>

      <div data-aos="fade-right" className="grid grid-cols-1 md:grid-cols-2 gap-16 py-10">
        <div className="flex flex-col">
            <h1 className="text-2xl font-medium text-gray-500 mb-2">
              Our <span className="font-medium text-[#E8C2A5]">Story</span>
            </h1>
          <div className="w-20 h-0.5 bg-[#E8C2A5] mb-6"></div>
          <p className="text-gray-600 mb-4">
            Teddy Toy Shop began as a small family business in 2005, founded by the Bethmi who had a passion for creating high-quality, huggable teddy bears that would become lifelong companions for children around the world.
          </p>
          <p className="text-gray-600 mb-4">
            What started as a modest workshop has now grown into a beloved brand known for exceptional craftsmanship, sustainable materials, and designs that spark imagination and comfort.
          </p>
          <p className="text-gray-600">
            Each of our teddy bears is crafted with love and attention to detail, ensuring that they're not just toys, but friends that will be treasured for generations.
          </p>
        </div>
        <div data-aos="fade-up-left" data-aos-duration="1000" className="px-5 lg:px-16 xl:px-20 rounded-lg bg-[#F8F2EE]/80 flex justify-center items-center">
          <div className="rounded-lg overflow-hidden">
            <img
              src={assets.teddy_1 || "/our-story.jpg"}
              alt="Our Story"
              className="w-full h-auto object-cover mix-blend-multiply"
            />
          </div>
        </div>
      </div>

      <div className="py-10">
        <div data-aos="fade-down" data-aos-duration="1000" className="flex flex-col items-center mb-10">
          <h2 className="text-2xl font-medium text-gray-500">Our <span className="font-medium text-[#E8C2A5]">Values</span></h2>
          <div className="w-20 h-0.5 bg-[#E8C2A5] mt-2"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div data-aos="fade-right" data-aos-duration="1000" className="bg-[#F8F2EE]/80 p-6 rounded-lg">
            <div className="w-12 h-12 bg-[#e8c2a580] rounded-full flex items-center justify-center mb-4">
              <img src={assets.heart_icon || "/icons/quality.svg"} alt="Quality" className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-medium text-gray-600 mb-2">Quality</h3>
            <p className="text-gray-600">We use only the finest materials and craftsmanship to ensure our teddy bears are safe, durable, and incredibly soft.</p>
          </div>
          
          <div data-aos="zoom-in" data-aos-duration="1000" className="bg-[#F8F2EE]/80 p-6 rounded-lg">
            <div className="w-12 h-12 bg-[#e8c2a580] rounded-full flex items-center justify-center mb-4">
              <img src={assets.heart_icon || "/icons/sustainability.svg"} alt="Sustainability" className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-medium text-gray-600 mb-2">Sustainability</h3>
            <p className="text-gray-600">Our commitment to the environment means we source eco-friendly materials and employ sustainable manufacturing practices.</p>
          </div>
          
          <div data-aos="fade-left" data-aos-duration="1000" className="bg-[#F8F2EE]/80 p-6 rounded-lg">
            <div className="w-12 h-12 bg-[#e8c2a580] rounded-full flex items-center justify-center mb-4">
              <img src={assets.heart_icon || "/icons/imagination.svg"} alt="Imagination" className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-medium text-gray-600 mb-2">Imagination</h3>
            <p className="text-gray-600">We believe in creating teddy bears that inspire creativity and become part of a child's adventures and stories.</p>
          </div>
        </div>
      </div>

      <div className="py-10">
        <div data-aos="fade-down" data-aos-duration="1000" className="flex flex-col items-center mb-10">
          <h2 className="text-2xl font-medium text-gray-500">Meet Our <span className="font-medium text-[#E8C2A5]">Team</span></h2>
          <div className="w-24 h-0.5 bg-[#E8C2A5] mt-2"></div>
        </div>
        
        <div data-aos="fade-up" data-aos-duration="1000" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            {name: "Bethmi Jayamila", title: "Founder & CEO", image: assets.user_icon || ""},
            {name: "Bethmi Jayamila", title: "Lead Designer", image: assets.user_icon || ""},
            {name: "Bethmi Jayamila", title: "Master Craftsperson", image: assets.user_icon || ""},
            {name: "Bethmi Jayamila", title: "Customer Experience", image: assets.user_icon || ""}
          ].map((member, index) => (
            <div key={index} className="bg-[#F8F2EE]/40 rounded-lg overflow-hidden">
              <div className="aspect-w-1 aspect-h-1">
                <div className="bg-[#F8F2EE]/80 h-64 rounded-lg shadow-sm flex justify-center items-center">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover mix-blend-multiply" />
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-600">{member.name}</h3>
                <p className="text-gray-500">{member.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div data-aos="zoom-in" data-aos-duration="1000" className="bg-[#F8F2EE]/80 rounded-lg p-8 my-16">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-medium text-gray-600 mb-4">Ready to find your perfect teddy?</h2>
          <p className="text-gray-500 mb-6 max-w-xl">
            Discover our collection of lovable teddy bears, each handcrafted to become a cherished companion.
          </p>
          <button 
            onClick={() => navigate("/shop")} 
            className="px-4 py-1.5 bg-[#e8c2a580] text-[#895025] hover:bg-[#E8C2A5] rounded-3xl transition"
          >
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
