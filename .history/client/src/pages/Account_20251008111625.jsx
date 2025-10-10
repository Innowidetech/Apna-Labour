// src/pages/Account.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccountProfile } from "../redux/accountSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Account = () => {
  const dispatch = useDispatch();

  // ✅ Selectors
  const accountData = useSelector((state) => state.account?.accountData);
  const loading = useSelector((state) => state.account?.loading);
  const error = useSelector((state) => state.account?.error);

  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    mobile: "",
    email: "",
    house: "",
    building: "",
    street: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "",
  });

  // ✅ Fetch profile on mount
  useEffect(() => {
    dispatch(fetchAccountProfile());
  }, [dispatch]);

  // ✅ Populate form safely
  useEffect(() => {
    if (!accountData) return;

    const userEmail = accountData.profile?.user?.email || "";
    const customer = accountData.profile?.customer;

    setFormData({
      fullName: cu?.fullName || "",
      gender: customer?.gender || "",
      mobile: customer?.mobile || "",
      email: userEmail,
      house: customer?.address?.house || "",
      building: customer?.address?.building || "",
      street: customer?.address?.street || "",
      landmark: customer?.address?.landmark || "",
      pincode: customer?.address?.pincode || "",
      city: customer?.address?.city || "",
      state: customer?.address?.state || "",
    });
  }, [accountData]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading profile...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600">
        {error}
      </div>
    );

  const customer = accountData?.profile?.customer;

  return (
    <>
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md">
          <div className="p-6 flex flex-col items-center">
            <div className="w-20 h-20 bg-gray-300 rounded-full mb-4 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {formData.fullName
                  ? formData.fullName.charAt(0).toUpperCase()
                  : "U"}
              </span>
            </div>
            <h2 className="font-bold text-lg mb-6">
              Hello {formData.fullName || "User"}
            </h2>
          </div>
          <ul className="text-gray-600">
            {[
              "My Account",
              "My Bookings",
              "Payments",
              "My rating & reviews",
              "Help Center",
              "All notification",
            ].map((item) => (
              <li
                key={item}
                className="px-6 py-3 hover:bg-gray-100 cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
          <button className="mt-6 mx-6 w-[calc(100%-1.5rem)] bg-red-500 text-white py-2 rounded-md hover:bg-red-600">
            Logout
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-10">
          <h1 className="text-xl font-semibold mb-6">Personal Information</h1>

          <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={formData.fullName}
                readOnly
                className="w-full border border-gray-300 rounded-md p-2 bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Gender</label>
              <input
                type="text"
                value={formData.gender}
                readOnly
                className="w-full border border-gray-300 rounded-md p-2 bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Mobile Number</label>
              <input
                type="text"
                value={formData.mobile}
                readOnly
                className="w-full border border-gray-300 rounded-md p-2 bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Email ID</label>
              <input
                type="email"
                value={formData.email}
                readOnly
                className="w-full border border-gray-300 rounded-md p-2 bg-gray-100"
              />
            </div>

            <h2 className="text-lg font-semibold mt-6 mb-2">Address</h2>
            {customer ? (
              <div className="space-y-2">
                <div>House: {formData.house}</div>
                <div>Building: {formData.building}</div>
                <div>Street: {formData.street}</div>
                <div>Landmark: {formData.landmark}</div>
                <div>Pincode: {formData.pincode}</div>
                <div>City: {formData.city}</div>
                <div>State: {formData.state}</div>
              </div>
            ) : (
              <div>No address available</div>
            )}
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default Account;
