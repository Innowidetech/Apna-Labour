import React, { useState, useEffect } from "react";
import { CheckCircle, Lock } from "lucide-react";

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

  const totalDays = cartItem.duration || 1;
  const serviceFee = 100;
  const tax = 29;
  const totalAmount = cartItem.labourer.cost * totalDays + serviceFee + tax;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* LEFT SIDE */}
      <div className="flex-1 p-6 md:p-10 border-r border-gray-200">
        {/* Header */}
        <h1 className="text-3xl font-extrabold text-center text-blue-900 mb-8 font-serif">
          Apna Labour
        </h1>

        {/* Booking Info */}
        <div className="flex items-center gap-3 mb-2">
          <CheckCircle className="text-green-600 w-6 h-6" />
          <p className="text-gray-700 text-sm">
            Booking No: <span className="font-medium">#7219812</span>
          </p>
        </div>

        <h2 className="text-xl font-semibold mb-6">
          Thank You {cartItem.customerName || "Andrew"}!
        </h2>

        {/* Labour Preview Card */}
        <div className="border rounded-xl p-5 shadow-sm bg-white max-w-xl">
          <h3 className="text-lg font-semibold mb-4">Labour Preview</h3>
          <div className="flex flex-col sm:flex-row gap-5">
            <img
              src={cartItem.labourer.image || "/repairMan.png"}
              alt={cartItem.labourer.name}
              className="w-28 h-28 object-cover rounded-lg border"
            />
            <div className="flex flex-col gap-2 text-sm text-gray-700">
              <p>
                <span className="font-medium w-32 inline-block">Date</span>:
                &nbsp;{cartItem.startDate || "12 Aug 2025"}
              </p>
              <p>
                <span className="font-medium w-32 inline-block">Duration</span>:
                &nbsp;{totalDays} day
              </p>
              <p>
                <span className="font-medium w-32 inline-block">Labour Name</span>:
                &nbsp;{cartItem.labourer.name}
              </p>
              <p>
                <span className="font-medium w-32 inline-block">Phone</span>:
                &nbsp;{cartItem.labourer.mobileNumber || "+91-85947383947"}
              </p>
              <p>
                <span className="font-medium w-32 inline-block">Work Location</span>:
                &nbsp;{cartItem.labourer.distance || "Secunderabad East"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 p-6 md:p-10 flex flex-col items-center bg-[#CECECE26]">
        <div className="flex items-center gap-2 mb-6">
          <Lock className="text-gray-800 w-5 h-5" />
          <h2 className="text-lg font-semibold">Your Order Summary</h2>
          <span className="ml-1 bg-gray-200 text-sm px-2 py-0.5 rounded-full">
            2
          </span>
        </div>

        <div className="border rounded-xl p-6 shadow-sm w-full max-w-md">
          <h3 className="text-lg font-bold mb-4">Payment Summary</h3>

          <div className="flex justify-between text-sm mb-2">
            <span>Total no. of days</span>
            <span>{String(totalDays).padStart(2, "0")}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span>Total no. of labourers</span>
            <span>01</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span>Rate per day</span>
            <span>₹{cartItem.labourer.cost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span>Service fees</span>
            <span>₹{serviceFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm mb-4">
            <span>Tax</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>

          <hr className="my-2 border-gray-300" />

          <div className="flex justify-between font-semibold text-sm mb-2">
            <span>Total amount</span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-sm mb-6">
            <span>Amount to pay</span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>

          <button className="w-full bg-[] text-white py-2 rounded-md font-medium hover:bg-blue-800 transition">
            Pay NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default LabourCart;
