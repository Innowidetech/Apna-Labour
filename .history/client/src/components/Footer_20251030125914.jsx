import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#2F295B] text-gray-200 px-6 py-10 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Column 1 - Logo + Description */}
        <div>
          <h2 className="text-white font-bold text-2xl mb-4 italic">
            Apna Labour
          </h2>
          <p className="text-sm leading-relaxed">
            We created Apna Labour with one simple goal — to empower skilled
            workers to find flexible, fair, and safe job opportunities right in
            their neighborhood.
          </p>
        </div>

        {/* Column 2 - Support & Legal */}
        <div>
          <h3 className="text-white font-semibold mb-4">Support & Legal</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/contactus" className="hover:text-white">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Services Near Your Location
              </a>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:text-white">
                Privacy & Policy
              </Link>
            </li>
            <li>
              <Link to="/terms-condition" className="hover:text-white">
                Terms & Condition
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3 - Work With Us */}
        <div>
          <h3 className="text-white font-semibold mb-4">Work With Us</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-white">
                Register as a professional
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Register as a helper
              </a>
            </li>
            <li>
              <Link to="/workerzone" className="hover:text-white">
                Worker Zone
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4 - Top Categories */}
        <div>
          <h3 className="text-white font-semibold mb-4">Top Categories</h3>
          <ul className="space-y-2 text-sm">
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

      {/* Bottom Copyright */}
      <div className="border-t border-gray-600 mt-8 pt-4 text-sm text-center text-gray-300">
        © 2019 Apna Labour. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
