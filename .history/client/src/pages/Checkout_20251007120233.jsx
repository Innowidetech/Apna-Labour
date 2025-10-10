import React from "react";
import { useLocation } from "react-router-dom";

const CheckoutPage = () => {
  const location = useLocation();
  const { profileData } = location.state || {};

  if (!profileData) return <p>No profile data available.</p>;

  const { user, address, booking } = profileData;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Checkout Details</h2>

      <div className="bg-white border rounded-lg p-4 mb-4 shadow-sm">
        <h3 className="font-semibold mb-2">User Info</h3>
        <p><span className="font-medium">Name:</span> {user.name}</p>
        <p><span className="font-medium">Mobile:</span> {user.mobileNumber}</p>
        <p><span className="font-medium">Role:</span> {user.role}</p>
      </div>

      <div className="bg-white border rounded-lg p-4 mb-4 shadow-sm">
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
        <p><span className="font-medium">Date:</span> {new Date(booking.bookingDate).toLocaleDateString()}</p>
        <p><span className="font-medium">Time Slot:</span> {booking.timeSlot}</p>
      </div>
    </div>
  );
};

export default CheckoutPage;
