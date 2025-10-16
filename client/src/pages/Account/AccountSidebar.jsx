import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaBook,
  FaCreditCard,
  FaStar,
  FaQuestionCircle,
  FaBell,
  FaChevronRight,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccountProfile } from "../../redux/accountSlice";

const menuItems = [
  { label: "My Account", icon: <FaUser /> },
  { label: "My Bookings", icon: <FaBook /> },
  { label: "Payments", icon: <FaCreditCard /> },
  { label: "My rating & reviews", icon: <FaStar /> },
  { label: "Help Center", icon: <FaQuestionCircle /> },
  { label: "All notification", icon: <FaBell /> },
];

const AccountSidebar = ({
  activeMenu,
  handleMenuClick,
  handleLogout,
  handleDeactivate,
}) => {
  const [helpOpen, setHelpOpen] = useState(false);

  const dispatch = useDispatch();
  const { accountData, loading } = useSelector((state) => state.account);

  useEffect(() => {
    dispatch(fetchAccountProfile());
  }, [dispatch]);

  // Safely extract name and image
  const name = accountData?.name || "User";
  const rawImage = accountData?.image;

  // Automatically fix image URL if it's relative
  const image = rawImage
    ? rawImage.startsWith("http")
      ? rawImage
      : `https://apnalabour.onrender.com/${rawImage}`
    : null;

  const handleItemClick = (label) => {
    if (label === "Help Center") {
      setHelpOpen(!helpOpen);
      handleMenuClick(label);
    } else {
      setHelpOpen(false);
      handleMenuClick(label);
    }
  };

  const handleSubItemClick = (topic) => {
    handleMenuClick(topic);
  };

  return (
    <div className="w-full md:w-64 bg-white shadow-md flex flex-col h-screen">
      {/* Top: Profile */}
      <div className="p-6 flex flex-col items-center border-b border-gray-200">
        <div className="w-20 h-20 rounded-full overflow-hidden mb-4 bg-gray-300 flex items-center justify-center">
          {loading ? (
            <span className="text-gray-500 text-sm">Loading...</span>
          ) : image ? (
            <img
              src={image}
              alt="profile"
              className="w-20 h-20 object-cover rounded-full"
              onError={(e) => (e.target.src = "/default-avatar.png")} // fallback
            />
          ) : (
            <span className="text-2xl font-bold text-white bg-blue-700 w-full h-full flex items-center justify-center">
              {name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <h2 className="font-bold text-lg text-center">Hello {name}</h2>
      </div>

      {/* Menu */}
      <ul className="flex-1 mt-4 overflow-y-auto">
        {menuItems.map((item) => (
          <React.Fragment key={item.label}>
            <li
              onClick={() => handleItemClick(item.label)}
              className={`flex items-center justify-between px-6 py-3 cursor-pointer ${
                activeMenu === item.label
                  ? "bg-blue-900 text-white font-semibold"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center">
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </div>
              {item.label === "Help Center" && (
                <FaChevronRight
                  className={`transition-transform ${
                    helpOpen ? "rotate-90" : ""
                  }`}
                />
              )}
            </li>

            {/* Help Center Dropdown */}
            {item.label === "Help Center" && helpOpen && (
              <div className="ml-10 bg-gray-50 border-l border-gray-200 p-3">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">
                  Helping Topics
                </h4>
                <ul>
                  {[
                    "Service related",
                    "Refunds related",
                    "Cancellation related",
                  ].map((subItem) => (
                    <li
                      key={subItem}
                      onClick={() => handleSubItemClick(subItem)}
                      className={`py-2 px-4 cursor-pointer text-sm rounded-md mb-1 ${
                        activeMenu === subItem
                          ? "bg-blue-800 text-white font-semibold"
                          : "text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {subItem}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </React.Fragment>
        ))}
      </ul>

      {/* Bottom Buttons */}
      <div className="p-6 border-t border-gray-200 flex flex-col gap-2">
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
