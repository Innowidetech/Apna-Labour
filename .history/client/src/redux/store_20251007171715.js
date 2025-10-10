import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import servicesReducer from './serviceSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    services: servicesReducer,
    
  },
});
