import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import accountReducer from "./accountSlice"; // ✅ relative to this file

const store = configureStore({
  reducer: {
    auth: authReducer,
    account: accountReducer, // ✅ key must match the one you use in useSelector
  },
});

export default store;
