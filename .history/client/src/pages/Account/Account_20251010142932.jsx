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

  // Track active menu
  const [activeMenu, setActiveMenu] = useState("My Account");

  useEffect(() => {
    dispatch(fetchAccountProfile());
  }, [dispatch]);

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

  const handleLogout = () => {
    // Your logout logic here
    toast.info("Logged out");
  };

  const handleDeactivate = () => {
    // Your deactivate logic here
    toast.info("Account deactivated");
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

  // Render content based on activeMenu
  const renderContent = () => {
    switch (activeMenu) {
      case "My Account":
        return (
          <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto space-y-4">
            {/* Put your existing account form here */}
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
            {/* ... other form fields ... */}
            <button
              onClick={handleSave}
              className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 mt-4"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        );
      case "My Bookings":
        return <div>Show My Bookings here</div>;
      case "Payments":
        return <div>Show Payments here</div>;
      case "My rating & reviews":
        return <div>Show Ratings & Reviews here</div>;
      case "Help Center":
        return <div>Show Help Center here</div>;
      case "All notification":
        return <div>Show Notifications here</div>;
      default:
        return <div>Select a menu item</div>;
    }
  };

  return (
    <>
      <div className="flex p-4 md:p-10 bg-gray-100 min-h-screen gap-4">
        {/* Sidebar */}
        <AccountSidebar
          activeMenu={activeMenu}
          handleMenuClick={setActiveMenu}
          displayData={{ name: formData.name, image: formData.image || accountData?.image }}
          handleLogout={handleLogout}
          handleDeactivate={handleDeactivate}
        />

        {/* Main content */}
        <div className="flex-grow">{renderContent()}</div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default Account;
