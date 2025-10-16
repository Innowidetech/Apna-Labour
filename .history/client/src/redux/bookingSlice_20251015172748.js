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

// ✅ Cancel a booking
export const cancelBooking = createAsyncThunk(
  "bookings/cancelBooking",
  async ({ id, reason }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `https://apnalabour.onrender.com/api/customer/cancellation/${id}`,
        { reason },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data; // API can return message or updated booking
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to cancel booking"
      );
    }
  }
);

// ✅ Add review & rating
export const addReview = createAsyncThunk(
  "bookings/addReview",
  async ({ unitId, rating, feedback }, { rejectWithValue }) => {
    try {
      console.log("Submitting review with:", { unitId, rating, feedback });
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `https://apnalabour.onrender.com/api/customer/unit/${unitId}`,
        { rating, feedback },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data; // API should return success message or updated unit
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to submit review"
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
    cancelLoading: false,
    cancelError: null,
    cancelMessage: null,
    reviewLoading: false,
    reviewError: null,
    reviewMessage: null,
  },
  reducers: {
    clearBookings(state) {
      state.bookings = [];
      state.upcoming = [];
      state.past = [];
      state.error = null;
      state.cancelLoading = false;
      state.cancelError = null;
      state.cancelMessage = null;
      state.reviewLoading = false;
      state.reviewError = null;
      state.reviewMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Bookings
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

      // Fetch Filtered Bookings
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
      })

      // Cancel Booking
      .addCase(cancelBooking.pending, (state) => {
        state.cancelLoading = true;
        state.cancelError = null;
        state.cancelMessage = null;
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.cancelLoading = false;
        state.cancelMessage =
          action.payload.message || "Booking cancelled successfully";
      })
      .addCase(cancelBooking.rejected, (state, action) => {
        state.cancelLoading = false;
        state.cancelError = action.payload;
      })

      // Add Review
      .addCase(addReview.pending, (state) => {
        state.reviewLoading = true;
        state.reviewError = null;
        state.reviewMessage = null;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.reviewLoading = false;
        state.reviewMessage =
          action.payload.message || "Review submitted successfully";
      })
      .addCase(addReview.rejected, (state, action) => {
        state.reviewLoading = false;
        state.reviewError = action.payload;
      });
  },
});

export const { clearBookings } = bookingSlice.actions;
export default bookingSlice.reducer;
