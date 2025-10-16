import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAccountProfile = createAsyncThunk(
  "account/fetchAccountProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://apnalabour.onrender.com/api/customer/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Fetched profile data from API:", response.data.profile); // <-- log here

      // Return profile directly (the inner object)
      return response.data.profile;
    } catch (error) {
      console.error("Error fetching account profile:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch account profile"
      );
    }
  }
);


export const updateAccountProfile = createAsyncThunk(
  "account/updateAccountProfile",
  async (updatedData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      if (updatedData.name) formData.append("name", updatedData.name);
      if (updatedData.gender) formData.append("gender", updatedData.gender);
      if (updatedData.phoneNumber)
        formData.append("phoneNumber", updatedData.phoneNumber);
      if (updatedData.email) formData.append("email", updatedData.email);

      const address = updatedData.address || {};
      Object.entries(address).forEach(([key, value]) => {
        if (value) {
          formData.append(`address.${key}`, value);
        }
      });

      if (updatedData.image) {
        formData.append("image", updatedData.image);
      }

      const response = await axios.put(
        "https://apnalabour.onrender.com/api/customer/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Return updated customer data
      return response.data.customer;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update account profile"
      );
    }
  }
);

export const deactivateAccount = createAsyncThunk(
  "account/deactivateAccount",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        "https://apnalabour.onrender.com/api/customer/status",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to deactivate account"
      );
    }
  }
);

const initialState = {
  accountData: null,
  loading: false,
  error: null,
  successMessage: null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccountProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccountProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.accountData = action.payload;
      })
      .addCase(fetchAccountProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateAccountProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAccountProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.accountData = action.payload;
        state.successMessage = "Profile updated successfully!";
      })
      .addCase(updateAccountProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deactivateAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deactivateAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage =
          action.payload?.message || "Account deactivated successfully!";
        state.accountData = null;
      })
      .addCase(deactivateAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSuccessMessage } = accountSlice.actions;
export default accountSlice.reducer;
