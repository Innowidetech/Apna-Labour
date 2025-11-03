import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

import accountReducer from './accountSlice';
import bookingReducer from "./bookingSlice";
import paymentOrderReducer from './paymentOrderSlice';



const store = configureStore({
  reducer: {
    auth: authReducer,
    account: accountReducer,
    bookings: bookingReducer,
    paymentOrder: paymentOrderReducer,
  },
});

export default store;
