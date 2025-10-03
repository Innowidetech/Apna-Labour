import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// ✅ Async thunk for login (request OTP)
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload, { rejectWithValue }) => {
    try {
      console.log("🚀 Sending payload to login:", payload);
      const response = await axios.post(
        "https://apnalabour.onrender.com/api/auth/login",
        payload, // { mobileNumber OR email }
        {
          headers: { "Content-Type": "application/json", Accept: "application/json" },
        }
      );
      console.log("✅ Response:", response.data); // { message, userId }
      return response.data;
    } catch (error) {
      console.error("❌ Login API Error:", error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data?.message || "Login failed, please try again"
      );
    }
  }
);

// ✅ Async thunk for OTP verification
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ userId, otp }, { rejectWithValue }) => {
    try {
      console.log("🚀 Sending payload to verify OTP:", { userId, otp });

      const response = await axios.post(
        "https://apnalabour.onrender.com/api/auth/verify-otp",
        { userId, otp }, // ✅ send both userId + otp
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("✅ OTP Verify Response:", response.data);
      return response.data; // { token, user }
    } catch (error) {
      console.error("❌ OTP API Error:", error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data?.message || "OTP verification failed"
      );
    }
  }
);

// ✅ Async thunk for Resend OTP
export const resendOtp = createAsyncThunk(
  "auth/resendOtp",
  async (userId, { rejectWithValue }) => {
    try {
      console.log("🚀 Sending payload to resend OTP:", { userId });

      const response = await axios.post(
        "https://apnalabour.onrender.com/api/auth/resend-otp",
        { userId }, // ✅ API expects { userId }
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("✅ Resend OTP Response:", response.data);
      return response.data; // { message }
    } catch (error) {
      console.error("❌ Resend OTP API Error:", error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data?.message || "Resend OTP failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    userId: null, // store userId from step 1
    isLoading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      // Save to localStorage
      if (state.token) {
        localStorage.setItem("token", state.token);
      }
      if (state.user) {
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.userId = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Login (Send OTP)
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userId = action.payload?.userId || null; // ✅ store userId
        toast.success("OTP sent successfully!");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      // 🔹 Verify OTP
      .addCase(verifyOtp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload?.user || null;
        state.token = action.payload?.token || null;

        // Save to localStorage
        if (state.token) {
          localStorage.setItem("token", state.token);
        }
        if (state.user) {
          localStorage.setItem("user", JSON.stringify(state.user));
        }

        toast.success("Login successful!");
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      // 🔹 Resend OTP
      .addCase(resendOtp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resendOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success(action.payload?.message || "OTP resent successfully!");
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;