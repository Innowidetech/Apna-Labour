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

  if (!profileData) return <p>No profile data available.</p>;

  const { user, address, booking } = profileData;

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

        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">User Info</h2>
          <p><span className="font-medium">Name:</span> {user.name}</p>
          <p><span className="font-medium">Mobile:</span> {user.mobileNumber}</p>
          <p><span className="font-medium">Role:</span> {user.role}</p>
        </div>

        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Address</h2>
          <p><span className="font-medium">HNo:</span> {address.HNo}</p>
          <p><span className="font-medium">Street:</span> {address.street}</p>
          <p><span className="font-medium">Area:</span> {address.area}</p>
          <p><span className="font-medium">Town/City:</span> {address.townCity}</p>
          <p><span className="font-medium">Landmark:</span> {address.landmark}</p>
          <p><span className="font-medium">Pincode:</span> {address.pincode}</p>
          <p><span className="font-medium">State:</span> {address.state}</p>
        </div>

        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Booking Info</h2>
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
              onClick={() => alert("Proceeding to payment...")}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default Checkout;
