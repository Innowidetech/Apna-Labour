import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 1. Fetch top-level Appliance Repair categories
export const fetchMainApplianceCategories = createAsyncThunk(
  'applianceRepair/fetchMainApplianceCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://apnalabour.onrender.com/api/customer/categories`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to load categories');
    }
  }
);

// 2. Fetch subcategories based on selected category ID
export const fetchSubcategories = createAsyncThunk(
  'applianceRepair/fetchSubcategories',
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://apnalabour.onrender.com/api/customer/categories/subcategories/${categoryId}`);
      return { categoryId, subcategories: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to load subcategories');
    }
  }
);

// 3. Fetch appliances inside a subcategory (final API)
export const fetchAppliancesBySubcategory = createAsyncThunk(
  'applianceRepair/fetchAppliancesBySubcategory',
  async (subcategoryId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://apnalabour.onrender.com/api/customer/subcategories/appliances/${subcategoryId}`);
      return { subcategoryId, appliances: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to load appliances');
    }
  }
);

const applianceRepairSlice = createSlice({
  name: 'applianceRepair',
  initialState: {
    categories: [],
    subcategoriesByCategory: {},
    appliancesBySubcategory: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMainApplianceCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMainApplianceCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchMainApplianceCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchSubcategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubcategories.fulfilled, (state, action) => {
        state.loading = false;
        const { categoryId, subcategories } = action.payload;
        state.subcategoriesByCategory[categoryId] = subcategories;
      })
      .addCase(fetchSubcategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchAppliancesBySubcategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppliancesBySubcategory.fulfilled, (state, action) => {
        state.loading = false;
        const { subcategoryId, appliances } = action.payload;
        state.appliancesBySubcategory[subcategoryId] = appliances;
      })
      .addCase(fetchAppliancesBySubcategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default applianceRepairSlice.reducer;
