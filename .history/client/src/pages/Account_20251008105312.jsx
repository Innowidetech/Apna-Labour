import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAccountProfile,
  updateAccountProfile,
  clearSuccessMessage,
} from "../redux/accountSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Account = () => {
  const dispatch = useDispatch();
  const { accountData, loading, error, successMessage } = useSelector(
    (state) => state.account || {}
  );

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

  useEffect(() => {
    dispatch(fetchAccountProfile());
  }, [dispatch]);

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

  // ✅ Handle Save
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

  // ✅ Show toast when success
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
        {/* Left Sidebar and Main Form (unchanged) */}
        {/* ... Keep your same UI here ... */}

        <button
          onClick={handleSave}
          className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 mt-4"
        >
          Save
        </button>
      </div>
      <toast.Container />
    </>
  );
};

export default Account;
