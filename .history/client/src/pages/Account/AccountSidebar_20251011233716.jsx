import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const menuItems = [
  { label: "My Account", path: "/account" },
  { label: "My Bookings", path: "/bookings" },
  { label: "Payments", path: "/payments" },
  { label: "My rating & reviews", path: "/reviews" },
  { label: "Help Center", path: "/help" },
  { label: "All notification", path: "/notifications" },
];

const AccountSidebar = ({ handleLogout, handleDeactivate }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // Fetch profile data
  const accountData = useSelector((state) => state.account?.accountData);
  const name = accountData?.name || "User";
  const image = accountData?.image || accountData?.profile?.image;

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false); // close on mobile after click
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex justify-between items-center bg-gray-100 p-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center">
            {image ? (
              <img
                src={typeof image === "string" ? image : URL.createObjectURL(image)}
                alt="profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white font-bold text-lg">
                {name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <span className="font-bold text-lg">{name}</span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-700 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-gray-100 border-r overflow-y-auto transform
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0 md:flex-shrink-0
        `}
      >
        {/* Profile */}
        <div className="p-4 flex flex-col items-center text-center md:items-center md:mt-4">
          <div className="w-20 h-20 rounded-full bg-gray-300 mb-3 flex items-center justify-center overflow-hidden">
            {image ? (
              <img
                src={typeof image === "string" ? image : URL.createObjectURL(image)}
                alt="profile"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <span className="text-2xl font-bold text-white">
                {name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <h2 className="font-bold text-lg hidden md:block">{name}</h2>
        </div>

        {/* Menu */}
        <ul className="flex flex-col text-gray-700">
          {menuItems.map((item) => (
            <li
              key={item.label}
              onClick={() => handleNavigate(item.path)}
              className="px-6 py-3 cursor-pointer hover:bg-gray-200 transition duration-200 text-center md:text-left"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleNavigate(item.path);
              }}
            >
              {item.label}
            </li>
          ))}
        </ul>

        {/* Buttons */}
        <div className="flex flex-col gap-2 mt-6 px-6 pb-6">
          {handleLogout && (
            <button
              className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-200"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
          {handleDeactivate && (
            <button
              className="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-800 transition duration-200"
              onClick={handleDeactivate}
            >
              Deactivate Account
            </button>
          )}
        </div>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-25 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default AccountSidebar;
