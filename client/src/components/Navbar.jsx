import React, { useState } from "react";
import { Menu, X, Search, MapPin, ShoppingCart, User } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white  fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 text-2xl font-bold italic text-blue-900">
            Apna Labour
          </div>

          {/* Search + Location (Desktop) */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Search Box */}
            <div className="flex items-center border rounded-lg px-3 py-1 w-64">
              <Search className="text-gray-400 w-4 h-4 mr-2" />
              <input
                type="text"
                placeholder="Search for your city"
                className="w-full outline-none text-sm text-gray-600"
              />
            </div>

            {/* Location */}
            <button className="flex items-center bg-blue-900 text-white px-4 py-2 rounded-lg text-sm">
              <MapPin className="w-4 h-4 mr-2" />
             
            </button>
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-6">
            <ShoppingCart className="w-5 h-5 text-gray-700" />
            <User className="w-5 h-5 text-gray-700" />
            <a href="/become-helper" className="text-blue-900 font-semibold">
              Become a helper
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-4 bg-white shadow-md">
          {/* Search */}
          <div className="flex items-center border rounded-lg px-3 py-2">
            <Search className="text-gray-400 w-4 h-4 mr-2" />
            <input
              type="text"
              placeholder="Search for your city"
              className="w-full outline-none text-sm text-gray-600"
            />
          </div>

          {/* Location */}
          <button className="flex items-center bg-blue-900 text-white px-4 py-2 rounded-lg text-sm w-full">
            <MapPin className="w-4 h-4 mr-2" />
            <span>Add Your Location</span>
          </button>

          {/* Links */}
          <div className="flex flex-col space-y-2">
            <a href="/cart" className="flex items-center text-gray-700">
              <ShoppingCart className="w-5 h-5 mr-2" /> Cart
            </a>
            <a href="/profile" className="flex items-center text-gray-700">
              <User className="w-5 h-5 mr-2" /> Profile
            </a>
            <a href="/become-helper" className="text-blue-900 font-semibold">
              Become a helper
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
