import React, { useState, useEffect } from "react";

const LabourCart = () => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("labourCart")) || [];
    setCartItems(savedCart);
  }, []);

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item.labourer._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("labourCart", JSON.stringify(updatedCart));
  };

  const getTotalCost = (item) => {
    return item.duration * item.labourer.cost;
  };

  const getGrandTotal = () => {
    return cartItems.reduce((sum, item) => sum + getTotalCost(item), 0);
  };

  return (
    <div className="px-6 md:px-16 py-6">
      <h2 className="text-2xl font-bold mb-6">Labour Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.labourer._id}
              className="border rounded-xl p-4 md:p-6 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm hover:shadow-md transition"
            >
              {/* Labourer Info */}
              <div className="flex items-center gap-4 md:gap-6">
                <img
                  src={item.labourer.image || "/repairMan.png"}
                  alt={item.labourer.name}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border"
                />
                <div>
                  <h3 className="font-semibold text-lg md:text-xl">{item.labourer.name}</h3>
                  <p className="text-sm md:text-base text-gray-600">{item.labourer.skill}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {item.startDate} → {item.endDate} ({item.duration} day{item.duration > 1 ? "s" : ""})
                  </p>
                  {item.additionalDetails && (
                    <p className="text-sm text-blue-600 mt-1">
                      Notes: {item.additionalDetails}
                    </p>
                  )}
                </div>
              </div>

              {/* Cost & Actions */}
              <div className="text-right mt-4 md:mt-0">
                <p className="font-bold text-lg md:text-xl">
                  ₹{getTotalCost(item)}
                </p>
                <button
                  className="text-red-600 text-sm underline mt-2 hover:text-red-700"
                  onClick={() => handleRemove(item.labourer._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Grand Total & Checkout */}
          <div className="text-right mt-6">
            <p className="font-bold text-xl md:text-2xl">Grand Total: ₹{getGrandTotal()}</p>
            <button className="mt-3 px-6 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LabourCart;
