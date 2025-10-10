import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAccountProfile,
  updateAccountProfile,
  clearSuccessMessage,
} from "../redux/accountSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Account = () => {
  const dispatch = useDispatch();

  // ✅ Use separate selectors to avoid unnecessary rerenders
  const accountData = useSelector((state) => state.account.accountData);
  const loading = useSelector((state) => state.account.loading);
  const error = useSelector((state) => state.account.error);
  const successMessage = useSelector((state) => state.account.successMessage);

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

  // Fetch profile on mount
  useEffect(() => {
    dispatch(fetchAccountProfile());
  }, [dispatch]);

  // Populate form when data is available
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
    const updatedProfile = {
      fullName: formData.fullName,
      gender: formData.gender,
      mobile: formData.mobile,
      email: formData.email,
      address: {
        house: formData.house,
        building: formData.building,
        street: formData.street,
        landmark: formData.landmark,
        pincode: formData.pincode,
        city: formData.city,
        state: formData.state,
      },
    };

    dispatch(updateAccountProfile(updatedProfile));
  };

  // Show toast on success
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
      <div className="flex min-h-screen bg-gray-100">
        {/* === LEFT SIDEBAR === */}
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

        {/* === MAIN CONTENT === */}
        <div className="flex-1 p-10">
          {/* Keep your existing main form UI here */}
          {/* Example Save button */}
          <button
            onClick={handleSave}
            className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 mt-4"
          >
            Save
          </button>
        </div>
      </div>

      {/* ✅ ToastContainer must be rendered once at root or inside component */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default Account;
