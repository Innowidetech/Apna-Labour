import React, { useEffect, useState } from "react";
import repairMan from "../assets/repairMan.png";

const TeamLabourCart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("labourCart")) || [];
    setCartItems(savedCart);
  }, []);

  return (
    <div className="container mx-auto px-6 md:px-16 py-6 flex flex-col lg:flex-row gap-6">
      {/* Payment Summary */}
      <div className="lg:w-1/2 bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Payment Summary</h2>
        {cartItems.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          cartItems.map((item, index) => (
            <div key={index} className="mb-4 border-b pb-4">
              <p>
                <span className="font-semibold">Labourer ID:</span> {item.labourer}
              </p>
              <p>
                <span className="font-semibold">Start Date:</span> {item.startDate}
              </p>
              <p>
                <span className="font-semibold">End Date:</span> {item.endDate}
              </p>
              {item.numberOfWorkers && (
                <p>
                  <span className="font-semibold">Workers:</span> {item.numberOfWorkers}
                </p>
              )}
              <p>
                <span className="font-semibold">Location:</span> {item.workLocation}
              </p>
              <p>
                <span className="font-semibold">Purpose:</span> {item.purpose}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Team Info */}
      <div className="lg:w-1/2 bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Team Information</h2>
        {cartItems.length === 0 ? (
          <p>No labourer selected.</p>
        ) : (
          cartItems.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={repairMan}
                alt="Labourer"
                className="w-24 h-24 rounded-full mb-3"
              />
              <p className="font-semibold text-lg">Labour ID: {item.labourer}</p>
              {item.numberOfWorkers && <p>Workers: {item.numberOfWorkers}</p>}
              <p>Location: {item.workLocation}</p>
              <p>Purpose: {item.purpose}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TeamLabourCart;
