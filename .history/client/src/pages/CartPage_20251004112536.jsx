```jsx
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

  // Login flow state
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [emailMobile, setEmailMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState("");
  const [step, setStep] = useState("login"); // login → otp → address

  // Address form state
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

  // ✅ Fetch cart
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

  // ✅ Login → send OTP
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

  // ✅ Verify OTP
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
      setStep("address");
      setOtp("");
      fetchCart();
    } catch (err) {
      toast.error(err.message || "OTP verification failed");
    }
  };

  // ✅ Save address
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
      setShowLoginForm(false);
      setStep("login");
    } catch (err) {
      toast.error(err.message || "Failed to save address");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row p-4 lg:p-10">
      {/* Left Section: Login / OTP / Address */}
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
                <div className="flex flex-col space-y-4 mt-6">
                  <input
                    type="text"
                    placeholder="Mobile Number"
                    value={emailMobile}
                    onChange={(e) => setEmailMobile(e.target.value)}
                    className="border-b border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-500"
                  />
                  <p className="text-sm">
                    By Continuing you agree to the Terms of Services & Privacy Policy.
                  </p>
                  <button
                    className="bg-black text-white px-4 py-2 rounded-md w-full"
                    onClick={handleLogin}
                  >
                    Send OTP
                  </button>
                </div>
              </>
            )}

            {step === "otp" && (
              <>
                <h2 className="text-lg mb-6 text-left">Verify OTP</h2>
                <div className="flex flex-col space-y-4 mt-6">
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="border-b border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    className="bg-black text-white px-4 py-2 rounded-md w-full"
                    onClick={handleVerifyOtp}
                  >
                    Verify OTP
                  </button>
                </div>
              </>
            )}

            {step === "address" && (
              <>
                <h2 className="text-lg mb-4 text-left">Register Address</h2>
                <div className="flex flex-col space-y-3 mt-4">
                  {Object.keys(addressData).map((key) => (
                    <input
                      key={key}
                      type="text"
                      placeholder={key}
                      value={addressData[key]}
                      onChange={(e) =>
                        setAddressData({ ...addressData, [key]: e.target.value })
                      }
                      className="border-b border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                  ))}
                  <button
                    className="bg-black text-white px-4 py-2 rounded-md w-full mt-2"
                    onClick={handleAddressSubmit}
                  >
                    Save Address
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Right Section: Cart */}
      <div className="w-full lg:w-1/2 p-4 lg:p-10 bg-[#CECECE26]">
        <h2 className="text-lg font-semibold mb-4">Your Cart</h2>
        {loading && <p>Loading cart items...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && cartItems.length === 0 && <p>Your cart is empty.</p>}

        {!loading && !error && cartItems.length > 0 && (
          <>
            <div className="bg-white rounded-xl shadow-sm border p-4 mb-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center mb-3 w-full flex-wrap"
                >
                  <span className="w-full sm:w-1/2 mb-2 sm:mb-0">
                    {item.unit?.title || "Unknown Service"}
                  </span>
                  <div className="flex w-full sm:w-1/2 justify-between items-center">
                    <span className="text-sm font-medium">₹{item.price || 0}</span>
                  </div>
                </div>
              ))}
              <button className="text-blue-500 text-sm">Add Another Service</button>
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

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default CartPage;

