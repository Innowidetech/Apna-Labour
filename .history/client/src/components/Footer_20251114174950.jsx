import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#071B3A] text-white px-6 py-12 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Column 1 */}
        <div>
          <h2 className="font-bold text-2xl mb-4 italic">Apna Labour</h2>
          <p className="text-sm leading-relaxed text-gray-300">
            We created Apna Labour with one simple goal to empower skilled
            workers to find flexible, fair, and safe job opportunities right in their
            neighborhood.
          </p>

          {/* Social Icons */}
          <div className="flex items-center space-x-4 mt-5">
            <div className="bg-white/10 p-2 rounded-full cursor-pointer">
              <FaXTwitter size={14} />
            </div>
            <div className="bg-white/10 p-2 rounded-full cursor-pointer">
              <FaFacebookF size={14} />
            </div>
            <div className="bg-white/10 p-2 rounded-full cursor-pointer">
              <FaInstagram size={14} />
            </div>
            <div className="bg-white/10 p-2 rounded-full cursor-pointer">
              <FaLinkedinIn size={14} />
            </div>
          </div>

          {/* Email Subscribe */}
         zzz

        {/* Column 2 */}
        <div>
          <h3 className="font-semibold mb-4 text-[17px]">Support & Legal</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/contactus" className="hover:text-white">Contact Us</Link></li>
            <li><Link to="/faq" className="hover:text-white">About Us</Link></li>
            <li><a href="#" className="hover:text-white">Services Near Your Location</a></li>
            <li><Link to="/privacy-policy" className="hover:text-white">Privacy & policy</Link></li>
            <li><Link to="/terms-condition" className="hover:text-white">Terms & condition</Link></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="font-semibold mb-4 text-[17px]">Work With Us</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:text-white">Register as a professional</a></li>
            <li><a href="#" className="hover:text-white">Register as a Casual Labourer</a></li>
            <li><Link to="/workerzone" className="hover:text-white">Worker zone</Link></li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h3 className="font-semibold mb-4 text-[17px]">Top Categories</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:text-white">Appliance Repair</a></li>
            <li><a href="#" className="hover:text-white">Cleaning & Pest Control</a></li>
            <li><a href="#" className="hover:text-white">Electrician</a></li>
            <li><a href="#" className="hover:text-white">Plumber & Carpenter</a></li>
            <li><a href="#" className="hover:text-white">Painting & Waterproofing</a></li>
            <li><a href="#" className="hover:text-white">Women Salon</a></li>
            <li><a href="#" className="hover:text-white">Men Salon</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-600 mt-10 pt-4 text-sm text-center text-gray-400">
        copyright ©2019 Apna labour. All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
