import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "../features/categoriesSlice"; // import your slice

export const store = configureStore({
    reducer: {
        categories: categoriesReducer,
    },
});