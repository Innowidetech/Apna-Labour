import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import servicesReducer from "./serviceSlice";
import cartReducer from "../redux/" // ✅ import cart slice

export const store = configureStore({
  reducer: {
    auth: authReducer,
    services: servicesReducer,
    cart: cartReducer, // ✅ add here
  },
});
