// src/redux/cartSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ... all your async thunks remain unchanged ...

const initialState = {
  items: [],
  loading: false,
  error: null,
  addressSaved: false,
  slotBooked: false,
  userId: "",
  step: "login",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCartState: (state) => {
      state.items = [];
      state.addressSaved = false;
      state.slotBooked = false;
      state.step = "login";
      state.error = null;
      state.userId = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(saveAddress.fulfilled, (state) => {
        state.addressSaved = true;
      })
      .addCase(saveAddress.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(bookSlot.fulfilled, (state) => {
        state.slotBooked = true;
      })
      .addCase(bookSlot.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userId = action.payload;
        state.step = "otp";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.step = "next";
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { resetCartState } = cartSlice.actions;
export default cartSlice.reducer;
