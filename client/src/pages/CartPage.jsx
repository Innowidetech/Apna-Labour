import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartPage = () => {
  const location = useLocation();
const initialCart =
  location.state?.cartData ||
  JSON.parse(localStorage.getItem("cartData") || "null");

  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState(initialCart?.items || []);
  const [totalPrice, setTotalPrice] = useState(
    initialCart
      ? initialCart.items.reduce((acc, i) => acc + (i.price ?? i.total ?? 0), 0)
      : 0
  );
  const [loading, setLoading] = useState(!initialCart);
  const [error, setError] = useState(null);

  // 🆕 Service Tip State
  const [selectedTip, setSelectedTip] = useState(0);
  const tipOptions = [10, 40, 55, 75];

  // Auth/Login states
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [emailMobile, setEmailMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState("");
  const [step, setStep] = useState("login");

  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [addressSaved, setAddressSaved] = useState(false);
  const [savedAddress, setSavedAddress] = useState(null);
  const [slotDate, setSlotDate] = useState("");
  const [slotTime, setSlotTime] = useState("");
  const [slotBooked, setSlotBooked] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [slotModalOpen, setSlotModalOpen] = useState(false);
  const [taxAmount, setTaxAmount] = useState(0);
const [totalAmount, setTotalAmount] = useState(0);
const [bookedSlot, setBookedSlot] = useState(null);



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


    useEffect(() => {
    const tax = Math.round(totalPrice * 0.18); // 18% GST
    const tip = Number(selectedTip) || 0;
    const total = totalPrice + tax + tip;
    setTaxAmount(tax);
    setTotalAmount(total);
  }, [totalPrice, selectedTip]);

  // helper to parse possibly-formatted price strings to numbers
  const parseAmount = (val) => {
    if (val === undefined || val === null) return 0;
    if (typeof val === "number") return val;
    const cleaned = String(val).replace(/[^0-9.\-]/g, "");
    const parsed = parseFloat(cleaned);
    return Number.isFinite(parsed) ? parsed : 0;
  };

  // safe JSON parse helper: returns an object even if the response isn't valid JSON
  const safeParseJson = async (res) => {
    try {
      const text = await res.text();
      try {
        return JSON.parse(text);
      } catch {
        // if not JSON, return object with raw text
        return { message: text || "", rawText: text };
      }
    } catch (e) {
      return { message: "" };
    }
  };

  // 🛒 Fetch Cart (robust)
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const guestId = localStorage.getItem("guestId");

      if (!token && !guestId) {
        setCartItems([]);
        setTotalPrice(0);
        return;
      }

      setLoading(true);
      setError(null);

      const res = await fetch("https://apnalabour.onrender.com/api/customer/cart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(guestId && { "x-guest-id": guestId }),
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      const data = await safeParseJson(res);
      if (!res.ok) {
        const msg = data?.message || data?.error || `HTTP ${res.status}`;
        throw new Error(msg);
      }

      if (data.guestId) localStorage.setItem("guestId", data.guestId);

      const items = Array.isArray(data.items) ? data.items : [];

      // Normalize prices to numbers to avoid NaN issues later
      const normalizedItems = items.map((it) => {
        const price = parseAmount(it.price ?? it.total ?? 0);
        return { ...it, price };
      });

      setCartItems(normalizedItems);

      if (!token && guestId) {
        localStorage.setItem("guestCartBackup", JSON.stringify(normalizedItems));
      }

      setTotalPrice(
        normalizedItems.reduce((acc, i) => acc + (Number(i.price) || 0), 0)
      );
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
    } else {
      // if initialCart passed, normalize its prices too
      const normalized = (initialCart.items || []).map((it) => ({
        ...it,
        price: parseAmount(it.price ?? it.total ?? 0),
      }));
      setCartItems(normalized);
      setTotalPrice(normalized.reduce((a, i) => a + Number(i.price || 0), 0));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 🗑 Delete Item
  const handleDelete = async (cartItemId) => {
    try {
      const token = localStorage.getItem("token");
      const guestId = localStorage.getItem("guestId");

      const res = await fetch(
        `https://apnalabour.onrender.com/api/customer/cart/remove/${cartItemId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            ...(guestId && { "x-guest-id": guestId }),
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      const data = await safeParseJson(res);
      if (!res.ok) throw new Error(data?.message || data?.error || `HTTP ${res.status}`);

      toast.success("Item removed successfully");
      await fetchCart();
    } catch (err) {
      toast.error(err.message || "Failed to remove item");
    }
  };

  // 🔐 Login
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

      const data = await safeParseJson(res);
      if (!res.ok) throw new Error(data?.message || data?.error || `HTTP ${res.status}`);

      if (data.userId) {
        setUserId(data.userId);
        setStep("otp");
      }

      toast.success("OTP sent successfully!");
    } catch (err) {
      toast.error(err.message || "Login failed");
    }
  };

  // 🔑 Verify OTP
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

      const data = await safeParseJson(res);
      if (!res.ok) throw new Error(data?.message || data?.error || `HTTP ${res.status}`);

      if (data.token) {
        localStorage.setItem("token", data.token);
        toast.success("OTP verified, login successful!");
        setStep("next");

        const guestCart = JSON.parse(localStorage.getItem("guestCartBackup")) || [];
        if (guestCart.length > 0) {
          for (const item of guestCart) {
            try {
              await fetch("https://apnalabour.onrender.com/api/customer/cart/add", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${data.token}`,
                },
                body: JSON.stringify({
                  unitId: item.unit?._id || item.unitId,
                  quantity: item.quantity || 1,
                }),
              });
            } catch (e) {
              console.error("Failed to re-add item:", e);
            }
          }
        }

        localStorage.removeItem("guestCartBackup");
        localStorage.removeItem("guestId");

        await fetchCart();
      }
    } catch (err) {
      toast.error(err.message || "OTP verification failed");
    }
  };

  // 📍 Save Address
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

      const data = await safeParseJson(res);
      if (!res.ok) throw new Error(data?.message || data?.error || `HTTP ${res.status}`);

      toast.success("Address saved successfully!");
      setAddressModalOpen(false);
      setAddressSaved(true);
      setSavedAddress(addressData);
    } catch (err) {
      toast.error(err.message || "Failed to save address");
    }
  };

  // 📅 Slot Booking
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

    const data = await safeParseJson(res);
    if (!res.ok) throw new Error(data?.message || data?.error || `HTTP ${res.status}`);

    toast.success("Slot booked successfully!");
    setSlotBooked(true);
    setBookedSlot({ date: slotDate, time: slotTime }); // 🆕 Store booked slot
  } catch (err) {
    toast.error(err.message || "Failed to book slot");
  } finally {
    setBookingLoading(false);
  }
};

 const handleCreateBooking = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first!");
      return;
    }

    const subtotal = totalPrice;
    const tip = Number(selectedTip) || 0;

    const res = await fetch(
      "https://apnalabour.onrender.com/api/customer/bookings/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          subtotal,
          tax: taxAmount,
          tip,
          totalAmount,
        }),
      }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to create booking");

    toast.success("Booking created successfully!");

    const profileRes = await fetch("https://apnalabour.onrender.com/api/customer/profile", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const profileData = await profileRes.json();

    navigate("/checkout", {
      state: {
        profileData: {
          user: profileData.user || null,
          address: savedAddress || addressData || null,
          booking: {
            bookingId: data.bookingId,
            subtotal: data.subtotal,
            tax: data.tax,
            tip: data.tip,
            totalAmount: data.totalAmount,
          },
        },
      },
    });
  } catch (err) {
    console.error("handleCreateBooking error:", err);
    toast.error(err.message || "Failed to create booking");
  }
};




  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row p-4 lg:p-10 relative">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 flex flex-col items-center pt-10 pb-6 px-4 lg:px-10">
        <h1 className="text-2xl font-cursive mb-6">Apna Labour</h1>

        {/* Login Section */}
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
                  <div className="border-b border-gray-100 pb-3 mb-4">
                    <h2 className="text-sm font-medium text-gray-800 mb-1">
                      Send booking details to
                    </h2>
                    <p className="text-gray-600 text-sm">+91-{emailMobile}</p>
                  </div>

                  {/* Address */}
                  <div className="border-b border-gray-100 py-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-gray-500 text-lg">📍</span>
                      <h3 className="text-gray-800 text-sm font-medium">Address</h3>
                    </div>
                    {addressSaved && savedAddress ? (
                      <div className="bg-gray-100 p-3 rounded-md text-sm text-gray-700">
                        <p>{savedAddress.name}</p>
                        <p>
                          {savedAddress["address.HNo"]}, {savedAddress["address.street"]},{" "}
                          {savedAddress["address.area"]}
                        </p>
                        <p>
                          {savedAddress["address.townCity"]}, {savedAddress["address.state"]} -{" "}
                          {savedAddress["address.pincode"]}
                        </p>
                        <p>📞 {savedAddress.phoneNumber}</p>
                        <button
                          className="mt-2 bg-[#001F3F] text-white py-1 px-3 rounded-md text-sm"
                          onClick={() => setAddressModalOpen(true)}
                        >
                          Edit Address
                        </button>
                      </div>
                    ) : (
                      <button
                        className="w-full bg-[#001F3F] text-white py-2 rounded-md font-medium text-sm"
                        onClick={() => setAddressModalOpen(true)}
                      >
                        Register an address
                      </button>
                    )}
                  </div>

                  {/* Slot */}
                 <div className="border-b border-gray-100 py-4">
  <div className="flex items-center gap-2 mb-2">
    <span className="text-gray-500 text-lg">📅</span>
    <h3 className="text-gray-800 text-sm font-medium">Slot booking</h3>
  </div>

  {slotBooked && bookedSlot ? (
    <div className="bg-gray-100 p-3 rounded-md text-sm text-gray-700">
      <p><strong>Date:</strong> {bookedSlot.date}</p>
      <p><strong>Time:</strong> {bookedSlot.time}</p>
      <button
        className="mt-2 bg-[#001F3F] text-white py-1 px-3 rounded-md text-sm"
        onClick={() => setSlotModalOpen(true)}
      >
        Change Slot
      </button>
    </div>
  ) : (
    <button
      className="w-full bg-[#003049] text-white py-2 rounded-md font-medium text-sm"
      onClick={() => setSlotModalOpen(true)}
    >
      Book now
    </button>
  )}
</div>

                  {/* Payment */}
                  <div className="py-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-gray-500 text-lg">💳</span>
                      <h3 className="text-gray-800 text-sm font-medium">Payment method</h3>
                    </div>

                    <button
                      className="w-full mt-6 text-white py-2 rounded-md font-medium bg-[#003049] hover:bg-[#002b4c]"
                      onClick={handleCreateBooking}
                    >
                      Proceed to checkout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 p-4 lg:p-10 bg-[#CECECE26]">
        {loading && <p>Loading cart items...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && cartItems.length === 0 && <p>Your cart is empty.</p>}
        {!loading && !error && cartItems.length > 0 && (
          <>
            <div className="bg-white rounded-xl shadow-sm border p-4 mb-4">
              {cartItems.map((item, index) => {
                const unitObj = typeof item.unit === "object" ? item.unit : {};
                const title = unitObj.title || "Unknown Service";
                const price = item.price ?? item.total ?? 0;
                const key = `${unitObj.id ?? item._id ?? index}`;
                return (
                  <div
                    key={key}
                    className="flex justify-between items-center mb-3 w-full flex-wrap"
                  >
                    <span className="w-full sm:w-1/2 mb-2 sm:mb-0">
                      {title} {item.quantity ? `x${item.quantity}` : ""}
                    </span>
                    <div className="flex w-full sm:w-1/2 justify-between items-center">
                      <button
                        onClick={() => handleDelete(unitObj.id ?? item._id ?? "")}
                        className="text-red-500 hover:text-red-700"
                      >
                        🗑
                      </button>
                      <span className="text-sm font-medium">₹{price}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 🆕 Service Tip Section (visible only after login) */}
            {step === "next" && (
              <div className="bg-white rounded-xl shadow-sm border p-4 mb-4 transition-all duration-300 ease-in-out">
                <h2 className="font-semibold mb-2 flex items-center gap-2">
                  <span>💁‍♂️</span> Service Tip{" "}
                  <span className="text-gray-400 text-xs">(optional)</span>
                </h2>

                <p className="text-xs text-gray-500 mb-3">
                  A small tip, a big gesture! Tip your professional to show your appreciation
                  for their hard work.
                </p>

                <div className="flex gap-2 flex-wrap">
                  {tipOptions.map((tip) => (
                    <button
                      key={tip}
                      onClick={() => setSelectedTip(tip)}
                      className={`border rounded-lg px-4 py-2 text-sm transition-colors duration-200 ${
                        selectedTip === tip
                          ? "bg-[#003049] text-white"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      ₹{tip}
                    </button>
                  ))}

                  <button
                    onClick={() => {
                      const custom = prompt("Enter custom tip amount:");
                      if (custom && !isNaN(custom)) setSelectedTip(Number(custom));
                    }}
                    className="border rounded-lg px-4 py-2 text-sm bg-white text-gray-700 hover:bg-gray-100"
                  >
                    Other
                  </button>
                </div>

                {selectedTip > 0 && (
                  <p className="text-sm text-green-600 mt-2">
                    You’ve added a ₹{selectedTip} tip (optional only).
                  </p>
                )}
              </div>
            )}

            {/* Payment Summary */}
            <div className="bg-white rounded-xl shadow-sm border p-4">
              <h2 className="font-semibold mb-3">Payment Summary</h2>
              <div className="flex justify-between mb-1 text-sm">
                <span>Item Total</span>
                <span>₹{totalPrice}</span>
              </div>
           <div className="flex justify-between mb-1 text-sm">
  <span>Taxes & Fee</span>
  <span>₹{taxAmount}</span>

</div>

              {/* Tip intentionally hidden from Cart summary */}
             <div className="flex justify-between font-semibold border-t pt-2 mt-2 text-sm">
  <span>Total amount</span>
  
</div><span>
   <span>₹{totalAmount}</span>

  </span>

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
