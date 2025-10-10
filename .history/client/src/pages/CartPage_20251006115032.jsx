import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  fetchCart,
  removeCartItem,
  saveAddress,
  bookSlot,
  loginUser,
  verifyOtp,
} from "../redux/cartSlice"; // adjust path

const CartPage = () => {
  const dispatch = useDispatch();
  const {
    items: cartItems,
    loading,
    error,
    addressSaved,
    slotBooked,
    userId,
    step,
  } = useSelector((state) => state.cart);

  // Local states for UI
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

  const handleBookSlot = async () => {
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
                <p className="text-sm mt-4">
                  By Continuing you’ve agree to the Terms of Services & Privacy Policy.
                </p>
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

            {step === "next" && (
              <>
                <h2 className="text-lg mb-6 text-left">Complete Booking</h2>
                <div className="flex flex-col gap-4">
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                    onClick={() => setAddressModalOpen(true)}
                  >
                    Register Address
                  </button>

                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    onClick={() => setSlotModalOpen(true)}
                  >
                    📅 Book Slot
                  </button>

                  {addressSaved && (
                    <button className="bg-green-600 text-white px-4 py-2 rounded-md mt-4">
                      Proceed to Payment
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 p-4 lg:p-10 bg-[#CECECE26]">
        {/* Progress Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 text-sm text-gray-600 space-y-2 sm:space-y-0">
          {["Cart", "Review", "Payment"].map((stepLabel, index) => (
            <React.Fragment key={index}>
              <div className="flex items-center">
                <span
                  className={`w-6 h-6 flex items-center justify-center rounded-full text-xs mr-2 ${
                    index === 0 ? "bg-black text-white" : "border border-gray-400"
                  }`}
                >
                  {index + 1}
                </span>
                {stepLabel}
              </div>
              {index < 2 && <div className="hidden sm:block flex-1 h-px bg-gray-300 mx-2"></div>}
            </React.Fragment>
          ))}
        </div>

        {loading && <p>Loading cart items...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && cartItems.length === 0 && <p>Your cart is empty.</p>}

        {!loading && !error && cartItems.length > 0 && (
          <>
            <div className="bg-white rounded-xl shadow-sm border p-4 mb-4">
              {cartItems.map((item) => {
                const unitObj = typeof item.unit === "object" ? item.unit : {};
                const title = unitObj.title || "Unknown Service";
                const price = item.price || 0;

                return (
                  <div
                    key={item._id}
                    className="flex justify-between items-center mb-3 w-full flex-wrap"
                  >
                    <span className="w-full sm:w-1/2 mb-2 sm:mb-0">{title}</span>
                    <div className="flex w-full sm:w-1/2 justify-between items-center">
                      <button
                        onClick={() => handleDelete(item.unit?.id || item.unit)}
                        className="text-red-500 hover:text-red-700"
                      >
                        🗑
                      </button>
                      <span className="text-sm font-medium">₹{price}</span>
                    </div>
                  </div>
                );
              })}
              <button className="text-blue-500 text-sm">Add Another Service</button>
            </div>

            <div className="bg-green-50 text-green-700 border border-green-200 rounded-lg p-3 mb-4 text-sm">
              Don’t miss out <span className="font-semibold">login</span> to earn and redeem rewards
            </div>

            <div className="bg-white rounded-xl shadow-sm border p-4">
              <h2 className="font-semibold mb-3">Payment Summary</h2>
              <div className="flex justify-between mb-1 text-sm">
                <span>Item Total</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between mb-1 text-sm">
                <span>Taxes & Fee</span>
                <span>₹189</span>
              </div>
              <div className="flex justify-between font-semibold border-t pt-2 mt-2 text-sm">
                <span>Total amount</span>
                <span>₹{totalPrice + 189}</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-3">
                <span>Amount to pay</span>
                <span>₹{totalPrice + 189}</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Address Modal */}
      {addressModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto relative p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Register Address</h2>
            <button
              className="absolute top-3 right-4 text-gray-600 hover:text-black text-2xl"
              onClick={() => setAddressModalOpen(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <div className="space-y-3">
              {Object.keys(addressData).map((key) => (
                <input
                  key={key}
                  type="text"
                  placeholder={key}
                  value={addressData[key]}
                  onChange={(e) =>
                    setAddressData({ ...addressData, [key]: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded"
                />
              ))}
              <button
                className="bg-black text-white px-4 py-2 rounded-md w-full mt-2"
                onClick={handleAddressSubmit}
              >
                Save Address
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Slot Modal */}
      {slotModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto relative p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Book Slot</h2>
            <button
              className="absolute top-3 right-4 text-gray-600 hover:text-black text-2xl"
              onClick={() => setSlotModalOpen(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <div className="flex flex-col gap-3">
              <input
                type="date"
                value={slotDate}
                onChange={(e) => setSlotDate(e.target.value)}
                className="border px-3 py-2 rounded-md w-full"
              />
              <select
                value={slotTime}
                onChange={(e) => setSlotTime(e.target.value)}
                className="border px-3 py-2 rounded-md w-full"
              >
                <option value="">Select Time Slot</option>
                <option value="9:00 AM">9:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="12:00 PM">12:00 PM</option>
              </select>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md mt-2"
                onClick={handleBookSlot}
                disabled={bookingLoading}
              >
                {bookingLoading ? "Booking..." : "Book Slot"}
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default CartPage;
