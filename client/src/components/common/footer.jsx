import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#12362f] via-[#183a3a] to-[#0f2322] text-white pt-20 pb-8 relative overflow-hidden z-10">
      {/* Fashion wave divider */}
      <div className="w-full overflow-hidden absolute -top-1 left-0 right-0 z-0 ">
        <svg
          className="w-full h-16"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,160L60,176C120,192,240,224,360,218.7C480,213,600,171,720,149.3C840,128,960,128,1080,122.7C1200,117,1320,107,1380,101.3L1440,96V0H1380C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0H0Z"
            fill="#12362f"
            opacity={0.7}
          />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* SHOP */}
          <div>
            <h4 className="text-lg font-extrabold tracking-wider mb-4 uppercase text-yellow-400 font-[Poppins]">Shop</h4>
            <ul className="space-y-2 text-md text-gray-200">
              <li><a href="#" className="hover:text-yellow-400 transition">Trending</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">New Arrivals</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">Gift Cards</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">Refer a Friend</a></li>
            </ul>
          </div>

          {/* HELP */}
          <div>
            <h4 className="text-lg font-extrabold tracking-wider mb-4 uppercase text-yellow-400 font-[Poppins]">Help</h4>
            <ul className="space-y-2 text-md text-gray-200">
              <li><a href="#" className="hover:text-yellow-400 transition">Contact Us</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">FAQ</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">Size Guide</a></li>
            </ul>
          </div>

          {/* ABOUT */}
          <div>
            <h4 className="text-lg font-extrabold tracking-wider mb-4 uppercase text-yellow-400 font-[Poppins]">About</h4>
            <ul className="space-y-2 text-md text-gray-200">
              <li><a href="#" className="hover:text-yellow-400 transition">Our Story</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">Fashion Blog</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">Careers</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">Sustainability</a></li>
            </ul>
          </div>

          {/* SUBSCRIBE & SOCIAL */}
          <div>
            <p className="text-base mb-3 font-medium text-gray-100 font-[Poppins]">Be first to shop exclusive drops & get 10% off</p>
            <form className="flex items-center bg-white bg-opacity-15 rounded-full p-2 backdrop-blur-md border border-yellow-400/30 focus-within:ring-2 focus-within:ring-yellow-400 transition">
              <input
                type="email"
                aria-label="Email Address"
                placeholder="Your Email Address"
                className="bg-transparent flex-grow outline-none px-4 py-2 text-white placeholder-gray-300 font-medium"
              />
              <button
                type="submit"
                className="ml-2 bg-yellow-400 text-[#12362f] font-bold px-5 py-2 rounded-full hover:bg-yellow-500 focus:outline-none shadow transition"
              >
                Subscribe
              </button>
            </form>
            <div className="flex space-x-6 mt-7">
              <a href="#" aria-label="Instagram" className="hover:text-yellow-400 focus:outline-none transition scale-125"><FaInstagram size={26} /></a>
              <a href="#" aria-label="Facebook" className="hover:text-yellow-400 focus:outline-none transition scale-125"><FaFacebook size={26} /></a>
              <a href="#" aria-label="Twitter" className="hover:text-yellow-400 focus:outline-none transition scale-125"><FaTwitter size={26} /></a>
              <a href="#" aria-label="LinkedIn" className="hover:text-yellow-400 focus:outline-none transition scale-125"><FaLinkedin size={26} /></a>
            </div>
          </div>
        </div>

        <hr className="my-10 border-yellow-400/30" />

        <div className="text-center text-xs text-gray-300 font-medium tracking-wide font-[Poppins]">
          © {new Date().getFullYear()} <span className="font-semibold text-yellow-400">VizzleMart</span>. Style inspired for you &middot; <a href="#" className="hover:text-yellow-400">Terms of Service</a> &middot; <a href="#" className="hover:text-yellow-400">Privacy Policy</a> &middot; <a href="#" className="hover:text-yellow-400">Do Not Sell My Info</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
