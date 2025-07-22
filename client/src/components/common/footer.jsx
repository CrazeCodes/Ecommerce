import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    
    <footer className="bg-[#12362f] text-white pt-16 pb-8">
      {/* Wavy Top SVG */}
      {/* SVG Wave Divider */}
        <div className="w-full overflow-hidden relative -mb-1">
        <svg
            className="w-full h-20"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
            d="M0,224L60,213.3C120,203,240,181,360,176C480,171,600,181,720,165.3C840,149,960,107,1080,96C1200,85,1320,107,1380,117.3L1440,128V0H1380C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0H0Z"
            fill="#12362f"
            />
        </svg>
        </div>


      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* SHOP */}
          <div>
            <h4 className="text-lg font-semibold mb-3">SHOP</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Drinks</li>
              <li>Gift Cards</li>
              <li>Store Locator</li>
              <li>Refer a Friend</li>
            </ul>
          </div>

          {/* HELP */}
          <div>
            <h4 className="text-lg font-semibold mb-3">HELP</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Contact Us</li>
              <li>FAQ</li>
              <li>Accessibility</li>
            </ul>
          </div>

          {/* ABOUT */}
          <div>
            <h4 className="text-lg font-semibold mb-3">ABOUT</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Our Story</li>
              <li>OLIPOP Digest</li>
              <li>Ingredients</li>
              <li>Digestive Health</li>
              <li>Wholesale</li>
              <li>Press</li>
              <li>Careers</li>
            </ul>
          </div>

          {/* Subscribe */}
          <div className="space-y-4">
            <p className="text-sm">Sign up to get 10% off your first order</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your Email Address"
                className="rounded-full px-4 py-2 w-full text-black focus:outline-none"
              />
              <button className="ml-2 bg-yellow-400 text-black font-semibold px-4 py-2 rounded-full hover:bg-yellow-500">
                Subscribe
              </button>
            </div>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-yellow-400">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="hover:text-yellow-400">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="hover:text-yellow-400">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="hover:text-yellow-400">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-gray-400 mt-10">
          © {new Date().getFullYear()} VizzleMart. All Rights Reserved · Terms of Service · Privacy Policy · Do Not Sell My Information
        </div>
      </div>
    </footer>
  );
};

export default Footer;
