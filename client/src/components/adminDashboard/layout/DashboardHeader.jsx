import React, { useState } from "react";
import { Search, Bell, Menu, X } from "lucide-react";

const DashboardHeader = ({ onToggleSidebar }) => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 w-full relative">
      {/* Left: Menu button for mobile */}
      <div className="flex items-center">
        <button
          className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
          onClick={onToggleSidebar}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Center: Search Bar (inline) */}
      <div className="flex-1 flex justify-center">
        {showSearch && (
          <div className="w-full max-w-md flex items-center border border-gray-300 rounded-md px-3 py-1.5 bg-white shadow-sm transition-all duration-300">
            <Search className="w-4 h-4 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 text-sm focus:outline-none"
              autoFocus
            />
            <button
              onClick={() => setShowSearch(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Right: Icons and Profile */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        {/* Search Icon */}
        {!showSearch && (
          <button
            className="p-2 bg-[#003366] text-white rounded-lg hover:bg-[#002855] transition"
            onClick={() => setShowSearch(true)}
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        )}

        {/* Notification Icon */}
        <button className="p-2 bg-[#003366] text-white rounded-lg hover:bg-[#002855] transition">
          <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Profile Image */}
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border-2 border-gray-200">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
            alt="User avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
