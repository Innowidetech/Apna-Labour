// src/pages/account/Account.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAccountProfile,
  updateAccountProfile,
  clearSuccessMessage,
} from "../../redux/accountSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AccountSidebar from "./AccountSidebar"; // ✅ Import Sidebar

const Account = () => {
  const dispatch = useDispatch();

  const accountData = useSelector((state) => state.account?.accountData);
  const loading = useSelector((state) => state.account?.loading);
  const error = useSelector((state) => state.account?.error);
  const successMessage = useSelector((state) => state.account?.successMessage);

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    phoneNumber: "",
    email: "",
    address: {
      HNo: "",
      street: "",
      area: "",
      landmark: "",
      townCity: "",
      state: "",
      pincode: "",
    },
    image: null,
  });

  useEffect(() => {
    dispatch(fetchAccountProfile());
  }, [dispatch]);

  // Log account data whenever it updates
  useEffect(() => {
    if (accountData) {
      console.log("Account Data:", accountData);
    }
    else{console}
  }, [accountData]);

  useEffect(() => {
    if (!accountData) return;

    setFormData({
      name: accountData.name || "",
      gender: accountData.gender || "",
      phoneNumber: accountData.phoneNumber || "",
      email: accountData.email || "",
      address: {
        HNo: accountData.address?.HNo || "",
        street: accountData.address?.street || "",
        area: accountData.address?.area || "",
        landmark: accountData.address?.landmark || "",
        townCity: accountData.address?.townCity || "",
        state: accountData.address?.state || "",
        pincode: accountData.address?.pincode || "",
      },
      image: null,
    });
  }, [accountData]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearSuccessMessage());
    }
  }, [successMessage, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleSave = async () => {
    try {
      await dispatch(updateAccountProfile(formData)).unwrap();
      toast.success("Profile updated successfully!");
      await dispatch(fetchAccountProfile());
    } catch (err) {
      toast.error(err || "Failed to update profile");
    }
  };

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
        {/* Sidebar on the left */}
        <AccountSidebar />

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-10">
          <h1 className="text-xl font-semibold mb-6 text-center md:text-left">
            Personal Information
          </h1>

          <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Gender</label>
              <input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Mobile Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Email ID</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Profile Image</label>
              <input type="file" onChange={handleImageChange} />
            </div>

            <h2 className="text-lg font-semibold mt-6 mb-2">Address</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="address.HNo"
                placeholder="House/Flat No."
                value={formData.address.HNo}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2"
              />
              <input
                type="text"
                name="address.street"
                placeholder="Street"
                value={formData.address.street}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <input
                type="text"
                name="address.area"
                placeholder="Area"
                value={formData.address.area}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2"
              />
              <input
                type="text"
                name="address.landmark"
                placeholder="Landmark"
                value={formData.address.landmark}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
              <input
                type="text"
                name="address.townCity"
                placeholder="City"
                value={formData.address.townCity}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2"
              />
              <input
                type="text"
                name="address.state"
                placeholder="State"
                value={formData.address.state}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2"
              />
              <input
                type="text"
                name="address.pincode"
                placeholder="Pincode"
                value={formData.address.pincode}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2"
              />
            </div>

            <button
              onClick={handleSave}
              className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 mt-4"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default Account;
