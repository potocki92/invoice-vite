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
  invoice: {
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
  },
  editInvoice: {
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
  },
  isLoading: false,
  error: null,
  isEditing: false,
};

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    setInvoice: (state, action) => {
      return {
        ...state.invoice,
        ...action.payload,
      };
    },
    setUserDetails: (state, action) => {
      const { name, NIP, REGON, email, phone, address } = action.payload;
      state.invoice.user.name = name;
      state.invoice.user.NIP = NIP;
      state.invoice.user.REGON = REGON;
      state.invoice.user.email = email;
      state.invoice.user.phone = phone;
      state.invoice.user.address.city = address.city;
      state.invoice.user.address.postalCode = address.postalCode;
      state.invoice.user.address.street = address.street;
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

      (state.invoice.client.clientName = clientName),
        (state.invoice.client.clientNip = clientNip),
        (state.invoice.client.clientRegon = clientRegon),
        (state.invoice.client.clientEmail = clientEmail),
        (state.invoice.client.clientPhone = clientPhone),
        (state.invoice.client.clientCity = clientCity),
        (state.invoice.client.clientPostal = clientPostal),
        (state.invoice.client.clientAddress = clientAddress);
    },
    updateProductData: (state, action) => {
      const { index, key, value } = action.payload;
      if (index >= 0 && index < state.invoice.products.items.length) {
        if (key === "qty" || key === "productsPrice" || key === "productsTax") {
          const floatValue = parseFloat(value);

          // Handle NaN value for productsTax
          const taxValue = isNaN(floatValue) ? 0 : floatValue;
          state.invoice.products.items[index][key] = taxValue;

          const product = state.invoice.products.items[index];
          const productTaxRate =
            product.qty * product.productsPrice * (product.productsTax / 100);
          const newAmount =
            product.qty * product.productsPrice + productTaxRate;
          product.productTaxRate = productTaxRate;
          product.amount = newAmount;

          state.invoice.products.totalAmount = parseFloat(
            state.invoice.products.items.reduce((total, item) => total + item.amount, 0)
          );
        } else {
          state.invoice.products.items[index][key] = value;
        }
      }
    },
    addProductToInvoice: (state, action) => {
      state.invoice.products.items.push(action.payload);
    },
    removeProductFromInvoice: (state, action) => {
      const productIndex = action.payload;
      if (productIndex >= 0 && productIndex < state.invoice.products.items.length) {
        state.invoice.products.items.splice(productIndex, 1);
      }
    },
    setInvoiceNumber: (state, action) => {
      state.invoice.invoiceNumber = action.payload;
    },
    setCompanyName: (state, action) => {
      state.invoice.user.name = action.payload;
    },
    setCompanyEmail: (state, action) => {
      state.invoice.user.email = action.payload;
    },
    setCompanyPhone: (state, action) => {
      state.invoice.user.phone = action.payload;
    },
    setCompanyNip: (state, action) => {
      state.invoice.user.NIP = action.payload;
    },
    setCompanyRegon: (state, action) => {
      state.invoice.user.REGON = action.payload;
    },
    setInvoiceDate: (state, action) => {
      state.invoice.date.invoiceDate = action.payload;
    },
    setDueDate: (state, action) => {
      state.invoice.date.dueDate = action.payload;
    },
    setCompanyCity: (state, action) => {
      state.invoice.user.address.city = action.payload;
    },
    setCompanyPostal: (state, action) => {
      state.invoice.user.address.postalCode = action.payload;
    },
    setCompanyAddress: (state, action) => {
      state.invoice.user.address.street = action.payload;
    },
    setClientName: (state, action) => {
      state.invoice.client.clientName = action.payload;
    },
    setClientEmail: (state, action) => {
      state.invoice.client.clientEmail = action.payload;
    },
    setClientNip: (state, action) => {
      state.invoice.client.clientNip = action.payload;
    },
    setClientRegon: (state, action) => {
      state.invoice.client.clientRegon = action.payload;
    },
    setClientPhone: (state, action) => {
      state.invoice.client.clientPhone = action.payload;
    },
    setClientCity: (state, action) => {
      state.invoice.client.clientCity = action.payload;
    },
    setClientPostal: (state, action) => {
      state.invoice.client.clientPostal = action.payload;
    },
    setClientAddress: (state, action) => {
      state.invoice.client.clientAddress = action.payload;
    },
    setNotes: (state, action) => {
      state.invoice.notes = action.payload;
    },
    setEditingMode: (state, action) => {
      state.isEditing = action.payload
    }
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
        state.editInvoice = {
          ...state.editInvoice,
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
  setEditingMode
} = invoiceSlice.actions;
export default invoiceSlice.reducer;
