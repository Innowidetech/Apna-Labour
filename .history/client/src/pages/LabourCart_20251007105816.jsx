import React, { useState, useEffect } from "react";

const LabourCart = () => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage (or you can fetch from API if stored server-side)
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
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.labourer._id}
              className="border rounded-xl p-4 flex flex-col md:flex-row justify-between items-center gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.labourer.image || "/repairMan.png"}
                  alt={item.labourer.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-lg">{item.labourer.name}</h3>
                  <p className="text-sm text-gray-600">{item.labourer.skill}</p>
                  <p className="text-sm text-gray-500">
                    {item.startDate} → {item.endDate} ({item.duration} day(s))
                  </p>
                  {item.additionalDetails && (
                    <p className="text-sm text-blue-600">
                      Notes: {item.additionalDetails}
                    </p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">
                  ₹{getTotalCost(item)}
                </p>
                <button
                  className="text-red-600 text-sm underline mt-2"
                  onClick={() => handleRemove(item.labourer._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="text-right mt-4">
            <p className="font-bold text-xl">Grand Total: ₹{getGrandTotal()}</p>
            <button className="mt-2 px-6 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LabourCart;
