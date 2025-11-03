// src/redux/paymentOrderSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
<<<<<<< HEAD
import axios from "axios";

// ✅ PLACE ORDER API
export const placeOrder = createAsyncThunk(
  "paymentOrder/placeOrder",
  async (payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId"); // ✅ get userId

      if (!token) return rejectWithValue("No token found. Please log in again.");
      if (!userId) return rejectWithValue("No user ID found. Please log in again.");

     const response = await axios.post(
  "https://apnalabour.onrender.com/api/payment/order",
  {
    bookingId: payload.bookingId, // ✅ fixed
    userId: userId,
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }
);


      return response.data;
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue(err.message);
    }
  }
);

// ✅ VERIFY PAYMENT API (Updated)
export const verifyPayment = createAsyncThunk(
  "paymentOrder/verifyPayment",
  async (paymentDetails, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      if (!token)
        return rejectWithValue("No token found. Please log in again.");

      const response = await axios.post(
        "https://apnalabour.onrender.com/api/payment/verify",
        {
          orderId: paymentDetails.orderId,
          paymentId: paymentDetails.paymentId,
          signature: paymentDetails.signature,
          bookingId: paymentDetails.bookingId, // ✅ ADD THIS
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      }
=======

// ✅ Create Payment Order (POST /api/payment/order)
export const placeOrder = createAsyncThunk(
  "paymentOrder/placeOrder",
  async ({ bookingId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://apnalabour.onrender.com/api/payment/order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ bookingId }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to create order");
      }

      return data;
    } catch (err) {
>>>>>>> db3cdf6efc71169646f00d545ae526b8023342a8
      return rejectWithValue(err.message);
    }
  }
);

<<<<<<< HEAD
=======
// ✅ Verify Payment (POST /api/payment/verify)
export const verifyPayment = createAsyncThunk(
  "paymentOrder/verifyPayment",
  async ({ orderId, paymentId, signature }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://apnalabour.onrender.com/api/payment/verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ orderId, paymentId, signature }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Payment verification failed");
      }

      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ✅ Slice

const paymentOrderSlice = createSlice({
  name: "paymentOrder",
  initialState: {
    loading: false,

    orderData: null,
    verifyData: null,
    error: null,
    success: false,
    verifySuccess: false,

    success: false,
    error: null,
    orderData: null,

  },
  reducers: {
    resetPaymentOrderState: (state) => {
      state.loading = false;

      state.orderData = null;
      state.verifyData = null;
      state.error = null;
      state.success = false;
      state.verifySuccess = false;

      state.success = false;
      state.error = null;
      state.orderData = null;

    },
  },
  extraReducers: (builder) => {
    builder

      // ✅ Place Order

      // 🟡 placeOrder

      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;

        state.orderData = action.payload;
        state.success = true;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
        state.success = false;
      })

      // ✅ Verify Payment
      .addCase(verifyPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.verifySuccess = false;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.verifyData = action.payload;
        state.verifySuccess = true;
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Payment verification failed";
        state.verifySuccess = false;

        state.success = true;
        state.orderData = action.payload;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // 🟢 verifyPayment
      .addCase(verifyPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyPayment.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;

      });
  },
});

export const { resetPaymentOrderState } = paymentOrderSlice.actions;
export default paymentOrderSlice.reducer;
