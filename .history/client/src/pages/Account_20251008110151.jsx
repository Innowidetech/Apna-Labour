// src/pages/Account.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccountProfile } from "../redux/accountSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Account = () => {
  const dispatch = useDispatch();

  // ✅ Safe selectors
  const accountData = useSelector((state) => state.account?.accountData);
  const loading = useSelector((state) => state.account?.loading);
  const error = useSelector((state) => state.account?.error);

  const [formData, setFormData] = useState({
    fullName: "",
    gender: "male",
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

  // ✅ Populate form when data is available
  useEffect(() => {
    if (accountData?.customer) {
      const profile = accountData.customer;
      setFormData({
        fullName: profile.fullName || "",
        gender: profile.gender || "male",
        mobile: profile.mobile || "",
        email: profile.email || "",
        house: profile.address?.house || "",
        building: profile.address?.building || "",
        street: profile.address?.street || "",
        landmark: profile.address?.landmark || "",
        pincode: profile.address?.pincode || "",
        city: profile.address?.city || "",
        state: profile.address?.state || "",
      });
    } else if (accountData?.user) {
      // If customer is null, still show user email
      setFormData((prev) => ({
        ...prev,
        email: accountData.user.email || "",
      }));
    }
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
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-semibold">Personal Information</h1>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl">
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
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
              {accountData?.customer ? (
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
      </div>

      <ToastContainer />
    </>
  );
};

export default Account;
