import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { label: "My Account", path: "/account" },
  { label: "My Bookings", path: "/bookings" },
  { label: "Payments", path: "/payments" },
  { label: "My rating & reviews", path: "/reviews" },
  { label: "Help Center", path: "/help" },
  { label: "All notification", path: "/notifications" },
];

const AccountSidebar = ({
  displayData = {},
  handleLogout,
  handleDeactivate,
}) => {
  const name = displayData?.name || "User";
  const image = displayData?.image;
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // for mobile toggle

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false); // close sidebar on mobile after click
  };

  return (
    <>
      {/* Mobile Hamburger */}
      <div className="md:hidden flex justify-between items-center bg-gray-100 p-4 border-b">
        <h2 className="font-bold text-lg">Hello {name}</h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-700 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
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
      <div
        className={`
          fixed top-0 left-0 h-full w-64 bg-gray-100 border-r z-50 transform 
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static md:flex-shrink-0
        `}
      >
        {/* Profile section */}
        <div className="p-4 flex flex-col items-center text-center md:items-center">
          <div className="w-20 h-20 bg-gray-300 rounded-full mb-4 flex items-center justify-center overflow-hidden">
            {image ? (
              typeof image === "string" ? (
                <img
                  src={image}
                  alt="profile"
                  className="w-20 h-20 object-cover rounded-full"
                />
              ) : (
                <img
                  src={URL.createObjectURL(image)}
                  alt="profile"
                  className="w-20 h-20 object-cover rounded-full"
                />
              )
            ) : (
              <span className="text-2xl font-bold text-white">
                {name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <h2 className="font-bold text-lg mb-4 hidden md:block">Hello {name}</h2>
        </div>

        {/* Menu */}
        <ul className="text-gray-700 flex flex-col">
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
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-200"
            >
              Logout
            </button>
          )}
          {handleDeactivate && (
            <button
              onClick={handleDeactivate}
              className="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-800 transition duration-200"
            >
              Deactivate Account
            </button>
          )}
        </div>
      </div>

      {/* Mobile overlay background */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-25 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default AccountSidebar;
