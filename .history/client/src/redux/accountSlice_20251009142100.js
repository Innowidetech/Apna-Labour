import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch customer profile
export const fetchProfile = createAsyncThunk(
  'account/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://apnalabour.onrender.com/api/customer/profile');
      return response.data;  // Assuming API returns profile data here
    } catch (error) {
      // Return custom error message or error object
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const accountSlice = createSlice({
  name: 'account',
  initialState: {
    profile: null,
    loading: false,
    error: null,
  },
  reducers: {
    // You can add some synchronous reducers here if needed
    clearProfile(state) {
      state.profile = null;
      state.error = null;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch profile';
      });
  }
});

export const { clearProfile } = accountSlice.actions;
export default accountSlice.reducer;
