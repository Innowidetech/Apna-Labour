import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
<<<<<<< HEAD
import accountReducer from './accountSlice';
import bookingReducer from "./bookingSlice";
=======
import accountReducer from './accountSlice'; 
import bookingReducer from './bookingSlice';
>>>>>>> dfc4e7ea4fc70c2e442bf52a722f1f259e044b66

const store = configureStore({
  reducer: {
    auth: authReducer,
    account: accountReducer,
    bookings: bookingReducer,
  },
});

export default store;
