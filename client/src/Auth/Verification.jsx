import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearStatus } from "../redux/adminloginSlice"; // adjust path as needed
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Verification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 🔹 Get email from navigation state (sent from ForgotPassword)
  const prefilledEmail = location.state?.email || "";

  const [formData, setFormData] = useState({
    email: prefilledEmail,
    otp: "",
    newPassword: "",
  });

  const { loading, error, resetSuccess } = useSelector(
    (state) => state.adminLogin
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.otp || !formData.newPassword) {
      toast.error("Please fill all fields");
      return;
    }

    // 🔹 Dispatch Reset Password API
    dispatch(
      resetPassword({
        email: formData.email,
        otp: formData.otp,
        newPassword: formData.newPassword,
      })
    );
  };

  // 🔹 Handle success and errors
  useEffect(() => {
    if (resetSuccess) {
      toast.success("Password updated successfully!");
      navigate("/admin-login");
      dispatch(clearStatus());
    }
    if (error) {
      toast.error(error);
      dispatch(clearStatus());
    }
  }, [resetSuccess, error, dispatch, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="w-full max-w-md bg-white rounded-lg p-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Verification
        </h2>
        <p className="text-gray-500 mb-8 text-sm">
          Enter your 6-digit code that you received on your email.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="text-left">
            <label className="block text-sm text-gray-600 mb-1">
              Email ID:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-200 rounded-md outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter your email ID"
              required
            />
          </div>

          {/* OTP */}
          <div className="text-left">
            <label className="block text-sm text-gray-600 mb-1">Enter OTP:</label>
            <input
              type="text"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-200 rounded-md outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter 6-digit OTP"
              required
            />
          </div>

          {/* New Password */}
          <div className="text-left">
            <label className="block text-sm text-gray-600 mb-1">
              Enter new password:
            </label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-200 rounded-md outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter your new password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md text-white font-medium transition-all ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#002F3F] hover:bg-[#00485f]"
            }`}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>

        <Link
          to="/admin-login"
          className="mt-4 inline-block text-sm text-blue-700 hover:underline"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default Verification;
