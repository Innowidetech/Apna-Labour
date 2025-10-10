// src/pages/AccountPage.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccountProfile } from "../";

const Account = () => {
  const dispatch = useDispatch();
  const { accountData, loading, error } = useSelector((state) => state.account);

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
    }
  }, [accountData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saved data:", formData);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg font-medium">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600">
        {error}
      </div>
    );
  }

  return (
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
          <button className="text-blue-600 underline">
            Change profile information
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl">
          {/* Profile picture */}
          <div className="flex items-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center mr-4">
              <span className="text-2xl text-white">
                {formData.fullName
                  ? formData.fullName.charAt(0).toUpperCase()
                  : "U"}
              </span>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Gender</label>
              <div className="flex gap-6 items-center">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={handleChange}
                  />
                  Female
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={handleChange}
                  />
                  Male
                </label>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Mobile Number</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
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

            {/* Address Section */}
            <h2 className="text-lg font-semibold mt-6 mb-2">Manage Address</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="house"
                placeholder="House/Flat No."
                value={formData.house}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2"
              />
              <input
                type="text"
                name="building"
                placeholder="Building/Apartment"
                value={formData.building}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2"
              />
            </div>

            <input
              type="text"
              name="street"
              placeholder="Street/Locality"
              value={formData.street}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 mt-2"
            />

            <input
              type="text"
              name="landmark"
              placeholder="Landmark (e.g., near Apollo Hospital)"
              value={formData.landmark}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 mt-2"
            />

            <div className="grid grid-cols-3 gap-4">
              <input
                type="text"
                name="pincode"
                placeholder="6-digit pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2"
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
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

            <div className="flex justify-between mt-4 text-sm">
              <button className="text-blue-600 underline">
                Deactivate account
              </button>
              <button className="text-red-600 underline">Delete account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
