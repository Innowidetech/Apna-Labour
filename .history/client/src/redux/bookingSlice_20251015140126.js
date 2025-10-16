import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Fetch all customer bookings
export const fetchBookings = createAsyncThunk(
  "bookings/fetchBookings",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://apnalabour.onrender.com/api/customer/bookings",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return {
        bookings: response.data.bookings || [],
        upcoming: response.data.upcoming || [],
        past: response.data.past || [],
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch bookings"
      );
    }
  }
);

// ✅ Fetch filtered bookings
export const fetchFilteredBookings = createAsyncThunk(
  "bookings/fetchFilteredBookings",
  async (filterValue, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://apnalabour.onrender.com/api/customer/bookings?filter=${filterValue}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // ✅ Handle both formats: {bookings: []} or {upcoming, past}
      return {
        bookings: response.data.bookings || [],
        upcoming: response.data.upcoming || [],
        past: response.data.past || [],
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch filtered bookings"
      );
    }
  }
);

const bookingSlice = createSlice({
  name: "bookings",
  initialState: {
    bookings: [],
    upcoming: [],
    past: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearBookings(state) {
      state.bookings = [];
      state.upcoming = [];
      state.past = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Fetch All Bookings
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload.bookings;
        state.upcoming = action.payload.upcoming;
        state.past = action.payload.past;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Fetch Filtered Bookings
      .addCase(fetchFilteredBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilteredBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload.bookings;
        state.upcoming = action.payload.upcoming;
        state.past = action.payload.past;
      })
      .addCase(fetchFilteredBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearBookings } = bookingSlice.actions;
export default bookingSlice.reducer;
