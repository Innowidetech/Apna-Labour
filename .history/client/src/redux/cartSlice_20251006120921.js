import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch Cart
export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const guestId = localStorage.getItem('guestId');

    const res = await fetch('https://apnalabour.onrender.com/api/customer/cart', {
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
  } catch (error) {
    return rejectWithValue(error.message || 'Failed to fetch cart items.');
  }
});

// Remove Item
export const removeCartItem = createAsyncThunk('cart/removeItem', async (unitId, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const guestId = localStorage.getItem('guestId');

    const res = await fetch(
      `https://apnalabour.onrender.com/api/customer/cart/remove/${unitId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(guestId && { 'x-guest-id': guestId }),
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);

    return unitId;
  } catch (error) {
    return rejectWithValue(error.message || 'Failed to remove item');
  }
});

// Login
export const loginUser = createAsyncThunk('auth/loginUser', async (mobileNumber, { rejectWithValue }) => {
  try {
    const res = await fetch('https://apnalabour.onrender.com/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobileNumber }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);

    return data.userId;
  } catch (error) {
    return rejectWithValue(error.message || 'Login failed');
  }
});

// Verify OTP
export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async ({ userId, otp }, { rejectWithValue }) => {
    try {
      const res = await fetch('https://apnalabour.onrender.com/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, otp }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);

      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      return data.token;
    } catch (error) {
      return rejectWithValue(error.message || 'OTP verification failed');
    }
  }
);

// Update Address
export const updateAddress = createAsyncThunk(
  'profile/updateAddress',
  async (addressData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Please login first!');

      const res = await fetch('https://apnalabour.onrender.com/api/customer/profile', {
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
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to save address');
    }
  }
);

// Book Slot
export const bookSlot = createAsyncThunk(
  'booking/bookSlot',
  async ({ slotDate, slotTime }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Please login first!');

      const res = await fetch('https://apnalabour.onrender.com/api/customer/bookings/slot', {
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
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to book slot');
    }
  }
);

const initialState = {
  cartItems: [],
  totalPrice: 0,
  loading: false,
  error: null,
  userId: '',
  step: 'login', // "login", "otp", "next"
  addressSaved: false,
  slotBooked: false,
  bookingLoading: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    resetState: () => initialState,
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

      // removeCartItem
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.cartItems = state.cartItems.filter((item) => item.unit?.id !== action.payload && item.unit !== action.payload);
        state.totalPrice = state.cartItems.reduce((acc, i) => acc + i.price, 0);
      })

      // loginUser
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userId = action.payload;
        state.step = 'otp';
      })

      // verifyOtp
      .addCase(verifyOtp.fulfilled, (state) => {
        state.step = 'next';
      })

      // updateAddress
      .addCase(updateAddress.fulfilled, (state) => {
        state.addressSaved = true;
      })

      // bookSlot
      .addCase(bookSlot.pending, (state) => {
        state.bookingLoading = true;
      })
      .addCase(bookSlot.fulfilled, (state) => {
        state.bookingLoading = false;
        state.slotBooked = true;
      })
      .addCase(bookSlot.rejected, (state) => {
        state.bookingLoading = false;
      });
  },
});

export const { setStep, setUserId, resetState } = cartSlice.actions;
export default cartSlice.reducer;
