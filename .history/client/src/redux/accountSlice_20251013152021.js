import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch account profile
export const fetchAccountProfile = createAsyncThunk(
  "account/fetchAccountProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://apnalabour.onrender.com/api/customer/profile",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data.profile;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch account profile"
      );
    }
  }
);

// Update account profile
export const updateAccountProfile = createAsyncThunk(
  "account/updateAccountProfile",
  async (updatedData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      if (updatedData.name) formData.append("name", updatedData.name);
      if (updatedData.gender) formData.append("gender", updatedData.gender);
      if (updatedData.phoneNumber) formData.append("phoneNumber", updatedData.phoneNumber);
      if (updatedData.email) formData.append("email", updatedData.email);

      if (updatedData.address) {
        formData.append("address", JSON.stringify(updatedData.address));
      }

      if (updatedData.image instanceof File) {
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

      return response.data.customer || response.data.profile;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update account profile"
      );
    }
  }
);

// Deactivate account
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
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to deactivate account"
      );
    }
  }
);

// Delete account
export const deleteAccount = createAsyncThunk(
  "account/deleteAccount",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        "https://apnalabour.onrender.com/api/customer/delete-account",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // ✅ Remove token from localStorage on delete
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("userId");

      return response.data;
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
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
    clearAccountState: (state) => {
      state.accountData = null;
      state.loading = false;
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
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
      .addCase(deactivateAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deactivateAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.accountData = null;
        state.successMessage = action.payload?.message || "Account deactivated successfully!";
      })
      .addCase(deactivateAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.accountData = null;
        state.successMessage = action.payload?.message || "Account deleted successfully!";
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSuccessMessage, clearAccountState } = accountSlice.actions;
export default accountSlice.reducer;
