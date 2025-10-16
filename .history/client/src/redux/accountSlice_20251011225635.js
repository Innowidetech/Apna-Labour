import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://apnalabour.onrender.com/api/customer";

// Fetch profile
export const fetchCustomerProfile = createAsyncThunk(
  "account/fetchCustomerProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/profile`, {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      // ✅ Return only the actual profile object
      return response.data.profile;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch profile");
    }
  }
);

// Update profile
export const updateCustomerProfile = createAsyncThunk(
  "account/updateCustomerProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`${BASE_URL}/profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      // ✅ Backend returns updated customer in response.data.customer
      return response.data.customer;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update profile");
    }
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState: {
    profile: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch profile
      .addCase(fetchCustomerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchCustomerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update profile
      .addCase(updateCustomerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCustomerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateCustomerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default accountSlice.reducer;
