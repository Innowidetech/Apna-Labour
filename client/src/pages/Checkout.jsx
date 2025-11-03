import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { profileData } = location.state || {};

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editSection, setEditSection] = useState("");
  const [editData, setEditData] = useState({});

  const [profile, setProfile] = useState(profileData);

  // Fetch Cart Items
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
    fetchCart();
  }, []);

  if (!profile) return <p>No profile data available.</p>;

  const { user, address, booking } = profile;

  const openEditModal = (section) => {
    setEditSection(section);
    setEditData({ ...profile[section] });
    setEditModalOpen(true);
  };

  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first!");
        return;
      }

      const updatedProfile = { ...profile, [editSection]: editData };

      const res = await fetch("https://apnalabour.onrender.com/api/customer/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedProfile),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);

      setProfile(updatedProfile);
      toast.success(`${editSection} updated successfully!`);
      setEditModalOpen(false);
    } catch (err) {
      toast.error(err.message || "Failed to update profile.");
    }
  };

  // Dynamically load Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.getElementById("razorpay-script")) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.id = "razorpay-script";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Razorpay Payment Integration
  const handlePayment = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      toast.error("Failed to load Razorpay. Check your connection.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to proceed with payment.");
        return;
      }

      // 1️⃣ Create Razorpay order
      const orderRes = await fetch("https://apnalabour.onrender.com/api/payment/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookingId: booking._id }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.message || "Failed to create order.");

      const { id: orderId, amount, currency } = orderData;

      // 2️⃣ Open Razorpay Checkout
      const options = {
        key: "rzp_test_yourkeyhere", // replace with your Razorpay key
        amount: amount,
        currency: currency,
        name: "Apna Labour",
        description: "Service Payment",
        order_id: orderId,
        handler: async function (response) {
          // 3️⃣ Verify payment
          try {
            const verifyRes = await fetch("https://apnalabour.onrender.com/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();
            if (!verifyRes.ok) throw new Error(verifyData.message || "Payment verification failed");

            toast.success("Payment successful!");
          } catch (verifyErr) {
            toast.error(verifyErr.message || "Payment verification failed.");
          }
        },
        prefill: {
          name: user.name,
          email: user.email || "",
          contact: user.mobileNumber,
        },
        theme: {
          color: "#003049",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error(err.message || "Payment failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row p-4 lg:p-10 gap-6">
      {/* Left Section: Customer Details */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        <button
          className="mb-4 px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 w-max"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        {/* User Info */}
        <div className="bg-white border rounded-lg p-4 shadow-sm relative">
          <h2 className="text-lg font-semibold mb-2 flex justify-between items-center">
            User Info
            <span
              className="cursor-pointer text-gray-500 hover:text-black text-sm"
              onClick={() => openEditModal("user")}
            >
              ✏️
            </span>
          </h2>
          <p><span className="font-medium">Name:</span> {user.name}</p>
          <p><span className="font-medium">Mobile:</span> {user.mobileNumber}</p>
          <p><span className="font-medium">Role:</span> {user.role}</p>
        </div>

        {/* Address */}
        <div className="bg-white border rounded-lg p-4 shadow-sm relative">
          <h2 className="text-lg font-semibold mb-2 flex justify-between items-center">
            Address
            <span
              className="cursor-pointer text-gray-500 hover:text-black text-sm"
              onClick={() => openEditModal("address")}
            >
              ✏️
            </span>
          </h2>
          <p><span className="font-medium">HNo:</span> {address.HNo}</p>
          <p><span className="font-medium">Street:</span> {address.street}</p>
          <p><span className="font-medium">Area:</span> {address.area}</p>
          <p><span className="font-medium">Town/City:</span> {address.townCity}</p>
          <p><span className="font-medium">Landmark:</span> {address.landmark}</p>
          <p><span className="font-medium">Pincode:</span> {address.pincode}</p>
          <p><span className="font-medium">State:</span> {address.state}</p>
        </div>

        {/* Booking Info */}
        <div className="bg-white border rounded-lg p-4 shadow-sm relative">
          <h2 className="text-lg font-semibold mb-2 flex justify-between items-center">
            Booking Info
            <span
              className="cursor-pointer text-gray-500 hover:text-black text-sm"
              onClick={() => openEditModal("booking")}
            >
              ✏️
            </span>
          </h2>
          <p><span className="font-medium">Date:</span> {new Date(booking.bookingDate).toLocaleDateString()}</p>
          <p><span className="font-medium">Time Slot:</span> {booking.timeSlot}</p>
        </div>
      </div>

      {/* Right Section: Order Summary */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        <h2 className="text-lg font-semibold mb-2">Order Summary</h2>

        {loading ? (
          <p>Loading cart items...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="bg-white border rounded-xl shadow-sm p-4 flex flex-col gap-3">
            {cartItems.map((item) => {
              const unitObj = typeof item.unit === "object" ? item.unit : {};
              const title = unitObj.title || "Unknown Service";
              const price = item.price || 0;
              return (
                <div key={item._id} className="flex justify-between items-center">
                  <span>{title}</span>
                  <span className="font-medium">₹{price}</span>
                </div>
              );
            })}

            <div className="flex justify-between border-t pt-2 mt-2 font-semibold">
              <span>Total Amount</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-2">
              <span>Amount to Pay</span>
              <span>₹{totalPrice}</span>
            </div>

            <button
              className="mt-4 bg-[#003049] text-white py-2 rounded-md font-medium hover:bg-[#002b4c]"
              onClick={handlePayment}
            >
              PayNow
            </button>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-lg relative">
            <h2 className="text-xl font-bold mb-4">
              Edit {editSection.charAt(0).toUpperCase() + editSection.slice(1)}
            </h2>

            <button
              className="absolute top-3 right-4 text-gray-600 hover:text-black text-2xl"
              onClick={() => setEditModalOpen(false)}
            >
              &times;
            </button>

            <div className="flex flex-col gap-3">
              {Object.keys(editData).map((key) => (
                <input
                  key={key}
                  type="text"
                  placeholder={key}
                  value={editData[key]}
                  onChange={(e) => setEditData({ ...editData, [key]: e.target.value })}
                  className="w-full border px-3 py-2 rounded"
                />
              ))}
              <button
                className="bg-[#003049] text-white py-2 rounded-md mt-2"
                onClick={handleSaveEdit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default Checkout;
