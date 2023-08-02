import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { addInvoice, fetchInvoices } from "./operations";

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
      })
      .addCase(addInvoice.fulfilled, (state, action) => {
        const { client, date, invoiceNumber } = action.payload;
        const { clientName } = client;
        const { dueDate } = date;
        const newInvoice = {
          clientName,
          dueDate,
          invoiceNumber,
          _id: uuidv4(),
        };
        state.allInvoices.push(newInvoice);
      });
  },
});

export default allInvoicesSlice.reducer;
