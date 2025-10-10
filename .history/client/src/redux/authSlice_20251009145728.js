import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Login thunk
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://apnalabour.onrender.com/api/auth/login",
        payload,
        { headers: { "Content-Type": "application/json", Accept: "application/json" } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// Verify OTP thunk
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ userId, otp }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://apnalabour.onrender.com/api/auth/verify-otp",
        { userId, otp },
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data; // { token, user }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "OTP verification failed");
    }
  }
);

// Resend OTP thunk
export const resendOtp = createAsyncThunk(
  "auth/resendOtp",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://apnalabour.onrender.com/api/auth/resend-otp",
        { userId },
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Resend OTP failed");
    }
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  userId: localStorage.getItem("userId") || null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.userId = action.payload.userId || state.userId;

      if (state.token) localStorage.setItem("token", state.token);
      if (state.user) localStorage.setItem("user", JSON.stringify(state.user));
      if (state.userId) localStorage.setItem("userId", state.userId);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.userId = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("userId");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userId = action.payload?.userId || null;
        localStorage.setItem("userId", state.userId);
        toast.success("OTP sent successfully!");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(verifyOtp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload?.user || null;
        state.token = action.payload?.token || null;

        if (state.token) localStorage.setItem("token", state.token);
        if (state.user) localStorage.setItem("user", JSON.stringify(state.user));

        toast.success("Login successful!");
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
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
