import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base URL
const BASE_URL = 'https://apnalabour.onrender.com/api/customer';

// Thunks

// 1. Get Profile
export const fetchCustomerProfile = createAsyncThunk(
  'customer/fetchProfile',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/profile`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 2. Update Profile
export const updateCustomerProfile = createAsyncThunk(
  'customer/updateProfile',
  async (formData, thunkAPI) => {
    try {
      const response = await axios.put(`${BASE_URL}/profile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 3. Deactivate Account
export const deactivateCustomerAccount = createAsyncThunk(
  'customer/deactivateAccount',
  async (_, thunkAPI) => {
    try {
      const response = await axios.patch(`${BASE_URL}/status`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 4. Delete Account
export const deleteCustomerAccount = createAsyncThunk(
  'customer/deleteAccount',
  async (_, thunkAPI) => {
    try {
      const response = await axios.delete(`${BASE_URL}/delete-account`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Slice
const customerSlice = createSlice({
  name: 'customer',
  initialState: {
    profile: null,
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    clearMessages: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Profile
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

      // Update Profile
      .addCase(updateCustomerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCustomerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.message = 'Profile updated successfully';
      })
      .addCase(updateCustomerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Deactivate Account
      .addCase(deactivateCustomerAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deactivateCustomerAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.message = 'Account deactivated successfully';
      })
      .addCase(deactivateCustomerAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Account
      .addCase(deleteCustomerAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCustomerAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.message = 'Account deleted successfully';
        state.profile = null;
      })
      .addCase(deleteCustomerAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = customerSlice.actions;

export default customerSlice.reducer;
