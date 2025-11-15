
import React, { useState, useEffect, useRef } from "react";

// import React, { useState, useEffect } from "react";

import { Menu, X, Search, MapPin, ShoppingCart, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice"; // ✅ import logout

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // mobile menu
  const [userMenu, setUserMenu] = useState(false); // profile dropdown
  const [profileData, setProfileData] = useState(null); // ✅ store fetched profile
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ Redux state
  const { user, token } = useSelector((state) => state.auth);


  const dropdownRef = useRef(null); // ✅ ref for profile dropdown



  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleUserMenu = () => setUserMenu(!userMenu);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  // ✅ Fetch logged-in user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log("🔍 Token before fetch:", token); // ✅ check token in console

        if (!token) {
          console.warn("⚠️ No token found — skipping profile fetch");
          return;
        }

        const res = await fetch("https://apnalabour.onrender.com/api/customer/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Response status:", res.status); // ✅ see backend response

        if (!res.ok) {
          const errText = await res.text();
          console.error("❌ Server error response:", errText);
          throw new Error(`Failed to fetch profile (${res.status})`);
        }

        const data = await res.json();
        console.log("✅ Profile data fetched:", data);
        setProfileData(data?.customer || null);
      } catch (error) {
        console.error("❌ Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [token]);


  // ✅ Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <nav className="bg-white fixed w-full z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div
            className="flex-shrink-0 text-2xl font-bold italic text-blue-900 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Apna Labour
          </div>

          {/* Search + Location (Desktop) */}
          <div className="hidden md:flex items-center space-x-2">
            <div className="flex items-center border rounded-lg px-3 py-1 w-64">
              <Search className="text-gray-400 w-4 h-4 mr-2" />
              <input
                type="text"
                placeholder="Search for your city"
                className="w-full outline-none text-sm text-gray-600"
              />
            </div>

            <button className="flex items-center bg-[#052c42] text-white px-4 py-2 rounded-lg shadow-sm">
  {/* Blue Icon Only */}
  <MapPin className="w-5 h-5 mr-2 text-blue-400" />

  <div className="flex flex-col items-start leadin[zzz]">Add Your Location</span>
    <span className="text-[10px] opacity-80 text-white">
      To See Services In Your Area
    </span>
  </div>
</button>

          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-6 relative">
            <ShoppingCart
              className="w-5 h-5 text-gray-700 cursor-pointer"
              onClick={() => navigate("/viewcart")}
            />

            {/* User Dropdown */}
            <div className="relative">
              <User
                className="w-5 h-5 text-gray-700 cursor-pointer"
                onClick={toggleUserMenu}
              />
              {userMenu && (
                <div
                  ref={dropdownRef} // ✅ attach ref for outside click
                  className="absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-lg border p-4 z-50"
                >
                  {!user ? (
                    <>
                      <p className="font-semibold text-gray-800">Welcome!</p>
                      <p className="text-sm text-gray-500 mb-4">
                        To access account &amp; manage bookings
                      </p>
                      <button
                        onClick={() => navigate("/login")}
                        className="w-full border border-gray-300 rounded-full py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
                      >
                        Signup / Login
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="font-semibold text-gray-800">
                        Hi!{" "}
                        {profileData?.name
                          ? profileData.name
                          : user.name || user.email}
                      </p>
                      <div className="mt-3 space-y-2">
                        <button
                          onClick={() => navigate("/account")}
                          className="w-full border border-gray-300 rounded-md py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
                        >
                          Account
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full border border-red-400 text-red-600 rounded-md py-2 text-sm font-medium hover:bg-red-50"
                        >
                          Log Out
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Hide "Become a helper" after login */}
            {!user && (
              <a href="/become-helper" className="text-blue-900 font-semibold">
                Become a helper
              </a>
            )}
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
          <div className="flex items-center border rounded-lg px-3 py-2">
            <Search className="text-gray-400 w-4 h-4 mr-2" />
            <input
              type="text"
              placeholder="Search for your city"
              className="w-full outline-none text-sm text-gray-600"
            />
          </div>

          <button className="flex items-center bg-blue-900 text-white px-4 py-2 rounded-lg text-sm w-full">
            <MapPin className="w-4 h-4 mr-2" />
            <span>Add Your Location</span>
          </button>

          <div className="flex flex-col space-y-2">
            <a href="/viewcart" className="flex items-center text-gray-700">
              <ShoppingCart className="w-5 h-5 mr-2" /> Cart
            </a>

            {!user ? (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="w-full border border-gray-300 rounded-full py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
                >
                  Signup / Login
                </button>
                <a
                  href="/become-helper"
                  className="text-blue-900 font-semibold"
                >
                  Become a helper
                </a>
              </>
            ) : (
              <>
                  <button
                    onClick={() => navigate("/account")}
                    className="w-full border border-gray-300 rounded-md py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
                  >
                    Account
                  </button>
                <button
                  onClick={handleLogout}
                  className="w-full border border-red-400 text-red-600 rounded-md py-2 text-sm font-medium hover:bg-red-50"
                >
                  Log Out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;