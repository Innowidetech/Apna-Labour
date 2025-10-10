import React, { useEffect, useState } from "react";
import repairMan from "../assets/repairMan.png";

const TeamLabourCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [labourers, setLabourers] = useState([]);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = JSON.parse(localStorage.getItem("teamLabourCart")) || [];
    setCartItems(savedCart);

    // Fetch team labourers from API
    const fetchLabourers = async () => {
      try {
        const res = await fetch(
          "https://apnalabour.onrender.com/api/customer/labourers/type/Team"
        );
        const data = await res.json();
        if (data.success) setLabourers(data.labourers);
      } catch (err) {
        console.error("Error fetching labourers:", err);
      }
    };

    fetchLabourers();
  }, []);

  const teamItem = cartItems[0]; // Only one team booking at a time
  const team = teamItem?.labourer || labourers[0] || {}; // fallback to first fetched team
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
                  <span className="font-semibold">Labours:</span> {totalLabours}
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
                  <span className="font-semibold">Skill:</span> {team?.skill || "Lifting & Packaging"}
                </p>
              </div>
            </div>
            <button className="mt-3 border border-gray-300 text-sm px-4 py-1 rounded-lg hover:bg-gray-100 transition">
              View Details
            </button>
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
                {cartItems.length}
              </span>
            </div>
            {/* Payment Options */}
          </div>

          {/* Payment Summary */}
        </div>
      </div>
    </div>
  );
};

export default TeamLabourCart;
