// AccountPage.jsx
import React, { useState } from "react";

const Account = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saved data:", formData);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-3xl">
        {/* Top Profile Info */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-white text-2xl font-bold">
            AJ
          </div>
          <div>
            <h2 className="font-bold text-lg">Hello Andrew Johnson</h2>
            <div className="flex gap-4 text-gray-600 mt-2">
              {["My Account", "My Bookings", "Payments", "My Reviews", "Help Center", "Notifications"].map((item) => (
                <span key={item} className="hover:text-blue-600 cursor-pointer text-sm">{item}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-semibold">Personal Information</h1>
            <button className="text-blue-600 underline">Change profile information</button>
          </div>

          {/* Profile picture */}
          <div className="flex items-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center mr-4 text-white text-2xl">
              AJ
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

            <div>
              <input
                type="text"
                name="street"
                placeholder="Street/Locality"
                value={formData.street}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 mt-2"
              />
            </div>

            <div>
              <input
                type="text"
                name="landmark"
                placeholder="Landmark (e.g., near Apollo Hospital)"
                value={formData.landmark}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 mt-2"
              />
            </div>

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
              <button className="text-blue-600 underline">Deactivate account</button>
              <button className="text-red-600 underline">Delete account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
