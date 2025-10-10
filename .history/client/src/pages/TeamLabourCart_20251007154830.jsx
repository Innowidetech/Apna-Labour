import React, { useEffect, useState } from "react";
import repairMan from "../assets/repairMan.png";

const TeamLabourCart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("teamLabourCart")) || [];
    setCartItems(savedCart);
  }, []);

  return (
    <div className="container mx-auto px-6 md:px-16 py-6 flex flex-col lg:flex-row gap-6">
      {/* Payment Summary */}
      <div className="lg:w-1/2 bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4 text-center">Payment Summary</h2>
        {cartItems.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          cartItems.map((item, index) => {
            const team = item.labourer;
            const costPerDay = team?.cost || 0;
            const totalDays = item.duration || 1;
            const serviceFee = 100;
            const tax = 0.1 * (costPerDay * totalDays + serviceFee);
            const totalAmount = costPerDay * totalDays + serviceFee + tax;

            return (
              <div key={index} className="mb-4 border-b pb-4">
                <p>
                  <span className="font-semibold">Team Name:</span>{" "}
                  {team?.name || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Skill:</span>{" "}
                  {team?.skill || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Start Date:</span>{" "}
                  {item.startDate}
                </p>
                <p>
                  <span className="font-semibold">End Date:</span>{" "}
                  {item.endDate}
                </p>
                <p>
                  <span className="font-semibold">Duration:</span>{" "}
                  {totalDays} day(s)
                </p>
                {item.numberOfWorkers && (
                  <p>
                    <span className="font-semibold">Workers:</span>{" "}
                    {item.numberOfWorkers}
                  </p>
                )}
                <p>
                  <span className="font-semibold">Location:</span>{" "}
                  {item.workLocation || "-"}
                </p>
                <p>
                  <span className="font-semibold">Purpose:</span>{" "}
                  {item.purpose || "-"}
                </p>
                <p>
                  <span className="font-semibold">Rate/Day:</span> ₹
                  {costPerDay.toFixed(2)}
                </p>
                <p>
                  <span className="font-semibold">Service Fee:</span> ₹
                  {serviceFee.toFixed(2)}
                </p>
                <p>
                  <span className="font-semibold">Tax (10%):</span> ₹
                  {tax.toFixed(2)}
                </p>
                <p className="font-bold mt-2">
                  Total: ₹{totalAmount.toFixed(2)}
                </p>
              </div>
            );
          })
        )}
      </div>

      {/* Team Info */}
      <div className="lg:w-1/2 bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4 text-center">Team Information</h2>
        {cartItems.length === 0 ? (
          <p>No labourer selected.</p>
        ) : (
          cartItems.map((item, index) => {
            const team = item.labourer;
            return (
              <div
                key={index}
                className="flex flex-col items-center border rounded-xl p-4 mb-4"
              >
                <img
                  src={team?.image || repairMan}
                  alt={team?.name}
                  className="w-24 h-24 rounded-full mb-3 object-cover border"
                />
                <p className="font-semibold text-lg">{team?.name}</p>
                <p className="text-gray-600">{team?.skill}</p>
                <p className="text-sm text-gray-500">
                  {team?.experience || "Experience not specified"}
                </p>
                <p className="mt-2">Rate: ₹{team?.cost || 0}/day</p>
                <p>Phone: {team?.mobileNumber || "-"}</p>
                <p>Location: {item.workLocation || "-"}</p>
                <p>Purpose: {item.purpose || "-"}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default TeamLabourCart;
