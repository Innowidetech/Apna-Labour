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

  // Modal state
  const [showAddressModal, setShowAddressModal] = useState(false);

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

  // ✅ Handle Address Submit
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
      setShowAddressModal(false); // close modal after save
    } catch (err) {
      toast.error(err.message || "Failed to save address");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row p-4 lg:p-10">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 flex flex-col pt-10 px-4 lg:px-10">
        <h1 className="text-2xl font-cursive mb-6">Apna Labour</h1>

        <div className="border rounded-xl p-4 space-y-4">
          <div className="flex justify-between items-center border-b pb-3">
            <p className="text-sm font-medium">Send booking details to</p>
            <span className="text-gray-600">+91- 8098749932</span>
          </div>

          {/* Address */}
          <button
            onClick={() => setShowAddressModal(true)}
            className="w-full bg-[#0B253A] text-white py-3 rounded-lg"
          >
            Register an address
          </button>

          {/* Disabled sections (Slot + Payment) */}
          <button className="w-full bg-gray-200 text-gray-500 py-3 rounded-lg cursor-not-allowed">
            Book now
          </button>
          <button className="w-full bg-gray-200 text-gray-500 py-3 rounded-lg cursor-not-allowed">
            Proceed to checkout
          </button>
        </div>

        {/* Cancellation Policy */}
        <p className="mt-6 text-sm text-gray-700">
          <span className="font-bold">Cancellation Policy</span><br />
          Free cancellation if done more than 12hrs before the service or a professional isn’t
          assigned. A fee will be charged otherwise.
        </p>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 p-4 lg:p-10 bg-[#CECECE26]">
        {/* ... keep your cart & payment summary code here ... */}
      </div>

      {/* Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative">
            <button
              onClick={() => setShowAddressModal(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold mb-4">Register Address</h2>
            <div className="flex flex-col space-y-3">
              {Object.keys(addressData).map((key) => (
                <input
                  key={key}
                  type="text"
                  placeholder={key}
                  value={addressData[key]}
                  onChange={(e) =>
                    setAddressData({ ...addressData, [key]: e.target.value })
                  }
                  className="border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              ))}
              <button
                className="bg-black text-white py-2 rounded-lg"
                onClick={handleAddressSubmit}
              >
                Save Address
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
