import React, { useEffect, useState } from "react";
import repairMan from "../assets/repairMan.png";

const TeamLabourCart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("teamLabourCart")) || [];
    setCartItems(savedCart);
  }, []);

  const teamItem = cartItems[0]; // Only one team booking at a time
  const team = teamItem?.labourer || {};
  const totalDays = teamItem?.duration || 7;
  const totalLabours = teamItem?.numberOfWorkers || 10;
  const ratePerLabour = team?.cost || 250;
  const serviceFees = 40;
  const tax = 29;
  const totalAmount = ratePerLabour * totalDays * totalLabours + serviceFees + tax;

  return (
    <div className="w-full bg-gray-50 min-h-screen py-10 px-4 md:px-16">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* LEFT SIDE */}
        <div className="lg:w-1/2 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Apna Labour</h1>
            <p className="text-sm text-gray-500 mt-1">Booking No: #7219812</p>
            <h2 className="text-lg font-semibold text-gray-700 mt-3">
              Thank You {team?.name || "Andrew"}!
            </h2>
          </div>

          {/* Service Updates */}
          <div className="bg-white shadow rounded-lg p-4 border border-gray-100">
            <h3 className="text-sm font-semibold mb-1 text-gray-700">
              Service Updates
            </h3>
            <p className="text-sm text-gray-500">
              Your team is ready. Notifications will be sent to you via SMS and
              email shortly.
            </p>
          </div>

          {/* Team Preview */}
          <div className="bg-white shadow rounded-lg p-4 border border-gray-100">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              Team Preview
            </h3>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <img
                src={team?.image || repairMan}
                alt={team?.name}
                className="w-20 h-20 rounded-lg object-cover border"
              />
              <div className="text-sm text-gray-700 space-y-1">
                <p>
                  <span className="font-semibold">Date:</span> 12 Aug 2025 - 18
                  Aug 2025
                </p>
                <p>
                  <span className="font-semibold">Labours:</span>{" "}
                  {totalLabours}
                </p>
                <p>
                  <span className="font-semibold">Supervisor name:</span> Nitin
                  Gadkari
                </p>
                <p>
                  <span className="font-semibold">Phone:</span> +91-85947389347
                </p>
                <p>
                  <span className="font-semibold">Work Location:</span>{" "}
                  {teamItem?.workLocation || "Secunderabad East"}
                </p>
                <p>
                  <span className="font-semibold">Skill:</span>{" "}
                  {team?.skill || "Lifting & Packaging"}
                </p>
              </div>
            </div>
            <button className="mt-3 border border-gray-300 text-sm px-4 py-1 rounded-lg hover:bg-gray-100 transition">
              View Details
            </button>
          </div>

          {/* Contact & Address */}
          <div className="bg-white shadow rounded-lg p-4 border border-gray-100">
            <div className="flex justify-between items-center mb-2">
              <p className="font-semibold text-gray-700">Contact</p>
              <p className="text-blue-600 cursor-pointer text-sm">✎</p>
            </div>
            <p className="text-sm text-gray-600 mb-4">+91889347472</p>

            <div className="flex justify-between items-center mb-2">
              <p className="font-semibold text-gray-700">Address</p>
              <p className="text-blue-600 cursor-pointer text-sm">✎</p>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              ABCNKJ.VJSJDSCSDC <br /> *8888 MI,78098
            </p>

            <div className="flex justify-between items-center">
              <p className="font-semibold text-gray-700">Slot</p>
              <p className="text-blue-600 cursor-pointer text-sm">✎</p>
            </div>
            <p className="text-sm text-gray-600">Start Date:</p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="lg:w-1/2 space-y-6">
          {/* Order Summary */}
          <div className="bg-white shadow rounded-lg p-4 border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Your Order Summary
              </h3>
              <span className="text-sm bg-gray-200 rounded-full px-2 py-1">
                2
              </span>
            </div>

            <div className="space-y-3">
              <label className="flex items-center justify-between border border-gray-300 p-3 rounded-lg">
                <div>
                  <input type="radio" name="payOption" className="mr-2" />
                  Pay day wise
                </div>
                <span className="text-xs text-blue-600 cursor-pointer">
                  NOTIFY ME
                </span>
              </label>

              <label className="flex items-center justify-between border border-gray-300 p-3 rounded-lg">
                <div>
                  <input
                    type="radio"
                    name="payOption"
                    defaultChecked
                    className="mr-2"
                  />
                  One time payment
                  <p className="text-xs text-gray-500 ml-5">
                    ₹{totalAmount} when billed one time
                  </p>
                </div>
              </label>

              <label className="flex items-center justify-between border border-gray-300 p-3 rounded-lg text-gray-400">
                <div>
                  <input type="radio" name="payOption" className="mr-2" />
                  Pay Weekly
                  <p className="text-xs text-red-500 ml-5">
                    Weekly payment is only available for bookings over 14 days.
                  </p>
                </div>
              </label>

              <button className="bg-gray-800 text-white rounded-lg w-full py-2 mt-2">
                Continue
              </button>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-white shadow rounded-lg p-4 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Payment Summary
            </h3>
            <div className="text-sm text-gray-700 space-y-2">
              <p>
                <span className="font-semibold">Total no. of days:</span>{" "}
                {String(totalDays).padStart(2, "0")}
              </p>
              <p>
                <span className="font-semibold">Total no. of labourers:</span>{" "}
                {totalLabours}
              </p>
              <p>
                <span className="font-semibold">Rate per labour:</span> ₹
                {ratePerLabour}
              </p>
              <p>
                <span className="font-semibold">Service fees:</span> ₹
                {serviceFees}
              </p>
              <p>
                <span className="font-semibold">Tax:</span> ₹{tax}
              </p>
              <hr />
              <p className="font-semibold">
                Total amount: ₹{totalAmount.toLocaleString()}
              </p>
              <p className="font-semibold">
                Amount to pay: ₹{totalAmount.toLocaleString()}
              </p>
            </div>
            <button className="mt-4 bg-gray-900 text-white rounded-lg w-full py-2 font-semibold">
              Pay NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamLabourCart;
