import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import servicesReducer from './serviceSlice';
import cartReducer from './cartSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    services: servicesReducer,
    cart: cartReducer,
  },
});

export default store;
