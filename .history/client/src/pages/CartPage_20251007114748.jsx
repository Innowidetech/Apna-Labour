import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartPage = () => {
  const location = useLocation();
  const initialCart = location.state?.cartData || null;

  const [cartItems, setCartItems] = useState(initialCart?.items || []);
  const [totalPrice, setTotalPrice] = useState(
    initialCart ? initialCart.items.reduce((acc, i) => acc + i.price, 0) : 0
  );
  const [loading, setLoading] = useState(!initialCart);
  const [error, setError] = useState(null);
 // Auth/Login states
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [emailMobile, setEmailMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState("");
  const [step, setStep] = useState("login"); // "login", "otp", "next"
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [addressSaved, setAddressSaved] = useState(false);
  const [slotDate, setSlotDate] = useState("");
  const [slotTime, setSlotTime] = useState("");
  const [slotBooked, setSlotBooked] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [slotModalOpen, setSlotModalOpen] = useState(false);
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

  const fetchCart = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      const guestId = localStorage.getItem("guestId");

      const res = await fetch("https://apnalabour.onrender.com/api/customer/cart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(guestId && { "x-guest-id": guestId }),
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);

      if (data.guestId) localStorage.setItem("guestId", data.guestId);

      const items = Array.isArray(data.items) ? data.items : [];
      setCartItems(items);
      setTotalPrice(items.reduce((acc, i) => acc + i.price, 0));
    } catch (err) {
      setError(err.message || "Failed to fetch cart items.");
      toast.error(err.message || "Failed to fetch cart items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialCart) {
      fetchCart();
    }
  }, []);
  const handleDelete = async (unitId) => {
    try {
      const token = localStorage.getItem("token");
      const guestId = localStorage.getItem("guestId");

      const res = await fetch(
        `https://apnalabour.onrender.com/api/customer/cart/remove/${unitId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            ...(guestId && { "x-guest-id": guestId }),
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);
      toast.success("Item removed successfully");
      fetchCart();
    } catch (err) {
      toast.error(err.message || "Failed to remove item");
    }
  };

  const handleLogin = async () => {
    if (!emailMobile.trim()) {
      toast.error("Please enter your mobile number");
      return;
    }
    try {
      const res = await fetch("https://apnalabour.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobileNumber: emailMobile }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);

      if (data.userId) {
        setUserId(data.userId);
        setStep("otp");
      }

      toast.success("OTP sent successfully!");
    } catch (err) {
      toast.error(err.message || "Login failed");
    }
  };
  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      toast.error("Please enter the OTP");
      return;
    }
    try {
      const res = await fetch("https://apnalabour.onrender.com/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, otp }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);

      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      toast.success("OTP verified, login successful!");
      setStep("next");
      fetchCart();
    } catch (err) {
      toast.error(err.message || "OTP verification failed");
    }
  };

  const handleAddressSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first!");
        return;
      }

      const res = await fetch("https://apnalabour.onrender.com/api/customer/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(addressData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);

      toast.success("Address saved successfully!");
      setAddressModalOpen(false);
      setAddressSaved(true);
    } catch (err) {
      toast.error(err.message || "Failed to save address");
    }
  };
// --- Slot Booking ---
  const handleBookSlot = async () => {
    if (!slotDate || !slotTime) {
      toast.error("Please select date and time slot");
      return;
    }

    try {
      setBookingLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first!");
        return;
      }

      const res = await fetch(
        "https://apnalabour.onrender.com/api/customer/bookings/slot",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            bookingDate: slotDate,
            timeSlot: slotTime,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);

      toast.success("Slot booked successfully!");
      setSlotBooked(true);
    } catch (err) {
      toast.error(err.message || "Failed to book slot");
    } finally {
      setBookingLoading(false);
    }
  };
  const [profileData, setProfileData] = useState(null)
  const [profileLoading, setProfileLoading] = useState(false);
  const handleFetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first!");
        return;
      } setProfileLoading(true);
      const res = await fetch("https://apnalabour.onrender.com/api/customer/profile/name",
        { method: "GET", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, }, });
      const data = await res.json(); if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`); setProfileData(data); toast.success("Profile details fetched successfully!");
    } catch (err) { toast.error(err.message || "Failed to fetch profile details"); } finally { setProfileLoading(false); }
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
          <div className="p-6 w-full max-w-xl">
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
                  className="bg-[#003049] text-white px-4 py-2 rounded-md w-full mt-4"
                  onClick={handleLogin}
                >
                  Continue
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
                  className="bg-[#003049] text-white px-4 py-2 rounded-md w-full mt-4"
                  onClick={handleVerifyOtp}
                >
                  Verify OTP
                </button>
              </>
            )}

            {step === "next" && (
             <>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 w-full max-w-md mx-auto">
                  {/* Header */}
                  <div className="border-b border-gray-100 pb-3 mb-4">
                    <h2 className="text-sm font-medium text-gray-800 mb-1">Send booking details to</h2>
                    <p className="text-gray-600 text-sm">+91- 8098749932</p>
                  </div>

                  {/* Address Section */}
                  <div className="border-b border-gray-100 py-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-gray-500 text-lg">📍</span>
                      <h3 className="text-gray-800 text-sm font-medium">Address</h3>
                    </div>
                    <button
                      className="w-full bg-[#001F3F] text-white py-2 rounded-md font-medium text-sm transition-colors hover:bg-[#002c5c] active:bg-[#003049]"
                      onClick={() => setAddressModalOpen(true)}
                    >
                      Register an address
                    </button>
                  </div>

                  {/* Slot Booking Section */}
                  <div className="border-b border-gray-100 py-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-gray-500 text-lg ]">📅</span>
                      <h3 className="text-gray-800 text-sm font-medium">Slot booking</h3>
                    </div>
                    <button
                      className="w-full bg-[#003049] text-white py-2 rounded-md font-medium text-sm transition-colors active:bg-[#003049] active:text-white"
                      onClick={() => setSlotModalOpen(true)}
                    >
                      Book now
                    </button>
                  </div>

                  {/* Payment Method Section */}
                  <div className="py-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-gray-500 text-lg">💳</span>
                      <h3 className="text-gray-800 text-sm font-medium">Payment method</h3>
                    </div>
               
{addressSaved ? (
  <button
    className="w-full bg-[#003049] text-white py-2 rounded-md font-medium text-sm transition-colors hover:bg-green-700 active:bg-[#003049]"
  >
    Proceed to Payment
  </button>
) : (
  <div>
    <button
      className="w-full text-white py-2 rounded-md font-medium text-sm transition-colors bg-[#003049] hover:bg-[#002c5c] active:bg-[#003049]"
      onClick={handleFetchProfile}
      disabled={profileLoading}
    >
      {profileLoading ? "Loading..." : "Proceed to checkout"}
    </button>

    {profileData && (
      <div className="mt-4 bg-white border rounded-lg p-4 text-sm shadow-sm">
        <h4 className="font-semibold text-gray-800 mb-2">Profile Details</h4>
        <p><span className="font-medium">Name:</span> {profileData.name || "N/A"}</p>
        <p><span className="font-medium">Email:</span> {profileData.email || "N/A"}</p>
        <p><span className="font-medium">Phone:</span> {profileData.phoneNumber || "N/A"}</p>
      </div>
    )}
  </div>
)}

                  </div>
                </div>

                {/* Cancellation Policy */}
                <div className="mt-6 max-w-md mx-auto">
                  <h4 className="text-gray-800 text-sm font-medium mb-2">Cancellation Policy</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Free cancellation if done more than 12hrs before the service or a professional isn’t assigned.
                    A fee will be charged otherwise.
                  </p>
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
                <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs mr-2 ${index === 0 ? "bg-black text-white" : "border border-gray-400"
                  }`}>
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
          {/* Scrollable Modal Container */}
          <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto relative p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Register Address</h2>

            {/* Close Button */}
            <button
              className="absolute top-3 right-4 text-gray-600 hover:text-black text-2xl"
              onClick={() => setAddressModalOpen(false)}
              aria-label="Close"
            >
              &times;
            </button>

            {/* Modal Content */}
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

      {slotModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto relative p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Book Slot</h2>

            {/* Close Button */}
            <button
              className="absolute top-3 right-4 text-gray-600 hover:text-black text-2xl"
              onClick={() => setSlotModalOpen(false)}
              aria-label="Close"
            >
              &times;
            </button>

            {/* Slot selection */}
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
                onClick={async () => {
                  await handleBookSlot();
                  setSlotModalOpen(false);
                }}
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
