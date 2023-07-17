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
      dueDate: new Date().toISOString().substring(0, 10),
      invoiceDate: new Date().toISOString().substring(0, 10),
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
    },
    setCompanyEmail: (state, action) => {
      state.user.email = action.payload
    },
    setCompanyPhone: (state, action) => {
      state.user.phone = action.payload
    },
    setCompanyNip: (state, action) => {
      state.user.NIP = action.payload
    },
    setCompanyRegon: (state, action) =>{
      state.user.REGON = action.payload
    },
    setInvoiceDate: (state, action) => {
      state.date.invoiceDate = action.payload
    },
    setDueDate: (state, action) => {
      state.date.dueDate = action.payload
    },
    setCompanyCity: (state, action) => {
      state.user.address.city = action.payload
    },
    setCompanyPostal: (state, action) => {
      state.user.address.postalCode = action.payload
    },
    setCompanyAddress: (state, action) => {
      state.user.address.street = action.payload
    },
    setClientName: (state, action) => {
      state.client.clientName = action.payload
    },
    setClientEmail: (state, action) => {
      state.client.clientEmail = action.payload
    },
    setClientNip: (state, action) => {
      state.client.clientNip = action.payload
    },
    setClientRegon: (state, action) => {
      state.client.clientRegon = action.payload
    },
    setClientPhone: (state, action) => {
      state.client.clientPhone = action.payload
    },
    setClientCity: (state, action) => {
      state.client.clientCity = action.payload
    },
    setClientPostal: (state, action) => {
      state.client.clientPostal = action.payload
    },
    setClientAddress: (state, action) => {
      state.client.clientAddress = action.payload
    },
    setNotes: (state, action) => {
      state.notes = action.payload
    },
  },
});

export const { 
  setInvoice, 
  setInvoiceDate, 
  setDueDate, 
  setInvoiceNumber, 
  setCompanyName, 
  setCompanyEmail, 
  setCompanyPhone,
  setCompanyCity,
  setCompanyPostal,
  setCompanyAddress,
  setCompanyNip,
  setCompanyRegon,
  setClientName,
  setClientEmail,
  setClientNip,
  setClientRegon,
  setClientPhone,
  setClientCity,
  setClientPostal,
  setClientAddress,
  setNotes,
} =
  invoiceSlice.actions;
export default invoiceSlice.reducer;
