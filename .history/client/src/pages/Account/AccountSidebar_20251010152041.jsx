import React from "react";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { label: "My Account", path: "/account" },
  { label: "My Bookings", path: "/bookings" },
  { label: "Payments", path: "/account/payments" },
  { label: "My rating & reviews", path: "/account/reviews" },
  { label: "Help Center", path: "/account/help" },
  { label: "All notification", path: "/account/notifications" },
];

const AccountSidebar = ({
  displayData = {},
  handleLogout,
  handleDeactivate,
}) => {
  const name = displayData?.name || "User";
  const image = displayData?.image;
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="w-full md:w-64 bg-gray-100 flex-shrink-0 border-r md:min-h-screen">
      {/* Profile section */}
      <div className="p-4 flex flex-col items-center text-center">
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
        <h2 className="font-bold text-lg mb-4">Hello {name}</h2>
      </div>

      {/* Menu */}
      <ul className="text-gray-700">
        {menuItems.map((item) => (
          <li
            key={item.label}
            onClick={() => handleNavigate(item.path)}
            className="px-6 py-3 cursor-pointer text-center md:text-left hover:bg-gray-200 transition duration-200"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleNavigate(item.path);
              }
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
  );
};

export default AccountSidebar;
