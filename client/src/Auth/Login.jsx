// src/auth/Login.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, verifyOtp, resendOtp, setUser } from "../redux/authSlice"; // ✅ added resendOtp
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import jwt_decode from "jwt-decode";

const Login = () => {
  const [step, setStep] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(60); // ⏱ for resend OTP

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, user, userId } = useSelector((state) => state.auth);

  // 🔹 Handle OTP change
  const handleOtpChange = (e, index) => {
    if (isNaN(e.target.value)) return;
    let newOtp = [...otp];
    newOtp[index] = e.target.value.slice(-1);
    setOtp(newOtp);

    if (e.target.value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  // 🔹 Step 1: Handle Continue (Login)
  const handleContinue = () => {
    if (!inputValue) return;

    let payload = {};
    if (inputValue.includes("@")) {
      payload = { email: inputValue.trim() };
    } else {
      payload = { mobileNumber: inputValue.trim() };
    }

    dispatch(loginUser(payload)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        setStep(2);
        setTimer(60); // reset timer
        toast.info("OTP sent successfully!");
      } else {
        toast.error("Failed to send OTP, please try again.");
      }
    });
  };

  // 🔹 Step 2: Verify OTP
  const handleVerifyOtp = () => {
    const otpCode = otp.join("");
    if (!otpCode || otpCode.length < 6) return;

    if (!userId) {
      toast.error("User ID missing, please try login again.");
      return;
    }

    dispatch(verifyOtp({ userId, otp: otpCode })).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Login successful! 🎉");
        navigate("/");
      } else {
        toast.error("Invalid OTP, please try again.");
      }
    });
  };

  // 🔹 Resend OTP
  const handleResendOtp = () => {
    if (!userId) {
      toast.error("User ID missing, please try login again.");
      return;
    }

    dispatch(resendOtp(userId)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        setTimer(60); // reset timer
        toast.success("OTP resent successfully!");
      } else {
        toast.error("Failed to resend OTP, please try again.");
      }
    });
  };

  // 🔹 Countdown effect
  useEffect(() => {
    if (step === 2 && timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    }
  }, [step, timer]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F4F7FB] px-4">
      <div className="bg-white rounded-2xl shadow-2xl flex w-full max-w-4xl overflow-hidden relative">
        {/* Left Section (only for Step 1, Desktop) */}
        {step === 1 && (
          <div className="hidden md:flex flex-col items-center justify-center w-1/2 bg-[#F8FBFF] p-10">
            <h1 className="text-3xl font-bold text-blue-900 mb-4">
              Apna Labour
            </h1>
            <p className="text-base text-gray-700 text-center leading-relaxed">
              Join us with your mobile number or email and book your first
              service today!
            </p>
            <div className="w-64 h-40 bg-gray-200 mt-8 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">[Image Here]</span>
            </div>
          </div>
        )}

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-8 relative">
          {/* Close Button */}
          <button className="absolute right-4 top-4 text-gray-500 hover:text-gray-700">
            <X size={22} />
          </button>

          <h1 className="text-2xl font-bold text-center text-blue-900 mb-6">
            Apna Labour
          </h1>

          {/* Step 1: Email / Mobile */}
          {step === 1 && (
            <>
              <h2 className="text-lg font-semibold text-center mb-4">
                Let’s get started with Apna Labour
              </h2>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What’s your phone number or email?
              </label>
              <input
                type="text"
                placeholder="Enter phone number or email"
                className="w-full border-b border-gray-400 py-2 outline-none mb-6"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />

              <button
                onClick={handleContinue}
                disabled={!inputValue || isLoading}
                className={`w-full py-3 rounded-md font-semibold transition ${inputValue
                  ? "bg-blue-900 text-white hover:bg-blue-800"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
              >
                {isLoading ? "Processing..." : "Continue"}
              </button>

              <p className="text-xs text-gray-500 mt-3 text-center">
                By continuing you agree to our{" "}
                <span className="font-semibold">Terms of Service</span> &{" "}
                <span className="font-semibold">Privacy Policy</span>.
              </p>

              {/* <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Existing User?{" "}
                  <span className="text-blue-900 font-semibold cursor-pointer">
                    Login
                  </span>
                </p>
              </div> */}

              {/* Google Login */}
              <div className="mt-2 w-full">
                <GoogleLogin
                  onSuccess={async (credentialResponse) => {
                    try {
                      // 1️⃣ Send Google idToken to backend
                      const res = await axios.post(
                        "https://apnalabour.onrender.com/api/auth/login",
                        { idToken: credentialResponse.credential },
                        { headers: { "Content-Type": "application/json" } }
                      );

                      const { token, user } = res.data;

                      console.log("✅ Google JWT token:", token);
                      console.log("✅ Google user object:", user);

                      // 2️⃣ Save backend JWT to localStorage
                      if (token) {
                        localStorage.setItem("token", token);
                      }
                      if (user) {
                        localStorage.setItem("user", JSON.stringify(user));
                      }

                      // 3️⃣ Optional: update Redux state
                      dispatch(setUser({ user, token }));

                      toast.success(`Welcome ${user.name || user.email}!`);
                      navigate("/"); // redirect after login
                    } catch (err) {
                      console.error("Google login failed:", err.response?.data || err.message);
                      toast.error("Google login failed, please try again.");
                    }
                  }}
                  onError={() => {
                    toast.error("Google login failed, please try again.");
                  }}
                  width={300}
                  shape="rectangular"
                  text="continue_with"
                  theme="outline"
                />
              </div>
            </>
          )}

          {/* Step 2: OTP */}
          {step === 2 && (
            <>
              <h2 className="text-lg font-semibold text-center mb-6">
                Enter the 6-digit code sent to:
                <br />
                <span className="text-blue-900">{inputValue}</span>
              </h2>

              <div className="flex justify-center gap-3 mb-4">
                {otp.map((value, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength="1"
                    value={value}
                    onChange={(e) => handleOtpChange(e, index)}
                    className="w-12 h-12 border rounded-md text-center text-lg font-bold focus:ring-2 focus:ring-blue-500"
                  />
                ))}
              </div>

              {/* Resend OTP */}
              <div className="text-center mb-6 text-sm text-gray-600">
                {timer > 0 ? (
                  <span>
                    Resend OTP in:{" "}
                    <span className="font-bold text-gray-800">
                      00:{timer.toString().padStart(2, "0")}
                    </span>
                  </span>
                ) : (
                  <button
                    onClick={handleResendOtp}
                    className="text-blue-900 font-semibold"
                  >
                    RESEND OTP
                  </button>
                )}
              </div>

              <button
                onClick={handleVerifyOtp}
                disabled={isLoading}
                className="w-full py-3 rounded-md font-semibold bg-blue-900 text-white hover:bg-blue-800 transition"
              >
                {isLoading ? "Verifying..." : "Continue"}
              </button>

              <p className="text-xs text-gray-500 mt-3 text-center">
                By continuing you agree to our{" "}
                <span className="font-semibold">Terms of Service</span> &{" "}
                <span className="font-semibold">Privacy Policy</span>.
              </p>

              {/* Google Login */}
              {/* Google Login - Step 1 */}

              {/* Google Login - Step 2 */}

            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
