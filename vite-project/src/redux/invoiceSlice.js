/*
  Redux slice for managing the invoice state.
  This slice handles the state related to invoice generation and management.
  It provides actions to add, update, and remove products from the invoice,
  set invoice information like invoice number, dates, company details, and client details.
  Additionally, it allows setting custom notes related to the invoice.
 */
import { createSlice } from "@reduxjs/toolkit";
import { fetchInvoiceFromId } from "./invoices/operations";
import { Types } from "mongoose";

// Initial state of the invoice slice.
const initialState = {
  _id: "",
  invoiceNumber: "",
  user: { address: {} },
  client: {},
  products: {
    items: [
      {
        _id: new Types.ObjectId(),
        productsName: "",
        qty: 0,
        productsPrice: 0,
        productsTax: 0,
        productTaxRate: 0,
        amount: 0,
      },
    ],
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
        ...action.payload,
      };
    },
    setUserDetails: (state, action) => {
      const { name, NIP, REGON, email, phone, address } = action.payload;
      state.user.name = name;
      state.user.NIP = NIP;
      state.user.REGON = REGON;
      state.user.email = email;
      state.user.phone = phone;
      state.user.address.city = address.city;
      state.user.address.postalCode = address.postalCode;
      state.user.address.street = address.street;
    },
    updateClientData: (state, action) => {
      const {
        clientName,
        clientNip,
        clientRegon,
        clientEmail,
        clientPhone,
        clientCity,
        clientPostal,
        clientAddress,
      } = action.payload;

      (state.client.clientName = clientName),
        (state.client.clientNip = clientNip),
        (state.client.clientRegon = clientRegon),
        (state.client.clientEmail = clientEmail),
        (state.client.clientPhone = clientPhone),
        (state.client.clientCity = clientCity),
        (state.client.clientPostal = clientPostal),
        (state.client.clientAddress = clientAddress);
    },
    updateProductData: (state, action) => {
      const { index, key, value } = action.payload;
      if (index >= 0 && index < state.products.items.length) {
        if (key === "qty" || key === "productsPrice" || key === "productsTax") {
          const floatValue = parseFloat(value);

          // Handle NaN value for productsTax
          const taxValue = isNaN(floatValue) ? 0 : floatValue;
          state.products.items[index][key] = taxValue;

          const product = state.products.items[index];
          const productTaxRate =
            product.qty * product.productsPrice * (product.productsTax / 100);
          const newAmount =
            product.qty * product.productsPrice + productTaxRate;
          product.productTaxRate = productTaxRate;
          product.amount = newAmount;

          state.products.totalAmount = parseFloat(
            state.products.items.reduce((total, item) => total + item.amount, 0)
          );
        } else {
          state.products.items[index][key] = value;
        }
      }
    },
    addProductToInvoice: (state, action) => {
      state.products.items.push(action.payload);
    },
    removeProductFromInvoice: (state, action) => {
      const productIndex = action.payload;
      if (productIndex >= 0 && productIndex < state.products.items.length) {
        state.products.items.splice(productIndex, 1);
      }
    },
    setInvoiceNumber: (state, action) => {
      state.invoiceNumber = action.payload;
    },
    setCompanyName: (state, action) => {
      state.user.name = action.payload;
    },
    setCompanyEmail: (state, action) => {
      state.user.email = action.payload;
    },
    setCompanyPhone: (state, action) => {
      state.user.phone = action.payload;
    },
    setCompanyNip: (state, action) => {
      state.user.NIP = action.payload;
    },
    setCompanyRegon: (state, action) => {
      state.user.REGON = action.payload;
    },
    setInvoiceDate: (state, action) => {
      state.date.invoiceDate = action.payload;
    },
    setDueDate: (state, action) => {
      state.date.dueDate = action.payload;
    },
    setCompanyCity: (state, action) => {
      state.user.address.city = action.payload;
    },
    setCompanyPostal: (state, action) => {
      state.user.address.postalCode = action.payload;
    },
    setCompanyAddress: (state, action) => {
      state.user.address.street = action.payload;
    },
    setClientName: (state, action) => {
      state.client.clientName = action.payload;
    },
    setClientEmail: (state, action) => {
      state.client.clientEmail = action.payload;
    },
    setClientNip: (state, action) => {
      state.client.clientNip = action.payload;
    },
    setClientRegon: (state, action) => {
      state.client.clientRegon = action.payload;
    },
    setClientPhone: (state, action) => {
      state.client.clientPhone = action.payload;
    },
    setClientCity: (state, action) => {
      state.client.clientCity = action.payload;
    },
    setClientPostal: (state, action) => {
      state.client.clientPostal = action.payload;
    },
    setClientAddress: (state, action) => {
      state.client.clientAddress = action.payload;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
  },
  extraReducers: (builed) => {
    builed
      .addCase(fetchInvoiceFromId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchInvoiceFromId.fulfilled, (state, action) => {
        const { _id, invoiceNumber, user, client, products, date } =
          action.payload;
        return {
          ...state,
          _id,
          invoiceNumber,
          user: { ...state.user, ...user },
          client: { ...state.client, ...client },
          products: { ...state.products, ...products },
          date: { ...state.date, ...date },
        };
      });
  },
});

export const {
  addProductToInvoice,
  setUserDetails,
  updateClientData,
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
} = invoiceSlice.actions;
export default invoiceSlice.reducer;
