// src/redux/paymentOrderSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
      return rejectWithValue(err.message);
    }
  }
);

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
    success: false,
    error: null,
    orderData: null,
  },
  reducers: {
    resetPaymentOrderState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.orderData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🟡 placeOrder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
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
