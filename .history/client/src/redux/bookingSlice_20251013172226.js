// src/redux/slices/bookingSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Async thunk to fetch all bookings
export const fetchBookings = createAsyncThunk(
  "bookings/fetchBookings",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://apnalabour.onrender.com/api/customer/bookings",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; // Return API response
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch bookings"
      );
    }
  }
);

// ✅ Initial state
const initialState = {
  bookings: [],
  loading: false,
  error: null,
};

// ✅ Slice
const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ✅ Export reducer
export default bookingSlice.reducer;
