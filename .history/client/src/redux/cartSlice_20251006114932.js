// src/redux/cartSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch cart items
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const guestId = localStorage.getItem("guestId");

      const res = await fetch(
        "https://apnalabour.onrender.com/api/customer/cart",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(guestId && { "x-guest-id": guestId }),
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);

      if (data.guestId) localStorage.setItem("guestId", data.guestId);

      const items = Array.isArray(data.items) ? data.items : [];
      return items;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Remove item from cart
export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (unitId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const guestId = localStorage.getItem("guestId");

      const res = await fetch(
        `https://apnalabour.onrender.com/api/customer/cart/remove/${unitId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            ...(guestId && { "x-guest-id": guestId }),
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);

      return unitId;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Save/update address
export const saveAddress = createAsyncThunk(
  "cart/saveAddress",
  async (addressData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Please login first!");

      const res = await fetch(
        "https://apnalabour.onrender.com/api/customer/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(addressData),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);

      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Book Slot
export const bookSlot = createAsyncThunk(
  "cart/bookSlot",
  async ({ bookingDate, timeSlot }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Please login first!");

      const res = await fetch(
        "https://apnalabour.onrender.com/api/customer/bookings/slot",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ bookingDate, timeSlot }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);

      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Login (send OTP)
export const loginUser = createAsyncThunk(
  "cart/loginUser",
  async (mobileNumber, { rejectWithValue }) => {
    try {
      const res = await fetch("https://apnalabour.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobileNumber }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);

      return data.userId;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Verify OTP
export const verifyOtp = createAsyncThunk(
  "cart/verifyOtp",
  async ({ userId, otp }, { rejectWithValue }) => {
    try {
      const res = await fetch("https://apnalabour.onrender.com/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, otp }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);

      if (data.token) localStorage.setItem("token", data.token);

      return true;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

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
      state.addressSaved = false;
      state.slotBooked = false;
      state.step = "login";
      state.items = [];
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
