import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAccountProfile,
  updateAccountProfile,
  deactivateAccount,
  deleteAccount,
  clearSuccessMessage,
} from "../../redux/accountSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AccountSidebar from "./AccountSidebar";

const Account = () => {
  const dispatch = useDispatch();
  const { accountData, loading, error, successMessage } = useSelector(
    (state) => state.account || {}
  );

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

  // Fetch account on mount
  useEffect(() => {
    dispatch(fetchAccountProfile());
  }, [dispatch]);

  // Populate form when accountData changes
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

  // Show toast for success messages
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

  // Save profile
  const handleSave = async () => {
    toast.info("Saving your changes...", { autoClose: 1000 });
    try {
      await dispatch(updateAccountProfile(formData)).unwrap();
      await dispatch(fetchAccountProfile());
    } catch (err) {
      toast.error(err || "Failed to update profile");
    }
  };

  // Deactivate account
  const handleDeactivate = async () => {
    if (!window.confirm("Are you sure you want to deactivate your account?")) return;
    toast.info("Processing account deactivation...", { autoClose: 1000 });
    try {
      await dispatch(deactivateAccount()).unwrap();
    } catch (err) {
      toast.error(err || "Failed to deactivate account");
    }
  };

  // Delete account
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account permanently?")) return;
    toast.info("Deleting your account...", { autoClose: 1000 });
    try {
      await dispatch(deleteAccount()).unwrap();
    } catch (err) {
      toast.error(err || "Failed to delete account");
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
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <AccountSidebar displayData={accountData} />

        {/* Main Content */}
        <div className="flex-1 p-6 md:p-10 bg-white">
          {/* Top Right Edit Link */}
          <div className="flex justify-end mb-4">
            <button className="text-sm text-blue-600 hover:underline">
              Change profile information
            </button>
          </div>

          {/* Title */}
          <h1 className="text-lg font-semibold mb-6">Personal Information</h1>

          {/* Profile Image */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center text-gray-600">
                {formData.image ? (
                  <img
                    src={URL.createObjectURL(formData.image)}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : accountData?.image ? (
                  <img
                    src={accountData.image}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl font-bold">
                    {formData.name ? formData.name.charAt(0).toUpperCase() : "U"}
                  </span>
                )}
              </div>
              <label className="absolute bottom-0 right-0 bg-white border border-gray-300 rounded-full p-1 cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </label>
            </div>
          </div>

          {/* Form */}
          <div className="max-w-3xl mx-auto space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">Gender</label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-1 text-sm">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={formData.gender === "Female"}
                    onChange={handleChange}
                  />
                  Female
                </label>
                <label className="flex items-center gap-1 text-sm">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === "Male"}
                    onChange={handleChange}
                  />
                  Male
                </label>
              </div>
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">Mobile Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
              />
            </div>

            {/* Email ID */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">Email ID</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
              />
            </div>

            {/* Address Section */}
            <h2 className="text-sm font-semibold mt-6">Manage Address</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              <input
                type="text"
                name="address.HNo"
                placeholder="House/Flat No."
                value={formData.address.HNo}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 text-sm"
              />
              <input
                type="text"
                name="address.area"
                placeholder="Building/Apartment"
                value={formData.address.area}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 text-sm"
              />
            </div>

            <input
              type="text"
              name="address.street"
              placeholder="Street/Locality"
              value={formData.address.street}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 text-sm w-full mt-3"
            />

            <input
              type="text"
              name="address.landmark"
              placeholder="Landmark"
              value={formData.address.landmark}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 text-sm w-full mt-3"
            />

            <div className="grid grid-cols-3 gap-3 mt-3">
              <input
                type="text"
                name="address.pincode"
                placeholder="6-digit pincode"
                value={formData.address.pincode}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 text-sm"
              />
              <input
                type="text"
                name="address.townCity"
                placeholder="City"
                value={formData.address.townCity}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 text-sm"
              />
              <input
                type="text"
                name="address.state"
                placeholder="State"
                value={formData.address.state}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 text-sm"
              />
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              disabled={loading}
              className="w-full bg-gray-700 text-white py-2 rounded-md mt-6 hover:bg-gray-800 text-sm"
            >
              {loading ? "Saving..." : "Save"}
            </button>

            {/* Deactivate / Delete Links */}
            <div className="text-center mt-4 space-y-1">
              <button
                onClick={handleDeactivate}
                className="text-sm text-blue-600 hover:underline block"
              >
                Deactivate account
              </button>
              <button
                onClick={handleDelete}
                className="text-sm text-red-600 hover:underline block"
              >
                Delete account
              </button>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default Account;
