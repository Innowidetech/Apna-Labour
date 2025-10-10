// src/redux/accountSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Update this to your backend URL

export const fetchAccountProfile = createAsyncThunk(
  "account/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/account/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch profile");
    }
  }
);

export const updateAccountProfile = createAsyncThunk(
  "account/updateProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      // Append form fields
      Object.entries(profileData).forEach(([key, value]) => {
        if (key === "address") {
          Object.entries(value).forEach(([addrKey, addrValue]) => {
            formData.append(`address[${addrKey}]`, addrValue);
          });
        } else if (key === "image" && value) {
          formData.append("image", value);
        } else if (key !== "image") {
          formData.append(key, value);
        }
      });

      const response = await axios.put(`${API_BASE_URL}/api/account/profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update profile");
    }
  }
);

export const deactivateAccount = createAsyncThunk(
  "account/deactivate",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/api/account/deactivate`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to deactivate account");
    }
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState: {
    accountData: null,
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchAccountProfile
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

      // updateAccountProfile
      .addCase(updateAccountProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAccountProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Profile updated successfully!";
      })
      .addCase(updateAccountProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // deactivateAccount
      .addCase(deactivateAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deactivateAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Account deactivated successfully!";
        state.accountData = null;
      })
      .addCase(deactivateAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSuccessMessage } = accountSlice.actions;
export default accountSlice.reducer;
