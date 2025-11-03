import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "../redux/adminloginSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success, token } = useSelector(
    (state) => state.adminLogin
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(adminLogin({ ID: formData.userId, password: formData.password }));
  };

  useEffect(() => {
    if (success && token) {
      toast.success("Login successful!");

      // ✅ Save token and role for PrivateRoute protection
      localStorage.setItem("token", token);
      localStorage.setItem("userRole", "admin");

      // ✅ Redirect after login
      setTimeout(() => {
        navigate("/admin/dashboard-home");
      }, 1500);
    }

    if (error) {
      toast.error(error);
    }
  }, [success, error, token, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white relative px-4">
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />

      {/* Login Card */}
      <div className="w-full max-w-md bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-bold text-black mb-1">Welcome Back!</h2>
        <p className="text-black font-semibold mb-6">
          Log in to access your dashboard.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* User ID */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">User ID</label>
            <input
              type="text"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-[#D9D9D9] rounded-md outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter your user ID"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-[#D9D9D9] rounded-md outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-600 hover:text-gray-800"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="text-right mt-1">
              <Link
                to="/forgot-password"
                className="text-sm text-gray-500 hover:text-blue-600"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-full text-white transition-all ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#002F3F] hover:bg-[#00485f]"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
