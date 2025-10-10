import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { profileData, cartItems = [], totalPrice = 0 } = location.state || {};

  if (!profileData) return <p>No profile data available.</p>;

  const { user, address, booking } = profileData;

  return (
    <div className="p-6 max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
      {/* Left Side: Customer Details */}
      <div className="lg:w-1/2 flex flex-col gap-4">
        {/* Back Button */}
        <button
          className="mb-4 px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 w-max"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold mb-2">User Info</h3>
          <p><span className="font-medium">Name:</span> {user.name}</p>
          <p><span className="font-medium">Mobile:</span> {user.mobileNumber}</p>
          <p><span className="font-medium">Role:</span> {user.role}</p>
        </div>

        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold mb-2">Address</h3>
          <p><span className="font-medium">HNo:</span> {address.HNo}</p>
          <p><span className="font-medium">Street:</span> {address.street}</p>
          <p><span className="font-medium">Area:</span> {address.area}</p>
          <p><span className="font-medium">Town/City:</span> {address.townCity}</p>
          <p><span className="font-medium">Landmark:</span> {address.landmark}</p>
          <p><span className="font-medium">Pincode:</span> {address.pincode}</p>
          <p><span className="font-medium">State:</span> {address.state}</p>
        </div>

        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold mb-2">Booking Info</h3>
          <p>
            <span className="font-medium">Date:</span>{" "}
            {new Date(booking.bookingDate).toLocaleDateString()}
          </p>
          <p><span className="font-medium">Time Slot:</span> {booking.timeSlot}</p>
        </div>
      </div>

      {/* Right Side: Order Summary */}
      <div className="lg:w-1/2 flex flex-col gap-4">
        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold mb-3">Order Summary</h3>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cartItems.map((item) => {
                const unitObj = typeof item.unit === "object" ? item.unit : {};
                const title = unitObj.title || "Unknown Service";
                const price = item.price || 0;
                return (
                  <div
                    key={item._id}
                    className="flex justify-between mb-2 border-b pb-1"
                  >
                    <span>{title}</span>
                    <span>₹{price}</span>
                  </div>
                );
              })}
              <div className="flex justify-between font-semibold mt-3 border-t pt-2">
                <span>Total Amount</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-2">
                <span>Amount to Pay</span>
                <span>₹{totalPrice}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
