import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://apnalabour.onrender.com/api/customer";

// Fetch customer profile
export const fetchCustomerProfile = createAsyncThunk(
  "account/fetchCustomerProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // ✅ Get token
      const response = await axios.get(`${BASE_URL}/profile`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ Include token
        },
      });
      return response.data.profile; // ✅ Return only inner profile
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch profile");
    }
  }
);

// Optional: Update customer profile (with image support)
export const updateCustomerProfile = createAsyncThunk(
  "account/updateCustomerProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`${BASE_URL}/profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.customer; // backend returns updated customer
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
      // Fetch
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
      // Update
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
