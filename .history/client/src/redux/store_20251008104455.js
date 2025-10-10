import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import servicesReducer from './serviceSlice';
import accountReducer from "../redux/accountSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    services: servicesReducer,
     account: accountReducer,
  },
});
export default store;