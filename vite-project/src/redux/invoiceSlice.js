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
    setNewInvoice(state, action) {
      state.newInvoice = action.payload;
    },
    setInvoiceUser: (state, action) => {
      state.newInvoice.user = action.payload;
    },
    setInvoiceNumber: (state, action) => {
      state.invoiceNumber = action.payload;
    },
  },
});

export const { setNewInvoice, setInvoiceUser, setInvoiceNumber } =
  invoiceSlice.actions;
export default invoiceSlice.reducer;
