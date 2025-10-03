// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import applianceRepairReducer from './applianceRepairSlice';

const store = configureStore({
  reducer: {
    applianceRepair: applianceRepairReducer,
    // add other slices here if you have them
  },
});

export default store;
