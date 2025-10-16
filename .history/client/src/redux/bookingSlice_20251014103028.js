import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Fetch customer bookings
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
      return response.data.bookings; // returns bookings array
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch bookings"
      );
    }
  }
);

const bookingSlice = createSlice({
  name: "bookings",
  initialState: {
    bookings: [],
    loading: false,
    error: null,
  },
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

export default bookingSlice.reducer;
