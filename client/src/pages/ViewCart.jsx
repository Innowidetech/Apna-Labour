// src/pages/ViewCart.jsx
import React, { useState } from "react";
import { Trash2 } from "lucide-react";

const ViewCart = () => {
  const [step, setStep] = useState(1); // 👈 track current step
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Window AC installation", price: 1499 },
    { id: 2, name: "AC less no cooling repair", price: 2099 },
  ]);

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);
  const tax = Math.round(total * 0.05); // 5% tax
  const finalAmount = total + tax;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* LEFT SIDE */}
      <div className="w-1/2 border-r px-10 py-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Apna Labour</h1>

        {/* STEP 1 → Login */}
        {step === 1 && (
          <div className="border rounded-md p-4 flex justify-between items-center bg-white">
            <p className="text-gray-600 text-sm">
              Login to book the service from your existing bag.
            </p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
              onClick={() => setStep(2)} // 👈 move to next step
            >
              LOGIN NOW
            </button>
          </div>
        )}

        {/* STEP 2 → Address + Slot + Payment */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="border rounded-md p-4 bg-white">
              <p className="text-sm text-gray-600 mb-2">Send booking details to</p>
              <p className="font-semibold">+91- 8098749932</p>
            </div>

            <div className="border rounded-md p-4 bg-white">
              <p className="text-gray-700 font-medium mb-2">Address</p>
              <button className="w-full bg-gray-900 text-white py-2 rounded-md">
                Register an address
              </button>
            </div>

            <div className="border rounded-md p-4 bg-white">
              <p className="text-gray-700 font-medium mb-2">Slot booking</p>
              <button className="w-full bg-gray-300 text-gray-700 py-2 rounded-md">
                Book now
              </button>
            </div>

            <div className="border rounded-md p-4 bg-white">
              <p className="text-gray-700 font-medium mb-2">Payment method</p>
              <button
                className="w-full bg-blue-600 text-white py-2 rounded-md"
                onClick={() => setStep(3)} // 👈 next → payment
              >
                Proceed to checkout
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 → Payment */}
        {step === 3 && (
          <div className="border rounded-md p-4 bg-white">
            <h2 className="text-lg font-semibold mb-3">Payment Section</h2>
            <p className="text-gray-600 text-sm">
              Here you can integrate Razorpay/UPI/COD options.
            </p>
          </div>
        )}

        {/* Cancellation Policy */}
        <div className="mt-6 text-sm text-gray-500">
          <h3 className="font-semibold text-gray-700 mb-1">Cancellation Policy</h3>
          <p>
            Free cancellation if done more than 12hrs before the service or a
            professional isn’t assigned. A fee will be charged otherwise.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-1/2 px-10 py-10">
        {/* Stepper */}
        <div className="flex items-center justify-between mb-6 text-sm">
          <div className="flex items-center">
            <span className={step >= 1 ? "text-blue-600 font-semibold" : "text-gray-500"}>① Cart</span>
            <span className="mx-2 text-gray-400">────────────</span>
            <span className={step >= 2 ? "text-blue-600 font-semibold" : "text-gray-500"}>② Review</span>
            <span className="mx-2 text-gray-400">────────────</span>
            <span className={step >= 3 ? "text-blue-600 font-semibold" : "text-gray-500"}>③ Payment</span>
          </div>
        </div>

        {/* Cart Items */}
        <div className="border rounded-md bg-white p-4 mb-4">
          <div className="flex justify-between font-semibold text-gray-700 mb-3">
            <span>Service Name</span>
            <span>Amount</span>
          </div>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center py-2 border-b last:border-0"
            >
              <div>
                <p className="text-gray-800">{item.name}</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-2 py-1 text-xs bg-gray-100 border rounded-md">
                  Edit
                </button>
                <Trash2
                  size={16}
                  className="text-red-500 cursor-pointer"
                  onClick={() => removeItem(item.id)}
                />
                <span className="text-gray-800 font-medium">₹{item.price}</span>
              </div>
            </div>
          ))}
          <p className="text-blue-600 mt-3 cursor-pointer text-sm">
            Add Another Service
          </p>
        </div>

        {/* Payment Summary */}
        <div className="border rounded-md bg-white p-4">
          <h3 className="font-semibold text-gray-700 mb-3">Payment Summary</h3>
          <div className="flex justify-between text-sm mb-2">
            <span>Booking charges</span>
            <span>₹{total}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span>Taxes & Fee</span>
            <span>₹{tax}</span>
          </div>
          <div className="flex justify-between font-semibold mb-2">
            <span>Total amount</span>
            <span>₹{finalAmount}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-700">
            <span>Amount to pay</span>
            <span>₹{finalAmount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCart;
