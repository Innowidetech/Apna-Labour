import React, { useEffect, useState } from "react";
import repairMan from "../assets/repairMan.png";

const TeamLabourCart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("teamLabourCart")) || [];
    setCartItems(savedCart);
  }, []);

  if (cartItems.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">No team booking found.</p>
      </div>
    );
  }

  const item = cartItems[0]; // Assuming one team booking
  const team = item.labourer;
  const costPerDay = team?.cost || 0;
  const totalDays = item.duration || 1;
  const workers = item.numberOfWorkers || 1;
  const serviceFee = 40;
  const tax = 29;
  const totalAmount = costPerDay * workers * totalDays + serviceFee + tax;

  return (
     <div className="min-h-screen bg-white flex flex-col md:flex-row">
      {/* Left Section */}
      <div className="w-full md:w-1/2 bg-white  p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-blue-800">Apna Labour</h1>
        </div>

        <p className="text-gray-500 text-sm mb-1">
          Booking No: <span className="font-semibold">#{item.bookingId || "7219812"}</span>
        </p>
        <h2 className="text-xl font-semibold mb-3">Thank You {item.name || "Customer"}!</h2>

        {/* Service Updates */}
        <div className="bg-gray-100 p-4 rounded-lg mb-6 border">
          <h3 className="font-semibold">Service Updates</h3>
          <p className="text-sm text-gray-600 mt-1">
            Your team is ready. Notifications will be sent to you via SMS and email shortly.
          </p>
        </div>

        {/* Team Preview */}
        <div className="border rounded-xl p-4 mb-4">
          <h3 className="font-semibold text-lg mb-3">Team Preview</h3>
          <div className="flex items-center gap-4">
            <img
              src={team?.image || repairMan}
              alt={team?.name}
              className="w-20 h-20 rounded-full border object-cover"
            />
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
              <p>Date:</p>
              <p className="font-medium">{item.startDate} - {item.endDate}</p>
              <p>Labours:</p>
              <p className="font-medium">{workers}</p>
              <p>Supervisor name:</p>
              <p className="font-medium">{team?.supervisor || "Nitin Gadkari"}</p>
              <p>Phone:</p>
              <p className="font-medium">{team?.mobileNumber || "+91-85947383947"}</p>
              <p>Work Location:</p>
              <p className="font-medium">{item.workLocation || "-"}</p>
              <p>Skill:</p>
              <p className="font-medium">{team?.skill || "-"}</p>
            </div>
          </div>
          <button className="mt-4 bg-white border px-4 py-1.5 rounded-md text-sm font-medium hover:bg-gray-50">
            View Details
          </button>
        </div>

        {/* Contact, Address, Slot */}
        <div className="border rounded-xl divide-y">
          <div className="flex justify-between items-center p-3 text-sm">
            <p className="font-medium">Contact</p>
            <p>{item.contact || "+91 889347472"}</p>
          </div>
          <div className="flex justify-between items-center p-3 text-sm">
            <p className="font-medium">Address</p>
            <p className="text-right">{item.address || "ABC, Hyderabad 500089"}</p>
          </div>
          <div className="flex justify-between items-center p-3 text-sm">
            <p className="font-medium">Slot</p>
            <p>{item.startDate ? `Start: ${item.startDate}` : "Not selected"}</p>
          </div>
        </div>
      </div>

    
  );
};

export default TeamLabourCart;
