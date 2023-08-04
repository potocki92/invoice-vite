import { createSlice } from "@reduxjs/toolkit";
import { fetchInvoiceFromId } from "@redux/invoices/all/operations";
import { Types } from "mongoose";

const createInitialProduct = () => ({
  _id: new Types.ObjectId(),
  productsName: "",
  qty: 0,
  productsPrice: 0,
  productsTax: 0,
  productTaxRate: 0,
  amount: 0,
});

const initialState = {
  invoice: {
    _id: "",
    invoiceNumber: "",
    user: { address: {} },
    client: {},
    products: {
      items: [createInitialProduct()],
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
      items: [createInitialProduct()],
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

const updateInvoiceData = (state, payload) => {
  const { isEditing, targetInvoice } = payload;
  const targetState = isEditing ? state.editInvoice : state.invoice;
  return {
    ...state,
    [isEditing ? "editInvoice" : "invoice"]: {
      ...targetState,
      ...payload.data,
    },
  };
};

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    setInvoice: (state, action) => updateInvoiceData(state, { isEditing: false, data: action.payload }),
    setEditInvoice: (state, action) => updateInvoiceData(state, { isEditing: true, data: action.payload }),
    setUserDetails: (state, action) => {
      const { name, NIP, REGON, email, phone, address } = action.payload;
      return updateInvoiceData(state, {
        isEditing: state.isEditing,
        data: {
          ...state.invoice,
          user: {
            ...state.invoice.user,
            name,
            NIP,
            REGON,
            email,
            phone,
            address: {
              ...state.invoice.user.address,
              city: address.city,
              postalCode: address.postalCode,
              street: address.street,
            },
          },
        },
      });
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
      return updateInvoiceData(state, {
        isEditing: state.isEditing,
        data: {
          ...state.invoice,
          client: {
            ...state.invoice.client,
            clientName,
            clientNip,
            clientRegon,
            clientEmail,
            clientPhone,
            clientCity,
            clientPostal,
            clientAddress,
          },
        },
      });
    },
    updateProductData: (state, action) => {
      const { index, key, value } = action.payload;
      const targetInvoice = state.isEditing ? state.editInvoice : state.invoice;
      if (index >= 0 && index < targetInvoice.products.items.length) {
        const product = targetInvoice.products.items[index];
        if (key === "qty" || key === "productsPrice" || key === "productsTax") {
          
          const floatValue = parseFloat(value);
          const taxValue = isNaN(floatValue) ? 0 : floatValue;
          product[key] = taxValue;
          const productTaxRate = product.qty * product.productsPrice * (product.productsTax / 100);
          const newAmount = product.qty * product.productsPrice + productTaxRate;
          product.productTaxRate = productTaxRate;
          product.amount = newAmount;
          targetInvoice.products.totalAmount = parseFloat(
            targetInvoice.products.items.reduce((total, item) => total + item.amount, 0)
          );
        } else {
          product[key] = value;
        }
  }
  return state;
},
    addProductToInvoice: (state, action) => {
      const targetInvoice = state.isEditing ? state.editInvoice : state.invoice;
      targetInvoice.products.items.push(action.payload);
    },
    removeProductFromInvoice: (state, action) => {
      const targetInvoice = state.isEditing ? state.editInvoice : state.invoice;
      const productIndex = action.payload;
      if (productIndex >= 0 && productIndex < targetInvoice.products.items.length) {
        targetInvoice.products.items.splice(productIndex, 1);
      }
    },
    setInvoiceNumber: (state, action) => {
      return updateInvoiceData(state, { isEditing: state.isEditing, data: { invoiceNumber: action.payload } });
    },
    setCompanyName: (state, action) => {
      return updateInvoiceData(state, { isEditing: state.isEditing, data: { user: { ...state.invoice.user, name: action.payload } } });
    },
    setCompanyEmail: (state, action) => {
      return updateInvoiceData(state, { isEditing: state.isEditing, data: { user: { ...state.invoice.user, email: action.payload } } });
    },
    setCompanyPhone: (state, action) => {
      return updateInvoiceData(state, { isEditing: state.isEditing, data: { user: { ...state.invoice.user, phone: action.payload } } });
    },
    setCompanyNip: (state, action) => {
      return updateInvoiceData(state, { isEditing: state.isEditing, data: { user: { ...state.invoice.user, NIP: action.payload } } });
    },
    setCompanyRegon: (state, action) => {
      return updateInvoiceData(state, { isEditing: state.isEditing, data: { user: { ...state.invoice.user, REGON: action.payload } } });
    },
    setInvoiceDate: (state, action) => {
      return updateInvoiceData(state, { isEditing: state.isEditing, data: { date: { ...state.invoice.date, invoiceDate: action.payload } } });
    },
    setDueDate: (state, action) => {
      return updateInvoiceData(state, { isEditing: state.isEditing, data: { date: { ...state.invoice.date, dueDate: action.payload } } });
    },
    setCompanyCity: (state, action) => {
      return updateInvoiceData(state, { isEditing: state.isEditing, data: { user: { ...state.invoice.user, address: { ...state.invoice.user.address, city: action.payload } } } });
    },
    setCompanyPostal: (state, action) => {
      return updateInvoiceData(state, { isEditing: state.isEditing, data: { user: { ...state.invoice.user, address: { ...state.invoice.user.address, postalCode: action.payload } } } });
    },
    setCompanyAddress: (state, action) => {
      return updateInvoiceData(state, { isEditing: state.isEditing, data: { user: { ...state.invoice.user, address: { ...state.invoice.user.address, street: action.payload } } } });
    },
    setClientName: (state, action) => {
      return updateInvoiceData(state, { isEditing: state.isEditing, data: { client: { ...state.invoice.client, clientName: action.payload } } });
    },
    setClientEmail: (state, action) => {
      return updateInvoiceData(state, { isEditing: state.isEditing, data: { client: { ...state.invoice.client, clientEmail: action.payload } } });
    },
    setClientNip: (state, action) => {
      return updateInvoiceData(state, { isEditing: state.isEditing, data: { client: { ...state.invoice.client, clientNip: action.payload } } });
    },
    setClientRegon: (state, action) => {
      return updateInvoiceData(state, { isEditing: state.isEditing, data: { client: { ...state.invoice.client, clientRegon: action.payload } } });
    },
    setClientPhone: (state, action) => {
      return updateInvoiceData(state, { isEditing: state.isEditing, data: { client: { ...state.invoice.client, clientPhone: action.payload } } });
    },
    setClientCity: (state, action) => {
      return updateInvoiceData(state, { isEditing: state.isEditing, data: { client: { ...state.invoice.client, clientCity: action.payload } } });
    },
    setClientPostal: (state, action) => {
      return updateInvoiceData(state, { isEditing: state.isEditing, data: { client: { ...state.invoice.client, clientPostal: action.payload } } });
    },
    setClientAddress: (state, action) => {
      return updateInvoiceData(state, { isEditing: state.isEditing, data: { client: { ...state.invoice.client, clientAddress: action.payload } } });
    },
    setNotes: (state, action) => {
      return updateInvoiceData(state, { isEditing: state.isEditing, data: { notes: action.payload } });
    },
    setEditingMode: (state, action) => {
      state.isEditing = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoiceFromId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchInvoiceFromId.fulfilled, (state, action) => {
        const { _id, invoiceNumber, user, client, products, date } = action.payload;
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
