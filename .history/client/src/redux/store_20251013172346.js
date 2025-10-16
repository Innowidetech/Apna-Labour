import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import accountReducer from './accountSlice';
import bookingReducer from "./slices/bookingSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    account: accountReducer,
    bookings: bookingReducer,
  },
});

export default store;
