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
  const { accountData, loading, error, successMessage } = useSelector(
    (state) => state.account
  );

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    email: "",
    phoneNumber: "",
    image: "",
    address: {
      HNo: "",
      buildingName: "",
      street: "",
      area: "",
      landmark: "",
      townCity: "",
      pincode: "",
      state: "",
    },
  });

  const [previewImage, setPreviewImage] = useState(null);

  // ✅ Fetch profile on mount
  useEffect(() => {
    dispatch(fetchAccountProfile());
  }, [dispatch]);

  // ✅ When API data arrives, populate the form
  useEffect(() => {
    if (accountData) {
      setFormData({
        name: accountData.name || "",
        gender: accountData.gender || "",
        email: accountData.email || "",
        phoneNumber: accountData.phoneNumber || "",
        image: accountData.image || "",
        address: {
          HNo: accountData.address?.HNo || "",
          buildingName: accountData.address?.buildingName || "",
          street: accountData.address?.street || "",
          area: accountData.address?.area || "",
          landmark: accountData.address?.landmark || "",
          townCity: accountData.address?.townCity || "",
          pincode: accountData.address?.pincode || "",
          state: accountData.address?.state || "",
        },
      });
      setPreviewImage(accountData.image);
    }
  }, [accountData]);

  // ✅ Show toast for messages
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearSuccessMessage());
    }
    if (error) {
      toast.error(error);
    }
  }, [successMessage, error, dispatch]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // ✅ Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
    setPreviewImage(URL.createObjectURL(file));
  };

  // ✅ Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateAccountProfile(formData));
  };

  // ✅ Deactivate account
  const handleDeactivate = () => {
    if (window.confirm("Are you sure you want to deactivate your account?")) {
      dispatch(deactivateAccount());
    }
  };

  const displayName = accountData?.name;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <ToastContainer position="top-center" />

      <h2 className="font-bold text-2xl mb-6 text-center text-gray-800">
        Hello {displayName || "User"}
      </h2>

      {loading && <p className="text-center text-blue-600">Loading...</p>}

      {!loading && (
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Left Section */}
          <div>
            {/* Profile Image */}
            <div className="flex flex-col items-center mb-6">
              <img
                src={previewImage || "/default-avatar.png"}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-2 border-gray-300 mb-3"
              />
              <label className="cursor-pointer bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
                Change Photo
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>

            {/* Basic Info */}
            <div className="space-y-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  readOnly
                  className="w-full border rounded-md px-3 py-2 bg-gray-100"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
          </div>

          {/* Right Section — Address */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Address Details
            </h3>

            {Object.keys(formData.address).map((key) => (
              <div key={key}>
                <label className="block font-semibold text-gray-700 mb-1 capitalize">
                  {key}
                </label>
                <input
                  type="text"
                  name={`address.${key}`}
                  value={formData.address[key]}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2"
                  placeholder={`Enter ${key}`}
                />
              </div>
            ))}

            <div className="flex gap-4 mt-6">
              <button
                type="submit"
                className="w-1/2 bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>

              <button
                type="button"
                onClick={handleDeactivate}
                className="w-1/2 bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
              >
                Deactivate Account
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Account;
