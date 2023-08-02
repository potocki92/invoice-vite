import { createSlice } from "@reduxjs/toolkit";
import {
  addInvoice,
  deleteInvoice,
  fetchInvoices,
  updateInvoice,
} from "./operations";

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
        const { client, date, invoiceNumber, _id } = action.payload;
        const { clientName } = client;
        const { dueDate } = date;
        const newInvoice = {
          clientName,
          dueDate,
          invoiceNumber,
          _id,
        };
        state.allInvoices.push(newInvoice);
      })
      .addCase(deleteInvoice.fulfilled, (state, action) => {
        state.allInvoices = state.allInvoices.filter(
          (invoice) => invoice._id !== action.payload
        );
      })
      .addCase(updateInvoice.fulfilled, (state, action) => {
        const { invoiceId, invoice } = action.payload;

        const editedInvoiceIndex = state.allInvoices.findIndex(
          (invoice) => invoice._id === invoiceId
        )

        if(editedInvoiceIndex !== -1) {
          state.allInvoices[editedInvoiceIndex] = invoice
        }
      })
  },
});

export default allInvoicesSlice.reducer;
