import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import accountReducer from '../redux/accountSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    account: accountReducer,
  },
});

export default store;
