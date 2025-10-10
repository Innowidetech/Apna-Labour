import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { profileData, cartItems = [], totalPrice = 0 } = location.state || {};

  if (!profileData) return <p>No profile data available.</p>;

  const { user, address, booking } = profileData;

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row p-4 lg:p-10 gap-6">
      {/* Left Section: Customer Details */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        {/* Back Button */}
        <button
          className="mb-4 px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 w-max"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        {/* User Info */}
        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">User Info</h2>
          <p><span className="font-medium">Name:</span> {user.name}</p>
          <p><span className="font-medium">Mobile:</span> {user.mobileNumber}</p>
          <p><span className="font-medium">Role:</span> {user.role}</p>
        </div>

        {/* Address Info */}
        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Address</h2>
          <p><span className="font-medium">HNo:</span> {address.HNo}</p>
          <p><span className="font-medium">Street:</span> {address.street}</p>
          <p><span className="font-medium">Area:</span> {address.area}</p>
          <p><span className="font-medium">Town/City:</span> {address.townCity}</p>
          <p><span className="font-medium">Landmark:</span> {address.landmark}</p>
          <p><span className="font-medium">Pincode:</span> {address.pincode}</p>
          <p><span className="font-medium">State:</span> {address.state}</p>
        </div>

        {/* Booking Info */}
        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Booking Info</h2>
          <p><span className="font-medium">Date:</span> {new Date(booking.bookingDate).toLocaleDateString()}</p>
          <p><span className="font-medium">Time Slot:</span> {booking.timeSlot}</p>
        </div>
      </div>

      {/* Right Section: Order Summary */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        <h2 className="text-lg font-semibold mb-2">Order Summary</h2>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="bg-white border rounded-xl shadow-sm p-4 flex flex-col gap-3">
            {cartItems.map((item) => {
              const unitObj = typeof item.unit === "object" ? item.unit : {};
              const title = unitObj.title || "Unknown Service";
              const price = item.price || 0;
              return (
                <div key={item._id} className="flex justify-between items-center">
                  <span>{title}</span>
                  <span className="font-medium">₹{price}</span>
                </div>
              );
            })}

            <div className="flex justify-between border-t pt-2 mt-2 font-semibold">
              <span>Total Amount</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-2">
              <span>Amount to Pay</span>
              <span>₹{totalPrice}</span>
            </div>

            <button
              className="mt-4 bg-[#003049] text-white py-2 rounded-md font-medium hover:bg-[#002b4c]"
              onClick={() => alert("Proceeding to payment...")}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
