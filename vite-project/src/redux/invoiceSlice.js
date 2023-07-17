import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newInvoice: {
    _id: "",
    invoiceNumber: "",
    user: { address: {} },
    client: {},
    products: {
      items: [{}],
      totalAmount: 0,
    },
    date: {
      dueDate: "",
      invoiceDate: "",
    },
  },
};

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    setInvoice: (state, action) => {
      return {
        ...state,
        ...action.payload
      }
    },
    setInvoiceNumber: (state, action) => {
      state.invoiceNumber = action.payload
    }
  },
});

export const { setInvoice, setInvoiceNumber } =
  invoiceSlice.actions;
export default invoiceSlice.reducer;
