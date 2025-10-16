// src/redux/accountSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Fetch customer profile
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
      return response.data; // returning full response
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch account profile"
      );
    }
  }
);

// ✅ Update profile (flattened address fields)
export const updateAccountProfile = createAsyncThunk(
  "account/updateAccountProfile",
  async (updatedData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      // Append basic fields
      formData.append("name", updatedData.name);
      formData.append("gender", updatedData.gender);
      formData.append("phoneNumber", updatedData.phoneNumber);
      formData.append("email", updatedData.email);

      // Flattened address keys as per backend format
      if (updatedData.address) {
        Object.entries(updatedData.address).forEach(([key, value]) => {
          formData.append(`address.${key}`, value);
        });
      }

      // Image file if provided
      if (updatedData.image) {
        formData.append("image", updatedData.image);
      }

      const response = await axios.put(
        "https://apnalabour.onrender.com/api/customer/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // Let axios set Content-Type automatically for multipart/form-data
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update account profile"
      );
    }
  }
);

// ✅ Deactivate account
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

// Initial state
const initialState = {
  accountData: null,
  loading: false,
  error: null,
  successMessage: null,
};

// Slice
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
      // Fetch
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

      // Update
      .addCase(updateAccountProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAccountProfile.fulfilled, (state, action) => {
        state.loading = false;

        // Normalize the response to nested address
        const customer = action.payload.customer;

        if (customer) {
          const address = {};
          const addressKeys = [
            "HNo",
            "street",
            "area",
            "landmark",
            "townCity",
            "pincode",
            "buildingName",
            "state",
          ];

          addressKeys.forEach((key) => {
            const flatKey = `address.${key}`;
            if (customer[flatKey]) {
              address[key] = customer[flatKey];
              delete customer[flatKey]; // Remove flattened keys
            }
          });

          state.accountData = {
            profile: {
              ...customer,
              address,
            },
          };
        } else {
          state.accountData = action.payload;
        }

        state.successMessage = "Profile updated successfully!";
      })
      .addCase(updateAccountProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Deactivate
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
