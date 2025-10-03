import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// axios instance (inside the slice)
const api = axios.create({
    baseURL: "https://apnalabour.onrender.com/api/customer",
});

// Thunk to fetch categories
export const fetchCategories = createAsyncThunk(
    "categories/fetchCategories",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/categories");
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch categories");
        }
    }
);

const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default categoriesSlice.reducer;









