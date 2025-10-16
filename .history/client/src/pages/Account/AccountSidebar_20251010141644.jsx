// src/components/AccountSidebar.jsx
import React from "react";

const menuItems = [
  "My Account",
  "My Bookings",
  "Payments",
  "My rating & reviews",
  "Help Center",
  "All notification",
];

const AccountSidebar = ({
  activeMenu,
  handleMenuClick,
  displayData,
  handleLogout,
  handleDeactivate,
}) => {
  return (
    <div className="w-full md:w-64 bg-gray-100 flex-shrink-0 ml-2">
      <div className="p-6 flex flex-col items-center">
        <div className="w-20 h-20 bg-gray-300 rounded-full mb-4 flex items-center justify-center overflow-hidden">
          {displayData.image ? (
            typeof displayData.image === "string" ? (
              <img
                src={displayData.image}
                alt="profile"
                className="w-20 h-20 object-cover rounded-full"
              />
            ) : (
              <img
                src={URL.createObjectURL(displayData.image)}
                alt="profile"
                className="w-20 h-20 object-cover rounded-full"
              />
            )
          ) : (
            <span className="text-2xl font-bold text-white">
              {displayData.name
                ? displayData.name.charAt(0).toUpperCase()
                : "U"}
            </span>
          )}
        </div>
        <h2 className="font-bold text-lg mb-6 text-center">
          Hello {displayData.name || "User"}
        </h2>
      </div>

      <ul className="text-gray-600">
        {menuItems.map((item) => (
          <li
            key={item}
            onClick={() => handleMenuClick(item)}
            className={`px-6 py-3 cursor-pointer text-center md:text-left ${
              activeMenu === item
                ? "bg-gray-200 font-semibold"
                : "hover:bg-gray-100"
            }`}
          >
            {item}
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-2 mt-6 mx-6">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
        <button
          onClick={handleDeactivate}
          className="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-800"
        >
          Deactivate Account
        </button>
      </div>
    </div>
  );
};

export default AccountSidebar;
