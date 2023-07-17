import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
    },
    setCompanyName: (state, action) => {
      state.user.name = action.payload
    }
  },
});

export const { setInvoice, setInvoiceNumber, setCompanyName } =
  invoiceSlice.actions;
export default invoiceSlice.reducer;
