import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import accountReducer from "./accountSlice";
import bookingReducer from "./bookingSlice";
<
import paymentOrderReducer from './paymentOrderSlice';


=======
import notificationReducer from "./notificationSlice";
import contactReducer from "./contactSlice";
import adminloginReducer from "./adminloginSlice";
import paymentOrderReducer from "./paymentOrderSlice"; // ✅ Added import
>>>>>>> db3cdf6efc71169646f00d545ae526b8023342a8

const store = configureStore({
  reducer: {
    auth: authReducer,
    account: accountReducer,
    bookings: bookingReducer,
<<<<<<< HEAD
    paymentOrder: paymentOrderReducer,
=======
    notifications: notificationReducer,
    contact: contactReducer,
    adminLogin: adminloginReducer,
    paymentOrder: paymentOrderReducer, // ✅ Added reducer
>>>>>>> db3cdf6efc71169646f00d545ae526b8023342a8
  },
});

export default store;
