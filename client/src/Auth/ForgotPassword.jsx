import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, clearStatus } from "../redux/adminloginSlice"; // adjust path as needed
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, forgotSuccess } = useSelector(
    (state) => state.adminLogin
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email address");

    // 🔹 Dispatch forgot password API
    dispatch(forgotPassword({ email }));
  };

  // 🔹 Handle success & navigation
  useEffect(() => {
    if (forgotSuccess) {
      toast.success("OTP sent successfully to your email");
      navigate("/verify", { state: { email } }); // pass email to verify page
      dispatch(clearStatus());
    }
    if (error) {
      toast.error(error);
      dispatch(clearStatus());
    }
  }, [forgotSuccess, error, dispatch, navigate, email]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="w-full max-w-md bg-white p-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Forgot Password
        </h2>
        <p className="text-gray-500 mb-8 text-sm">
          Enter your email ID for verification process, we will send an 8-digit
          code to your email ID.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="text-left">
            <label className="block text-sm text-gray-600 mb-1">
              Email ID:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-[#D9D9D9] rounded-md outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter your email ID"
              required
            />
          </div>

          {/* Continue Button */}
          <button
            type="submit"
            disabled={loading}
            className={`p-2  rounded-md font-medium text-white transition-all ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#002F3F] hover:bg-[#00485f]"
            }`}
          >
            {loading ? "Sending OTP..." : "Continue"}
          </button>
        </form>

        {/* Back to Login Link */}
        <div className="mt-4 text-center">
          <Link
            to="/admin-login"
            className="text-sm text-blue-700 hover:underline"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
