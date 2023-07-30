import { createSlice } from "@reduxjs/toolkit";
import { fetchInvoices } from "./operations";

const initialState = {
  allInvoices: [],
  isLoading: false,
  error: null,
};

const allInvoicesSlice = createSlice({
  name: "allInvoices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoices.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.allInvoices = action.payload;
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default allInvoicesSlice.reducer;
