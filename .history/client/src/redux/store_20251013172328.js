import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import accountReducer from './accountSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    account: accountReducer,
    bookings: bookingReducer,
  },
});

export default store;
