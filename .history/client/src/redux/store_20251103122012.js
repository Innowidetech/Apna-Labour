import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import accountReducer from "./accountSlice";
import bookingReducer from "./bookingSlice";





import notificationReducer from "./notificationSlice";
import contactReducer from "./contactSlice";
import adminloginReducer from "./adminloginSlice";
import paymentOrderReducer from "./paymentOrderSlice"; // ✅ Added import


const store = configureStore({
  reducer: {
    auth: authReducer,
    account: accountReducer,
    bookings: bookingReducer,

   

    notifications: notificationReducer,
    contact: contactReducer,
    adminLogin: adminloginReducer,
    payment // ✅ Added reducer

  },
});

export default store;
