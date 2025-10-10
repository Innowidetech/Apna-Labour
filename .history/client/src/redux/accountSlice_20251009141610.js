import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://apnalabour.onrender.com/api/customer";

// Helper to get token and set headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

// Fetch Profile
export const fetchAccountProfile = createAsyncThunk(
  "account/fetchAccountProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/profile`, {
        headers: getAuthHeaders(),
      });

      // ✅ FIXED: Correctly return the profile object
      return response.data.profile;

    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile"
      );
    }
  }
);

// Update Profile
export const updateAccountProfile = createAsyncThunk(
  "account/updateAccountProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await axios.put(`${BASE_URL}/profile`, formData, config);
      return response.data.message || "Profile updated successfully";
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update profile"
      );
    }
  }
);

// Deactivate Account
export const deactivateAccount = createAsyncThunk(
  "account/deactivateAccount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${BASE_URL}/status`, null, {
        headers: getAuthHeaders(),
      });
      return response.data.message || "Account deactivated successfully";
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to deactivate account"
      );
    }
  }
);

// Delete Account
export const deleteAccount = createAsyncThunk(
  "account/deleteAccount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/delete-account`, {
        headers: getAuthHeaders(),
      });
      return response.data.message || "Account deleted successfully";
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete account"
      );
    }
  }
);

const initialState = {
  accountData: null,
  loading: false,
  error: null,
  successMessage: null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    clearSuccessMessage(state) {
      state.successMessage = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch profile
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

      // update profile
      .addCase(updateAccountProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAccountProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload;
      })
      .addCase(updateAccountProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // deactivate account
      .addCase(deactivateAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deactivateAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload;
      })
      .addCase(deactivateAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // delete account
      .addCase(deleteAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload;
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSuccessMessage, clearError } = accountSlice.actions;
export default accountSlice.reducer;
