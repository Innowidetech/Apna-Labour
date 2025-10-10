// src/pages/Account.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAccountProfile,
  updateAccountProfile,
  clearSuccessMessage,
  deactivateAccount,
} from "../redux/accountSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      buildingName: "",
      townCity: "",
      state: "",
      pincode: "",
    },
    image: null,
  });

  // 🟢 Static name (for sidebar)
  const [displayName, setDisplayName] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    dispatch(fetchAccountProfile());
  }, [dispatch]);

  useEffect(() => {
    if (!accountData?.profile) return;

    const profile = accountData.profile;

    setFormData({
      name: profile?.name || "",
      gender: profile?.gender || "",
      phoneNumber: profile?.phoneNumber || "",
      email: profile?.email || "",
      address: {
        HNo: profile?.address?.HNo || "",
        street: profile?.address?.street || "",
        area: profile?.address?.area || "",
        landmark: profile?.address?.landmark || "",
        buildingName: profile?.address?.buildingName || "",
        townCity: profile?.address?.townCity || "",
        state: profile?.address?.state || "",
        pincode: profile?.address?.pincode || "",
      },
      image: null,
    });

    setDisplayName(profile?.name || "");
    setProfileImage(profile?.image || null);
  }, [accountData]);

  // ✅ handle input change
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

  // ✅ handle image change
  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  // ✅ save profile
  const handleSave = async () => {
    try {
      await dispatch(updateAccountProfile(formData)).unwrap();
      toast.success("Profile updated successfully!");
      await dispatch(fetchAccountProfile());
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  // ✅ logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    toast.success("Logged out successfully!");
    setTimeout(() => {
      window.location.href = "/login";
    }, 1500);
  };

  // ✅ deactivate
  const handleDeactivate = async () => {
    try {
      await dispatch(deactivateAccount()).unwrap();
      toast.success("Account deactivated successfully!");
    } catch (err) {
      toast.error(err || "Failed to deactivate account");
    }
  };

  // ✅ show success toast
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearSuccessMessage());
    }
  }, [successMessage, dispatch]);

  // ✅ loading & error states
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
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
        {/* ================= Sidebar ================= */}
        <div className="w-full md:w-64 bg-gray-100 flex-shrink-0 ml-2">
          <div className="p-6 flex flex-col items-center">
            <div className="w-20 h-20 bg-gray-300 rounded-full mb-4 flex items-center justify-center overflow-hidden">
              {formData.image ? (
                <img
                  src={URL.createObjectURL(formData.image)}
                  alt="profile"
                  className="w-20 h-20 object-cover rounded-full"
                />
              ) : profileImage ? (
                <img
                  src={profileImage}
                  alt="profile"
                  className="w-20 h-20 object-cover rounded-full"
                />
              ) : (
                <span className="text-2xl font-bold text-white">
                  {displayName ? displayName.charAt(0).toUpperCase() : "U"}
                </span>
              )}
            </div>

            <h2 className="font-bold text-lg mb-6 text-center">
              Hello {displayName?.full|| "User"}
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
                className="px-6 py-3 hover:bg-gray-100 cursor-pointer text-center md:text-left"
              >
                {item}
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-2 mt-6 mx-6">
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
            >
              Logout
            </button>
            <button
              onClick={handleDeactivate}
              className="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-800"
            >
              Deactivate Account
            </button>
          </div>
        </div>

        {/* ================= Main Content ================= */}
        <div className="flex-1 p-4 md:p-10">
          <h1 className="text-xl font-semibold mb-6 text-center md:text-left">
            Personal Information
          </h1>

          <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto space-y-4">
            {/* Name */}
            <div>
              <label className="block text-gray-600 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-gray-600 mb-1">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-600 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />
            </div>

            {/* Address Fields */}
            <div>
              <label className="block text-gray-600 mb-1">House No.</label>
              <input
                type="text"
                name="address.HNo"
                value={formData.address.HNo}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Building Name</label>
              <input
                type="text"
                name="address.buildingName"
                value={formData.address.buildingName}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Street</label>
              <input
                type="text"
                name="address.street"
                value={formData.address.street}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Area</label>
              <input
                type="text"
                name="address.area"
                value={formData.address.area}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Landmark</label>
              <input
                type="text"
                name="address.landmark"
                value={formData.address.landmark}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Town/City</label>
              <input
                type="text"
                name="address.townCity"
                value={formData.address.townCity}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">State</label>
              <input
                type="text"
                name="address.state"
                value={formData.address.state}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Pincode</label>
              <input
                type="text"
                name="address.pincode"
                value={formData.address.pincode}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />
            </div>

            {/* Upload */}
            <div>
              <label className="block text-gray-600 mb-1">Profile Picture</label>
              <input type="file" onChange={handleImageChange} />
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 mt-4"
            >
              Save
            </button>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default Account;
