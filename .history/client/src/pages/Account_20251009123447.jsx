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
      townCity: "",
      state: "",
      pincode: "",
    },
    image: null,
    imageUrl: "", // for existing image
  });

  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    dispatch(fetchAccountProfile());
  }, [dispatch]);

  useEffect(() => {
    if (!accountData) return;

    setFormData({
      name: accountData?.name || "",
      gender: accountData?.gender || "",
      phoneNumber: accountData?.phoneNumber || "",
      email: accountData?.email || "",
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
      imageUrl: accountData?.image || "",
    });

    setDisplayName(
      accountData?.name ||
        accountData?.email ||
        accountData?.phoneNumber ||
        "User"
    );
  }, [accountData]);

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
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSave = async () => {
    try {
      await dispatch(updateAccountProfile(formData)).unwrap();
      await dispatch(fetchAccountProfile());
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    setTimeout(() => {
      window.location.href = "/login";
    }, 1500);
  };

  const handleDeactivate = async () => {
    try {
      await dispatch(deactivateAccount()).unwrap();
      toast.success("Account deactivated successfully!");
      localStorage.removeItem("token");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch (err) {
      toast.error(err || "Failed to deactivate account");
    }
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearSuccessMessage());
    }
  }, [successMessage, dispatch]);

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
              ) : formData.imageUrl ? (
                <img
                  src={
                    formData.imageUrl.startsWith("http")
                      ? formData.imageUrl
                      : `https://apnalabour.onrender.com${formData.imageUrl}`
                  }
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
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
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

            {/* Address */}
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
