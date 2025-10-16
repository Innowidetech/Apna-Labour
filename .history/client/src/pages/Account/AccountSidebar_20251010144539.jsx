import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Sidebar menu items with labels and paths
const menuItems = [
  { label: "My Account", path: "/account" },
  { label: "My Bookings", path: "/account/bookings" },
  { label: "Payments", path: "/account/payments" },
  { label: "My rating & reviews", path: "/account/reviews" },
  { label: "Help Center", path: "/account/help" },
  { label: "All notification", path: "/account/notifications" },
];

const AccountSidebar = ({
  displayData = {}, // Prevent undefined errors
  handleLogout,
  handleDeactivate,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const name = displayData?.name || "User";
  const image = displayData?.image;

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="w-full md:w-64 bg-gray-100 flex-shrink-0 ml-2 min-h-screen">
      {/* Profile section */}
      <div className="p-6 flex flex-col items-center">
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
            <span className="text-2xl font-bold text-white bg-gray-400 w-full h-full flex items-center justify-center rounded-full">
              {name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <h2 className="font-bold text-lg mb-6 text-center">Hello {name}</h2>
      </div>

      {/* Menu items */}
      <ul className="text-gray-600">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <li
              key={item.label}
              onClick={() => handleNavigate(item.path)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleNavigate(item.path);
                }
              }}
              tabIndex={0}
              role="button"
              className={`px-6 py-3 cursor-pointer text-center md:text-left ${
                isActive
                  ? "bg-gray-300 font-semibold text-black"
                  : "hover:bg-gray-200"
              }`}
            >
              {item.label}
            </li>
          );
        })}
      </ul>

      {/* Logout / Deactivate */}
      <div className="flex flex-col gap-2 mt-6 mx-6">
        {handleLogout && (
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        )}
        {handleDeactivate && (
          <button
            onClick={handleDeactivate}
            className="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-800"
          >
            Deactivate Account
          </button>
        )}
      </div>
    </div>
  );
};

export default AccountSidebar;
