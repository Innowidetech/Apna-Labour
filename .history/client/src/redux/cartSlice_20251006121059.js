// src/features/cart/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE = 'https://apnalabour.onrender.com/api';

// Async thunks for APIs

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const guestId = localStorage.getItem('guestId');

      const res = await fetch(`${API_BASE}/customer/cart`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(guestId && { 'x-guest-id': guestId }),
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);

      if (data.guestId) localStorage.setItem('guestId', data.guestId);

      return data.items || [];
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to fetch cart items.');
    }
  }
);

export const removeItem = createAsyncThunk(
  'cart/removeItem',
  async (unitId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const guestId = localStorage.getItem('guestId');

      const res = await fetch(`${API_BASE}/customer/cart/remove/${unitId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(guestId && { 'x-guest-id': guestId }),
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);

      return unitId; // return deleted unitId
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to remove item');
    }
  }
);

export const loginUser = createAsyncThunk(
  'cart/loginUser',
  async (mobileNumber, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobileNumber }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);

      return data.userId;
    } catch (err) {
      return rejectWithValue(err.message || 'Login failed');
    }
  }
);

export const verifyOtp = createAsyncThunk(
  'cart/verifyOtp',
  async ({ userId, otp }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, otp }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);

      if (data.token) localStorage.setItem('token', data.token);

      return data.token;
    } catch (err) {
      return rejectWithValue(err.message || 'OTP verification failed');
    }
  }
);

export const saveAddress = createAsyncThunk(
  'cart/saveAddress',
  async (addressData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Please login first!');

      const res = await fetch(`${API_BASE}/customer/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(addressData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);

      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to save address');
    }
  }
);

export const bookSlot = createAsyncThunk(
  'cart/bookSlot',
  async ({ slotDate, slotTime }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Please login first!');

      const res = await fetch(`${API_BASE}/customer/bookings/slot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bookingDate: slotDate,
          timeSlot: slotTime,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);

      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to book slot');
    }
  }
);

// Slice

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    totalPrice: 0,
    loading: false,
    error: null,
    userId: '',
    step: 'login', // login, otp, next
    addressSaved: false,
    slotBooked: false,
    bookingLoading: false,
  },
  reducers: {
    setStep(state, action) {
      state.step = action.payload;
    },
    setUserId(state, action) {
      state.userId = action.payload;
    },
    resetCart(state) {
      state.cartItems = [];
      state.totalPrice = 0;
      state.loading = false;
      state.error = null;
      state.userId = '';
      state.step = 'login';
      state.addressSaved = false;
      state.slotBooked = false;
      state.bookingLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchCart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
        state.totalPrice = action.payload.reduce((acc, i) => acc + i.price, 0);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // removeItem
      .addCase(removeItem.fulfilled, (state, action) => {
        state.cartItems = state.cartItems.filter(
          (item) => item.unit?.id !== action.payload && item.unit !== action.payload
        );
        state.totalPrice = state.cartItems.reduce((acc, i) => acc + i.price, 0);
      })
      .addCase(removeItem.rejected, (state, action) => {
        state.error = action.payload;
      })

      // loginUser
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userId = action.payload;
        state.step = 'otp';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
      })

      // verifyOtp
      .addCase(verifyOtp.fulfilled, (state) => {
        state.step = 'next';
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.error = action.payload;
      })

      // saveAddress
      .addCase(saveAddress.fulfilled, (state) => {
        state.addressSaved = true;
      })
      .addCase(saveAddress.rejected, (state, action) => {
        state.error = action.payload;
      })

      // bookSlot
      .addCase(bookSlot.pending, (state) => {
        state.bookingLoading = true;
      })
      .addCase(bookSlot.fulfilled, (state) => {
        state.bookingLoading = false;
        state.slotBooked = true;
      })
      .addCase(bookSlot.rejected, (state, action) => {
        state.bookingLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setStep, setUserId, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
