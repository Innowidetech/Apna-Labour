import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://apnalabour.onrender.com/api/customer";

// Async thunk to fetch customer profile
export const fetchCustomerProfile = createAsyncThunk(
  "account/fetchCustomerProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/profile`);
      return response.data; // assuming API returns the profile data here
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile"
      );
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
      });
  },
});

export default accountSlice.reducer;
