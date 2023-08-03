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
        ...state,
        invoice: {
          ...state.invoice,
          ...action.payload,
        },
      };
    },
    setEditInvoice: (state, action) => {
      return {
        ...state,
        editInvoice: {
          ...state.editInvoice,
          ...action.payload,
        },
      };
    },
    setUserDetails: (state, action) => {
      const { name, NIP, REGON, email, phone, address } = action.payload;
      const isEditing = state.isEditing;
      const targetInvoice = isEditing ? state.editInvoice : state.invoice;
      targetInvoice.user.name = name;
      targetInvoice.user.NIP = NIP;
      targetInvoice.user.REGON = REGON;
      targetInvoice.user.email = email;
      targetInvoice.user.phone = phone;
      targetInvoice.user.address.city = address.city;
      targetInvoice.user.address.postalCode = address.postalCode;
      targetInvoice.user.address.street = address.street;
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

      const isEditing = state.isEditing;
      const targetInvoice = isEditing ? state.editInvoice : state.invoice;
      (targetInvoice.client.clientName = clientName),
        (targetInvoice.client.clientNip = clientNip),
        (targetInvoice.client.clientRegon = clientRegon),
        (targetInvoice.client.clientEmail = clientEmail),
        (targetInvoice.client.clientPhone = clientPhone),
        (targetInvoice.client.clientCity = clientCity),
        (targetInvoice.client.clientPostal = clientPostal),
        (targetInvoice.client.clientAddress = clientAddress);
    },
    updateProductData: (state, action) => {
      const { index, key, value } = action.payload;

      const isEditing = state.isEditing;
      const targetInvoice = isEditing ? state.editInvoice : state.invoice;
      if (index >= 0 && index < targetInvoice.products.items.length) {
        if (key === "qty" || key === "productsPrice" || key === "productsTax") {
          const floatValue = parseFloat(value);

          // Handle NaN value for productsTax
          const taxValue = isNaN(floatValue) ? 0 : floatValue;
          targetInvoice.products.items[index][key] = taxValue;

          const product = targetInvoice.products.items[index];
          const productTaxRate =
            product.qty * product.productsPrice * (product.productsTax / 100);
          const newAmount =
            product.qty * product.productsPrice + productTaxRate;
          product.productTaxRate = productTaxRate;
          product.amount = newAmount;

          targetInvoice.products.totalAmount = parseFloat(
            targetInvoice.products.items.reduce(
              (total, item) => total + item.amount,
              0
            )
          );
        } else {
          targetInvoice.products.items[index][key] = value;
        }
      }
    },
    addProductToInvoice: (state, action) => {
      const isEditing = state.isEditing;
      const targetInvoice = isEditing ? state.editInvoice : state.invoice;
      targetInvoice.products.items.push(action.payload);
    },
    removeProductFromInvoice: (state, action) => {
      const isEditing = state.isEditing;
      const targetInvoice = isEditing ? state.editInvoice : state.invoice;
      const productIndex = action.payload;
      if (
        productIndex >= 0 &&
        productIndex < targetInvoice.products.items.length
      ) {
        targetInvoice.products.items.splice(productIndex, 1);
      }
    },
    setInvoiceNumber: (state, action) => {
      const isEditing = state.isEditing;
      const targetInvoice = isEditing ? state.editInvoice : state.invoice;
      targetInvoice.invoiceNumber = action.payload;
    },
    setCompanyName: (state, action) => {
      const isEditing = state.isEditing;
      const targetInvoice = isEditing ? state.editInvoice : state.invoice;
      targetInvoice.user.name = action.payload;
    },
    setCompanyEmail: (state, action) => {
      const isEditing = state.isEditing;
      const targetInvoice = isEditing ? state.editInvoice : state.invoice;
      targetInvoice.user.email = action.payload;
    },
    setCompanyPhone: (state, action) => {
      const isEditing = state.isEditing;
      const targetInvoice = isEditing ? state.editInvoice : state.invoice;
      targetInvoice.user.phone = action.payload;
    },
    setCompanyNip: (state, action) => {
      const isEditing = state.isEditing;
      const targetInvoice = isEditing ? state.editInvoice : state.invoice;
      targetInvoice.user.NIP = action.payload;
    },
    setCompanyRegon: (state, action) => {
      const isEditing = state.isEditing;
      const targetInvoice = isEditing ? state.editInvoice : state.invoice;
      targetInvoice.user.REGON = action.payload;
    },
    setInvoiceDate: (state, action) => {
      const isEditing = state.isEditing;
      const targetInvoice = isEditing ? state.editInvoice : state.invoice;
      targetInvoice.date.invoiceDate = action.payload;
    },
    setDueDate: (state, action) => {
      const isEditing = state.isEditing;
      const targetInvoice = isEditing ? state.editInvoice : state.invoice;
      targetInvoice.date.dueDate = action.payload;
    },
    setCompanyCity: (state, action) => {
      const isEditing = state.isEditing;
      const targetInvoice = isEditing ? state.editInvoice : state.invoice;
      targetInvoice.user.address.city = action.payload;
    },
    setCompanyPostal: (state, action) => {
      const isEditing = state.isEditing;
      const targetInvoice = isEditing ? state.editInvoice : state.invoice;
      targetInvoice.user.address.postalCode = action.payload;
    },
    setCompanyAddress: (state, action) => {
      const isEditing = state.isEditing;
      const targetInvoice = isEditing ? state.editInvoice : state.invoice;
      targetInvoice.user.address.street = action.payload;
    },
    setClientName: (state, action) => {
      const isEditing = state.isEditing;
      const targetInvoice = isEditing ? state.editInvoice : state.invoice;
      targetInvoice.client.clientName = action.payload;
    },
    setClientEmail: (state, action) => {
      const isEditing = state.isEditing;
      const targetInvoice = isEditing ? state.editInvoice : state.invoice;
      targetInvoice.client.clientEmail = action.payload;
    },
    setClientNip: (state, action) => {
      const isEditing = state.isEditing;
      const targetInvoice = isEditing ? state.editInvoice : state.invoice;
      targetInvoice.client.clientNip = action.payload;
    },
    setClientRegon: (state, action) => {
      const isEditing = state.isEditing;
      const targetInvoice = isEditing ? state.editInvoice : state.invoice;
      targetInvoice.client.clientRegon = action.payload;
    },
    setClientPhone: (state, action) => {
      const isEditing = state.isEditing;
      const targetInvoice = isEditing ? state.editInvoice : state.invoice;
      targetInvoice.client.clientPhone = action.payload;
    },
    setClientCity: (state, action) => {
      const isEditing = state.isEditing;
      const targetInvoice = isEditing ? state.editInvoice : state.invoice;
      targetInvoice.client.clientCity = action.payload;
    },
    setClientPostal: (state, action) => {
      const isEditing = state.isEditing;
      const targetInvoice = isEditing ? state.editInvoice : state.invoice;
      targetInvoice.client.clientPostal = action.payload;
    },
    setClientAddress: (state, action) => {
      const isEditing = state.isEditing;
      const targetInvoice = isEditing ? state.editInvoice : state.invoice;
      targetInvoice.client.clientAddress = action.payload;
    },
    setNotes: (state, action) => {
      const isEditing = state.isEditing;
      const targetInvoice = isEditing ? state.editInvoice : state.invoice;
      targetInvoice.notes = action.payload;
    },
    setEditingMode: (state, action) => {
      state.isEditing = action.payload;
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
  setEditingMode,
  setEditInvoice,
} = invoiceSlice.actions;
export default invoiceSlice.reducer;
