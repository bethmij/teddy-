import { assets } from "../assets/assets";

const Footer = () => {
  return (
      <footer className="w-full bottom-0 left-0 right-0">
        <div
            className="flex flex-col md:flex-row items-start justify-center px-6 md:px-16 lg:px-32 gap-10 py-14 border-b border-[#F5ECE6] text-gray-500 bg-[#F8F2EE]">
          <div className="w-4/5">
            <img className="w-28 md:w-32" src={assets.logo} alt="logo"/>
            <p className="mt-6 text-sm">
              Our toy collection brings joy and excitement to children of all ages. From educational toys to action
              figures,
              we offer a wide variety of high-quality products that spark imagination and creativity.
              Explore the best in playtime fun with top brands, engaging designs, and safe, durable materials.
              Whether you're looking for the perfect gift or expanding a toy collection, we have something special for
              every child.
            </p>
          </div>

          <div className="w-1/2 flex items-center justify-start md:justify-center">
            <div>
              <h2 className="font-medium text-gray-600 mb-5">Company</h2>
              <ul className="text-sm space-y-2">
                <li>
                  <a className="hover:underline transition" href="#">Home</a>
                </li>
                <li>
                  <a className="hover:underline transition" href="#">About us</a>
                </li>
                <li>
                  <a className="hover:underline transition" href="#">Contact us</a>
                </li>
                <li>
                  <a className="hover:underline transition" href="#">Privacy policy</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-1/2 flex items-start justify-start md:justify-center">
            <div>
              <h2 className="font-medium text-gray-600 mb-5">Get in touch</h2>
              <div className="text-sm space-y-2">
                <p>contact@Bethmi Jayamila</p>
                <p>+94-12345678</p>
              </div>
            </div>
          </div>
        </div>
        <p className="py-4 text-center text-xs md:text-sm text-gray-600">
          Copyright 2025 © Bethmi Jayamila All Right Reserved
        </p>
      </footer>
  );
};

export default Footer;