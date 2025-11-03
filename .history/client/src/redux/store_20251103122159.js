import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import accountReducer from "./accountSlice";
import bookingReducer from "./bookingSlice";

import paymentOrderReducer from './paymentOrderSlice';



import notificationReducer from "./notificationSlice";
import contactReducer from "./contactSlice";
import adminloginReducer from "./adminloginSlice";
import paymentOrderReducer from "./paymentOrderSlice"; // ✅ Added import


const store = configureStore({
  reducer: {
    auth: authReducer,
    account: accountReducer,
    bookings: bookingReducer,

    paymentOrder: paymentOrderReducer
    notifications: notificationReducer,
    contact: contactReducer,
    adminLogin: adminloginReducer,
    

  },
});

export default store;
