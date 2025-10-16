<<<<<<< HEAD
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchFilteredBookings } from "../../redux/bookingSlice";

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
  const location = useLocation();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [filterValue, setFilterValue] = useState("");

  // Fetch profile data
  const accountData = useSelector((state) => state.account?.accountData);
  const name = accountData?.name || "User";
  const image = accountData?.image || accountData?.profile?.image;

  // Detect if user is on Bookings page
  const isBookingsPage = location.pathname === "/bookings";

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilterValue(value);
    if (value) {
      dispatch(fetchFilteredBookings(value));
    }
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
          md:translate-x-0 md:static md:inset-auto md:flex-shrink-0
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

        {/* Menu Items */}
        <ul className="flex flex-col text-gray-700">
          {menuItems.map((item) => (
            <li
              key={item.label}
              onClick={() => handleNavigate(item.path)}
              className={`px-6 py-3 cursor-pointer hover:bg-gray-200 transition duration-200 text-center md:text-left ${
                location.pathname === item.path ? "bg-gray-300 font-semibold" : ""
              }`}
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

        {/* ✅ Filter Dropdown (only on Bookings page) */}
        {isBookingsPage && (
          <div className="px-6 mt-4">
            <label htmlFor="bookingFilter" className="block text-sm font-medium text-gray-700 mb-1">
              Filter Bookings
            </label>
            <select
              id="bookingFilter"
              value={filterValue}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Filter</option>
              <option value="2025">2025</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col gap-2 mt-6 px-6 pb-6">
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
            onClick={handleLogout}
          >
            Logout
          </button>
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

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-25 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
=======
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
>>>>>>> dfc4e7ea4fc70c2e442bf52a722f1f259e044b66
  );
};

export default AccountSidebar;
<<<<<<< HEAD


