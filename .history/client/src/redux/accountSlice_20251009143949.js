import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch customer profile with auth token
export const fetchProfile = createAsyncThunk(
  'account/fetchProfile',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth?.token || localStorage.getItem('token');
      if (!token) return rejectWithValue('Authentication token not found');

      const response = await axios.get(
        'https://apnalabour.onrender.com/api/customer/profile',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Return only the 'profile' object from API response
      return response.data.profile;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
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
    clearProfile(state) {
      state.profile = null;
      state.error = null;
      state.loading = false;
    },
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
  },
});

export const { clearProfile } = accountSlice.actions;
export default accountSlice.reducer;
export default accountSlice.reducer