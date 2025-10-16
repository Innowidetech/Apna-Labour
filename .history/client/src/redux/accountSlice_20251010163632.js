// src/redux/accountSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ------------------------------------
// Thunk: Fetch Account Profile
// ------------------------------------
export const fetchAccountProfile = createAsyncThunk(
  "account/fetchAccountProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://apnalabour.onrender.com/api/customer/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Fetched profile data from API:", response.data.profile);
      return response.data.profile;
    } catch (error) {
      console.error("Error fetching account profile:", error.response || error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch account profile"
      );
    }
  }
);

// ------------------------------------
// Thunk: Update Account Profile (with image upload support)
// ------------------------------------
export const updateAccountProfile = createAsyncThunk(
  "account/updateAccountProfile",
  async (updatedData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      // Append basic fields
      if (updatedData.name) formData.append("name", updatedData.name);
      if (updatedData.gender) formData.append("gender", updatedData.gender);
      if (updatedData.phoneNumber)
        formData.append("phoneNumber", updatedData.phoneNumber);
      if (updatedData.email) formData.append("email", updatedData.email);

      // Append address fields (with safe checks)
      const address = updatedData.address || {};
      Object.entries(address).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(`address.${key}`, value);
        }
      });

      // Append image if selected
      if (updatedData.image) {
        formData.append("image", updatedData.image);
      }

      const response = await axios.put(
        "https://apnalabour.onrender.com/api/customer/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Updated profile data:", response.data.customer);
      return response.data.customer;
    } catch (error) {
      console.error("Error updating account profile:", error.response || error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to update account profile"
      );
    }
  }
);

// ------------------------------------
// Thunk: Deactivate Account
// ------------------------------------
export const deactivateAccount = createAsyncThunk(
  "account/deactivateAccount",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        "https://apnalabour.onrender.com/api/customer/status",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Account deactivated:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error deactivating account:", error.response || error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to deactivate account"
      );
    }
  }
);

// ------------------------------------
// Initial State
// ------------------------------------
const initialState = {
  accountData: null,
  loading: false,
  error: null,
  successMessage: null,
};

// ------------------------------------
// Slice
// ------------------------------------
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
    clearErrorMessage: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch profile
      .addCase(fetchAccountProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccountProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.accountData = action.payload;
      })
      .addCase(fetchAccountProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update profile
      .addCase(updateAccountProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAccountProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.accountData = action.payload;
        state.successMessage = "Profile updated successfully!";
      })
      .addCase(updateAccountProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Deactivate account
      .addCase(deactivateAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deactivateAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage =
          action.payload?.message || "Account deactivated successfully!";
        state.accountData = null;
      })
      .addCase(deactivateAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ------------------------------------
// Exports
// ------------------------------------
export const { clearSuccessMessage, clearErrorMessage } = accountSlice.actions;
export default accountSlice.reducer;
