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
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccountProfile } from "../../redux/accountSlice";
import { fetchFilteredBookings } from "../../redux/bookingSlice";

const menuItems = [
  { label: "My Account", path: "/account", icon: <FaUser /> },
  { label: "My Bookings", path: "/bookings", icon: <FaBook /> },
  { label: "Payments", path: "/payments", icon: <FaCreditCard /> },
  { label: "My rating & reviews", path: "/reviews", icon: <FaStar /> },
  { label: "Help Center", path: "/help", icon: <FaQuestionCircle /> },
  { label: "All notification", path: "/notifications", icon: <FaBell /> },
];

const AccountSidebar = ({ handleLogout, handleDeactivate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [filterValue, setFilterValue] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { accountData, loading } = useSelector((state) => state.account);

  useEffect(() => {
    dispatch(fetchAccountProfile());
  }, [dispatch]);

  const name = accountData?.name || "User";
  const rawImage = accountData?.image || accountData?.profile?.image;
  const image = rawImage
    ? rawImage.startsWith("http")
      ? rawImage
      : `https://apnalabour.onrender.com/${rawImage}`
    : null;

  const isBookingsPage = location.pathname === "/bookings";

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilterValue(value);
    if (value) dispatch(fetchFilteredBookings(value));
  };

  const handleHelpToggle = () => {
    setHelpOpen(!helpOpen);
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex justify-between items-center bg-gray-100 p-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center">
            {image ? (
              <img src={image} alt="profile" className="w-full h-full object-cover" />
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
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r overflow-y-auto transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:inset-auto md:flex-shrink-0`}
      >
        {/* Profile */}
        <div className="p-4 flex flex-col items-center text-center border-b">
          <div className="w-20 h-20 rounded-full bg-gray-300 mb-3 flex items-center justify-center overflow-hidden">
            {loading ? (
              <span className="text-gray-500 text-sm">Loading...</span>
            ) : image ? (
              <img src={image} alt="profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-2xl font-bold text-white bg-blue-700 w-full h-full flex items-center justify-center">
                {name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <h2 className="font-bold text-lg">{name}</h2>
        </div>

        {/* Menu */}
        <ul className="flex flex-col text-gray-700">
          {menuItems.map((item) => (
            <React.Fragment key={item.label}>
              <li
                onClick={() =>
                  item.label === "Help Center"
                    ? handleHelpToggle()
                    : handleNavigate(item.path)
                }
                className={`flex items-center justify-between px-6 py-3 cursor-pointer ${
                  location.pathname === item.path
                    ? "bg-blue-900 text-white font-semibold"
                    : "hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center space-x-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.label === "Help Center" && (
                  <FaChevronRight
                    className={`transition-transform ${helpOpen ? "rotate-90" : ""}`}
                  />
                )}
              </li>

              {item.label === "Help Center" && helpOpen && (
                <div className="ml-10 bg-gray-50 border-l border-gray-200 p-3">
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">
                    Helping Topics
                  </h4>
                  {["Service related", "Refunds related", "Cancellation related"].map(
                    (subItem) => (
                      <div
                        key={subItem}
                        onClick={() => handleNavigate(`/help/${subItem.toLowerCase()}`)}
                        className="py-2 px-4 cursor-pointer text-sm rounded-md mb-1 hover:bg-gray-200"
                      >
                        {subItem}
                      </div>
                    )
                  )}
                </div>
              )}
            </React.Fragment>
          ))}
        </ul>

        {/* Filter Dropdown (only for Bookings page) */}
        {isBookingsPage && (
          <div className="px-6 mt-4">
            <label
              htmlFor="bookingFilter"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
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
          {handleLogout && (
            <button
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
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

      {/* Mobile Overlay */}
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
