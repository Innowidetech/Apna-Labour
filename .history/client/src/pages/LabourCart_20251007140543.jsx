import React, { useState, useEffect } from "react";

const LabourCart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("labourCart")) || [];
    setCartItems(savedCart);
  }, []);

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item.labourer._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("labourCart", JSON.stringify(updatedCart));
  };

  const getTotalCost = (item) => item.duration * item.labourer.cost;

  const getGrandTotal = () =>
    cartItems.reduce((sum, item) => sum + getTotalCost(item), 0);

  const totalDays = cartItems.reduce((sum, item) => sum + item.duration, 0);
  const totalLabourers = cartItems.length;
  const serviceFee = 100; // example service fee
  const tax = 0.1 * (getGrandTotal() + serviceFee); // example 10% tax

  return (
    <div className="flex flex-col md:flex-row px-6 md:px-16 py-6 gap-8">
      {/* Left: Labour Preview */}
      <div className="flex-1 space-y-6">
        <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.labourer._id}
              className="border rounded-xl p-4 flex gap-4 items-center"
            >
              <img
                src={item.labourer.image || "/repairMan.png"}
                alt={item.labourer.name}
                className="w-24 h-24 rounded-lg object-cover border"
              />
              <div className="flex-1">
                <p>
                  <span className="font-semibold">Date:</span> {item.startDate}
                </p>
                <p>
                  <span className="font-semibold">Duration:</span> {item.duration} day(s)
                </p>
                <p>
                  <span className="font-semibold">Labour Name:</span> {item.labourer.name}
                </p>
                <p>
                  <span className="font-semibold">Phone:</span> {item.labourer.phone}
                </p>
                <p>
                  <span className="font-semibold">Work Location:</span> {item.location}
                </p>
              </div>
              <div>
                <button
                  className="text-red-600 text-sm underline"
                  onClick={() => handleRemove(item.labourer._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Right: Payment Summary */}
      <div className="w-full md:w-96 border rounded-xl p-4 space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <span>🛒</span> Your Order Summary ({cartItems.length})
        </h3>
        <div className="border rounded p-4 space-y-2">
          <h4 className="font-semibold text-md">Payment Summary</h4>
          <div className="flex justify-between">
            <span>Total no. of days</span>
            <span>{totalDays.toString().padStart(2, "0")}</span>
          </div>
          <div className="flex justify-between">
            <span>Total no. of labourers</span>
            <span>{totalLabourers.toString().padStart(2, "0")}</span>
          </div>
          <div className="flex justify-between">
            <span>Rate per day</span>
            <span>₹{cartItems[0]?.labourer.cost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Service fees</span>
            <span>₹{serviceFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>
          <hr />
          <div className="flex justify-between font-bold">
            <span>Total amount</span>
            <span>₹{(getGrandTotal() + serviceFee + tax).toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Amount to pay</span>
            <span>₹{(getGrandTotal() + serviceFee + tax).toFixed(2)}</span>
          </div>
          <button className="mt-2 w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-800 transition">
            Pay NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default LabourCart;
