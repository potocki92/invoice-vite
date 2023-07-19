import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
    invoiceNumber: "",
    user: { address: {} },
    client: {},
    products: {
      items: [{
        productsName: "",
        qty: 1,
        productsPrice: 0,
        productsTax: 0,
        amount: 0,
      }],
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
    updateProductData: (state, action) => {
      const { index, key, value } = action.payload;
      if (index >= 0 && index < state.products.items.length) {
        if(key === "qty" || key === "productsPrice" || key === "productsTax") {
          const floatValue = parseFloat(value)
          state.products.items[index][key] = floatValue;

          const product = state.products.items[index];
          const newAmount = product.qty * product.productsPrice + product.productsTax;
          product.amount = newAmount;
          
          state.products.totalAmount = parseFloat(state.products.items.reduce((total, item) => total + item.amount, 0));
        } else {
          state.products.items[index][key] = value
        }
        }

        
    },
    addProductToInvoice: (state, action) => {
      state.products.items.push(action.payload)
    },
    removeProductFromInvoice: (state, action) => {
      const productIndex = action.payload
      if (productIndex >= 0 && productIndex < state.products.items.length) {
        state.products.items.splice(productIndex, 1)
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
  addProductToInvoice,
  updateProductData,
  removeProductFromInvoice,
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
