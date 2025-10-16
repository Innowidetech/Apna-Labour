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
import AccountSidebar from "./AccountSidebar";

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

  const [isEditing, setIsEditing] = useState(false); // 🔄 New state

  // Fetch profile on mount
  useEffect(() => {
    dispatch(fetchAccountProfile());
  }, [dispatch]);

  // Log account data
  useEffect(() => {
    if (accountData) {
      console.log("Fetched Account Data:", accountData);
    }
  }, [accountData]);

  // Populate formData
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

  // Show success toast
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearSuccessMessage());
      setIsEditing(false); // 🔄 Exit edit mode
    }
  }, [successMessage, dispatch]);

  // Show error toast
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

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
      await dispatch(fetchAccountProfile());
    } catch (err) {
      toast.error(err || "Failed to update profile");
    }
  };

  const handleCancel = () => {
    if (accountData) {
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
    }
    setIsEditing(false);
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
        <AccountSidebar />

        <div className="flex-1 p-4 md:p-10">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-semibold">Personal Information</h1>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Edit Profile
              </button>
            ) : (
              <div className="space-x-2">
                <button
                  onClick={handleCancel}
                  className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto space-y-4">
            {/* Fields */}
            {[
              { label: "Full Name", name: "name", type: "text" },
              { label: "Gender", name: "gender", type: "text" },
              { label: "Mobile Number", name: "phoneNumber", type: "text" },
              { label: "Email ID", name: "email", type: "email" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-gray-700 mb-1">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full border border-gray-300 rounded-md p-2 ${
                    !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                />
              </div>
            ))}

            {/* Image */}
            <div>
              <label className="block text-gray-700 mb-1">Profile Image</label>
              <input type="file" onChange={handleImageChange} disabled={!isEditing} />
            </div>

            {/* Address */}
            <h2 className="text-lg font-semibold mt-6 mb-2">Address</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="address.HNo"
                placeholder="House/Flat No."
                value={formData.address.HNo}
                onChange={handleChange}
                disabled={!isEditing}
                className="border border-gray-300 rounded-md p-2"
              />
              <input
                type="text"
                name="address.street"
                placeholder="Street"
                value={formData.address.street}
                onChange={handleChange}
                disabled={!isEditing}
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
                disabled={!isEditing}
                className="border border-gray-300 rounded-md p-2"
              />
              <input
                type="text"
                name="address.landmark"
                placeholder="Landmark"
                value={formData.address.landmark}
                onChange={handleChange}
                disabled={!isEditing}
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
                disabled={!isEditing}
                className="border border-gray-300 rounded-md p-2"
              />
              <input
                type="text"
                name="address.state"
                placeholder="State"
                value={formData.address.state}
                onChange={handleChange}
                disabled={!isEditing}
                className="border border-gray-300 rounded-md p-2"
              />
              <input
                type="text"
                name="address.pincode"
                placeholder="Pincode"
                value={formData.address.pincode}
                onChange={handleChange}
                disabled={!isEditing}
                className="border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default Account;
