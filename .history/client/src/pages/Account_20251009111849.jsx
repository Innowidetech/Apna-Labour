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

  // Redux state
  const accountData = useSelector((state) => state.account?.accountData);
  const loading = useSelector((state) => state.account?.loading);
  const error = useSelector((state) => state.account?.error);
  const successMessage = useSelector((state) => state.account?.successMessage);

  // Local state for form
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

  // Static display for sidebar
  const [displayName, setDisplayName] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  // Fetch profile on mount
  useEffect(() => {
    dispatch(fetchAccountProfile());
  }, [dispatch]);

  // Populate form when accountData is available
  useEffect(() => {
    if (!accountData) return;

    setFormData({
      name: accountData?.name || "",
      gender: accountData?.gender || "",
      phoneNumber: accountData?.phoneNumber || "",
      email: accountData?.email || "",
      address: {
        HNo: accountData?.address?.HNo || "",
        street: accountData?.address?.street || "",
        area: accountData?.address?.area || "",
        landmark: accountData?.address?.landmark || "",
        buildingName: accountData?.address?.buildingName || "",
        townCity: accountData?.address?.townCity || "",
        state: accountData?.address?.state || "",
        pincode: accountData?.address?.pincode || "",
      },
      image: null,
    });

    // Static sidebar name and profile image
    setDisplayName(accountData?.name || "");
    setProfileImage(accountData?.image || null);
  }, [accountData]);

  // Handle input changes
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

  // Handle image upload
  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  // Save profile
  const handleSave = async () => {
    try {
      await dispatch(updateAccountProfile(formData)).unwrap();
      toast.success("Profile updated successfully!");
      await dispatch(fetchAccountProfile());
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    setTimeout(() => {
      window.location.href = "/login";
    }, 1500);
  };

  // Deactivate account
  const handleDeactivate = async () => {
    try {
      await dispatch(deactivateAccount()).unwrap();
      toast.success("Account deactivated successfully!");
    } catch (err) {
      toast.error(err || "Failed to deactivate account");
    }
  };

  // Show success toast
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearSuccessMessage());
    }
  }, [successMessage, dispatch]);

  // Loading & error states
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
        {/* Sidebar */}
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
              Hello {displayName || "User"}
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

        {/* Main Content */}
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

            {/* Address */}
            {Object.entries(formData.address).map(([key, value]) => (
              <div key={key}>
                <label className="block text-gray-600 mb-1 capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  type="text"
                  name={`address.${key}`}
                  value={value}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                />
              </div>
            ))}

            {/* Profile Picture Upload */}
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
