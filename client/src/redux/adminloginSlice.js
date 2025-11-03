import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base URLs
const LOGIN_URL = "https://apnalabour.onrender.com/api/auth/admin/login";
const FORGOT_URL = "https://apnalabour.onrender.com/api/auth/forgot-password";
const RESET_URL = "https://apnalabour.onrender.com/api/auth/reset-password";

// 🔹 Admin Login
export const adminLogin = createAsyncThunk(
  "adminLogin/login",
  async ({ ID, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(LOGIN_URL, { ID, password });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  }
);

// 🔹 Forgot Password
export const forgotPassword = createAsyncThunk(
  "adminLogin/forgotPassword",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await axios.post(FORGOT_URL, { email });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send reset OTP."
      );
    }
  }
);

// 🔹 Reset Password
export const resetPassword = createAsyncThunk(
  "adminLogin/resetPassword",
  async ({ email, otp, newPassword }, { rejectWithValue }) => {
    try {
      const response = await axios.post(RESET_URL, { email, otp, newPassword });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to reset password."
      );
    }
  }
);

// 🔹 Initial state
const initialState = {
  admin: null,
  token: null,
  loading: false,
  error: null,
  success: false,
  forgotSuccess: false,
  resetSuccess: false,
};

// 🔹 Slice
const adminloginSlice = createSlice({
  name: "adminLogin",
  initialState,
  reducers: {
    logoutAdmin: (state) => {
      state.admin = null;
      state.token = null;
      state.success = false;
      localStorage.removeItem("adminToken");
    },
    clearStatus: (state) => {
      state.error = null;
      state.forgotSuccess = false;
      state.resetSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔸 Admin Login
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.admin = action.payload;
        state.token = action.payload?.token || null;

        if (state.token) {
          localStorage.setItem("adminToken", state.token);
        }
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔸 Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.forgotSuccess = false;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
        state.forgotSuccess = true;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔸 Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.resetSuccess = false;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.resetSuccess = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutAdmin, clearStatus } = adminloginSlice.actions;
export default adminloginSlice.reducer;
