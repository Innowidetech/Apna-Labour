import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 📩 Submit Contact form
export const submitContact = createAsyncThunk(
  "contact/submitContact",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "https://apnalabour.onrender.com/api/labourer/contact",
        formData
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 🧰 Register Labourer / Worker
export const registerWorker = createAsyncThunk(
  "contact/registerWorker",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "https://apnalabour.onrender.com/api/labourer/register",
        formData
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 🗂️ Fetch Categories API (for Professional labourers)
export const fetchCategories = createAsyncThunk(
  "contact/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "https://apnalabour.onrender.com/api/customer/categories"
      );
      return res.data; // should return an array of categories
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    loading: false,
    success: false,
    error: null,
    categories: [], // ✅ new state for categories
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 📩 submitContact
      .addCase(submitContact.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(submitContact.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🧰 registerWorker
      .addCase(registerWorker.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(registerWorker.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerWorker.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🗂️ fetchCategories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload?.categories || action.payload || [];
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default contactSlice.reducer;
