// src/pages/CartPage.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  fetchCart,
  removeCartItem,
  saveAddress,
  bookSlot,
  loginUser,
  verifyOtp,
} from "../redux/cartSlice"; // Adjust path as needed

const CartPage = () => {
  const dispatch = useDispatch();

  // ✅ Safely access cart state
  const {
    items: cartItems = [],
    loading = false,
    error = null,
    addressSaved = false,
    slotBooked = false,
    userId = "",
    step = "login",
  } = useSelector((state) => state.cart || {}); // fallback to empty object if undefined

  const [showLoginForm, setShowLoginForm] = useState(false);
  const [emailMobile, setEmailMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [slotModalOpen, setSlotModalOpen] = useState(false);
  const [slotDate, setSlotDate] = useState("");
  const [slotTime, setSlotTime] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);

  const [addressData, setAddressData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    "address.HNo": "",
    "address.street": "",
    "address.area": "",
    "address.landmark": "",
    "address.townCity": "",
    "address.pincode": "",
    "address.state": "",
  });

  const totalPrice = cartItems.reduce((acc, i) => acc + i.price, 0);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleDelete = (unitId) => {
    dispatch(removeCartItem(unitId))
      .unwrap()
      .then(() => toast.success("Item removed successfully"))
      .catch((err) => toast.error(err));
  };

  const handleLogin = () => {
    if (!emailMobile.trim()) {
      toast.error("Please enter your mobile number");
      return;
    }
    dispatch(loginUser(emailMobile))
      .unwrap()
      .then(() => toast.success("OTP sent successfully!"))
      .catch((err) => toast.error(err));
  };

  const handleVerifyOtp = () => {
    if (!otp.trim()) {
      toast.error("Please enter the OTP");
      return;
    }
    dispatch(verifyOtp({ userId, otp }))
      .unwrap()
      .then(() => {
        toast.success("OTP verified, login successful!");
        dispatch(fetchCart());
      })
      .catch((err) => toast.error(err));
  };

  const handleAddressSubmit = () => {
    dispatch(saveAddress(addressData))
      .unwrap()
      .then(() => {
        toast.success("Address saved successfully!");
        setAddressModalOpen(false);
      })
      .catch((err) => toast.error(err));
  };

  const handleBookSlot = () => {
    if (!slotDate || !slotTime) {
      toast.error("Please select date and time slot");
      return;
    }

    setBookingLoading(true);
    dispatch(bookSlot({ bookingDate: slotDate, timeSlot: slotTime }))
      .unwrap()
      .then(() => {
        toast.success("Slot booked successfully!");
        setSlotModalOpen(false);
      })
      .catch((err) => toast.error(err))
      .finally(() => setBookingLoading(false));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row p-4 lg:p-10 relative">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 flex flex-col items-center pt-10 pb-6 px-4 lg:px-10">
        <h1 className="text-2xl font-cursive mb-6">Apna Labour</h1>

        {!showLoginForm ? (
          <div className="p-2 w-full max-w-xl text-left flex items-center gap-2 flex-wrap border border-gray-200 rounded-lg">
            <p className="mb-0 text-base flex-1">
              Login to book the service from your existing bag.
            </p>
            <button
              className="bg-black text-white px-4 py-2 rounded-md"
              onClick={() => setShowLoginForm(true)}
            >
              LOGIN NOW
            </button>
          </div>
        ) : (
          <div className="p-6 w-full max-w-sm">
            {step === "login" && (
              <>
                <h2 className="text-lg mb-6 text-left">Login / Signup</h2>
                <input
                  type="text"
                  placeholder="Mobile Number"
                  value={emailMobile}
                  onChange={(e) => setEmailMobile(e.target.value)}
                  className="border-b border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-500 w-full"
                />
                <button
                  className="bg-black text-white px-4 py-2 rounded-md w-full mt-4"
                  onClick={handleLogin}
                >
                  Send OTP
                </button>
              </>
            )}

            {step === "otp" && (
              <>
                <h2 className="text-lg mb-6 text-left">Verify OTP</h2>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="border-b border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-500 w-full"
                />
                <button
                  className="bg-black text-white px-4 py-2 rounded-md w-full mt-4"
                  onClick={handleVerifyOtp}
                >
                  Verify OTP
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 px-4 lg:px-10 pb-6">
        <h2 className="text-lg font-bold mb-4">Your Bag</h2>
        {loading && <p>Loading cart items...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && cartItems.length === 0 && (
          <p>Your cart is empty.</p>
        )}
        <ul>
          {cartItems.map((item) => (
            <li
              key={item._id}
              className="flex justify-between items-center py-2 border-b"
            >
              <div>
                <h3 className="text-sm font-semibold">{item.serviceTitle}</h3>
                <p className="text-sm text-gray-600">{item.area}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">₹{item.price}</p>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-xs text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>

        {cartItems.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-semibold mb-2">Total: ₹{totalPrice}</h3>
            {!addressSaved ? (
              <button
                onClick={() => setAddressModalOpen(true)}
                className="bg-black text-white px-4 py-2 rounded-md"
              >
                Add Address
              </button>
            ) : !slotBooked ? (
              <button
                onClick={() => setSlotModalOpen(true)}
                className="bg-black text-white px-4 py-2 rounded-md"
              >
                Book Slot
              </button>
            ) : (
              <p className="text-green-500 mt-4">Booking Confirmed!</p>
            )}
          </div>
        )}
      </div>

      {/* Address Modal */}
      {addressModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Enter Address Details</h2>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(addressData).map((key) => (
                <input
                  key={key}
                  type="text"
                  name={key}
                  placeholder={key.replace("address.", "")}
                  value={addressData[key]}
                  onChange={(e) =>
                    setAddressData((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                  className="border px-2 py-1"
                />
              ))}
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setAddressModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-black text-white rounded"
                onClick={handleAddressSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Slot Booking Modal */}
      {slotModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Book a Slot</h2>
            <input
              type="date"
              value={slotDate}
              onChange={(e) => setSlotDate(e.target.value)}
              className="border px-2 py-1 w-full mb-2"
            />
            <select
              value={slotTime}
              onChange={(e) => setSlotTime(e.target.value)}
              className="border px-2 py-1 w-full mb-4"
            >
              <option value="">Select Time Slot</option>
              <option value="10am-12pm">10am - 12pm</option>
              <option value="12pm-2pm">12pm - 2pm</option>
              <option value="2pm-4pm">2pm - 4pm</option>
              <option value="4pm-6pm">4pm - 6pm</option>
            </select>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setSlotModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-black text-white rounded"
                onClick={handleBookSlot}
                disabled={bookingLoading}
              >
                {bookingLoading ? "Booking..." : "Book Slot"}
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default CartPage;
