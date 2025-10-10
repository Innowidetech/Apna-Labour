import React, { useState, useEffect } from "react";

const LabourCart = () => {
  const [cartItem, setCartItem] = useState(null);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("labourCart")) || [];
    setCartItem(savedCart[0] || null);
  }, []);

  if (!cartItem) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        No labour booked yet.
      </div>
    );
  }

  const totalDays = cartItem.duration;
  const serviceFee = 100; // example
  const tax = 0.1 * (cartItem.labourer.cost * totalDays + serviceFee);
  const totalAmount = cartItem.labourer.cost * totalDays + serviceFee + tax;

  // Helper for singular/plural "day"
  const formatDays = (days) => `${days} day${days > 1 ? "s" : ""}`;

  return (
    <div className="flex flex-col md:flex-row justify-between gap-12 px-6 py-6">
      {/* Left: Labour Preview */}
      <div className="flex-1 bg-white p-6 shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Thank You, Andrew!</h2>
        <div className="border-t pt-4 flex gap-8">
          <div className="w-1/3">
            <img
              src={cartItem.labourer.image || "/repairMan.png"}
              alt={cartItem.labourer.name}
              className="w-24 h-24 rounded-lg object-cover border"
            />
          </div>
          <div className="flex-1 space-y-4">
            <p>
              <span className="font-semibold">Date:</span> {cartItem.startDate} to {cartItem.endDate}
            </p>
            <p>
              <span className="font-semibold">Duration:</span> {formatDays(totalDays)}
            </p>
            <p>
              <span className="font-semibold">Labour Name:</span> {cartItem.labourer.name}
            </p>
            <p>
              <span className="font-semibold">Phone:</span> {cartItem.labourer.mobileNumber || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Work Location:</span> {cartItem.labourer.distance || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Right: Payment Summary */}
      <div className="w-full md:w-96 border rounded-xl p-6 bg-white shadow-lg">
        <h3 className="text-xl font-semibold text-center mb-4">Payment Summary</h3>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Total no. of days</span>
            <span>{formatDays(totalDays)}</span>
          </div>
          <div className="flex justify-between">
            <span>Total no. of labourers</span>
            <span>01</span>
          </div>
          <div className="flex justify-between">
            <span>Rate per day</span>
            <span>₹{cartItem.labourer.cost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Service fees</span>
            <span>₹{serviceFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>
          <hr className="border-dashed" />
          <div className="flex justify-between font-bold">
            <span>Total amount</span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Amount to pay</span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>
          <button className="mt-4 w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-800 transition">
            Pay NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default LabourCart;
