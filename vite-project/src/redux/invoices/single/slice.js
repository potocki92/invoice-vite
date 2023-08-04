import { createSlice } from "@reduxjs/toolkit";
import { fetchInvoiceFromId } from "@redux/invoices/all/operations";
import { Types } from "mongoose";
/**
 * Creates an initial product object.
 * @returns {Object} Initial product object.
 */
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
/**
 * Updates invoice data based on the payload.
 * @param {Object} state - Current state.
 * @param {Object} payload - Payload containing update information.
 * @returns {Object} Updated state.
 */
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
/**
 * Redux slice for managing invoice-related state.
 */
const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    /**
     * Reducer for setting invoice data.
     * @param {Object} state - Current state.
     * @param {Object} action - Redux action.
     * @returns {Object} Updated state.
     */
    setInvoice: (state, action) => updateInvoiceData(state, { isEditing: false, data: action.payload }),
    /**
     * Reducer for setting edit invoice data.
     * @param {Object} state - Current state.
     * @param {Object} action - Redux action.
     * @returns {Object} Updated state.
     */
    setEditInvoice: (state, action) => updateInvoiceData(state, { isEditing: true, data: action.payload }),
    /**
     * Reducer function for updating user details in the invoice state.
     *
     * This reducer updates the user details, such as name, NIP, REGON, email, phone, and address,
     * based on the provided payload from the Redux action.
     *
     * @param {Object} state - The current invoice state.
     * @param {Object} action - The Redux action containing the payload.
     * @param {string} action.payload.name - The new name of the user.
     * @param {string} action.payload.NIP - The new NIP (Tax Identification Number) of the user.
     * @param {string} action.payload.REGON - The new REGON (National Business Registry Number) of the user.
     * @param {string} action.payload.email - The new email address of the user.
     * @param {string} action.payload.phone - The new phone number of the user.
     * @param {Object} action.payload.address - The new address of the user.
     * @param {string} action.payload.address.city - The new city in the user's address.
     * @param {string} action.payload.address.postalCode - The new postal code in the user's address.
     * @param {string} action.payload.address.street - The new street in the user's address.
     * @returns {Object} The updated invoice state with the modified user details.
     */
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
    /**
     * Reducer function for updating client data in the invoice state.
     *
     * This reducer updates the client's details, including name, NIP, REGON, email, phone,
     * address city, postal code, and street, based on the provided payload from the Redux action.
     *
     * @param {Object} state - The current invoice state.
     * @param {Object} action - The Redux action containing the payload.
     * @param {string} action.payload.clientName - The new name of the client.
     * @param {string} action.payload.clientNip - The new NIP (Tax Identification Number) of the client.
     * @param {string} action.payload.clientRegon - The new REGON (National Business Registry Number) of the client.
     * @param {string} action.payload.clientEmail - The new email address of the client.
     * @param {string} action.payload.clientPhone - The new phone number of the client.
     * @param {string} action.payload.clientCity - The new city in the client's address.
     * @param {string} action.payload.clientPostal - The new postal code in the client's address.
     * @param {string} action.payload.clientAddress - The new street address of the client.
     * @returns {Object} The updated invoice state with the modified client details.
     */
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
    /**
     * Reducer function for updating product data in the invoice state.
     *
     * This reducer updates the specified product's details, including quantity (qty),
     * product price, product tax, and recalculates related values such as tax rate and total amount.
     *
     * @param {Object} state - The current invoice state.
     * @param {Object} action - The Redux action containing the payload.
     * @param {number} action.payload.index - The index of the product in the items array.
     * @param {string} action.payload.key - The key of the property to update (e.g., "qty", "productsPrice").
     * @param {number|string} action.payload.value - The new value to set for the specified property.
     * @returns {Object} The updated invoice state with the modified product details and recalculated totals.
     */
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
    /**
     * Reducer function for adding a new product to the invoice state.
     *
     * This reducer appends a new product item to the list of products within the invoice.
     *
     * @param {Object} state - The current invoice state.
     * @param {Object} action - The Redux action containing the payload.
     * @param {Object} action.payload - The new product item to be added to the invoice.
     * @returns {void} This reducer directly modifies the state by adding a new product to the invoice.
     */
    addProductToInvoice: (state, action) => {
      const targetInvoice = state.isEditing ? state.editInvoice : state.invoice;
      targetInvoice.products.items.push(action.payload);
    },
    /**
     * Reducer function for removing a product from the invoice state.
     *
     * This reducer removes a product from the list of products within the invoice.
     *
     * @param {Object} state - The current invoice state.
     * @param {Object} action - The Redux action containing the payload.
     * @param {number} action.payload - The index of the product to be removed.
     * @returns {Object} The updated invoice state with the specified product removed.
     */
    removeProductFromInvoice: (state, action) => {
      const targetInvoice = state.isEditing ? state.editInvoice : state.invoice;
      const productIndex = action.payload;
      if (productIndex >= 0 && productIndex < targetInvoice.products.items.length) {
        targetInvoice.products.items.splice(productIndex, 1);
      }
    },
    /**
     * Reducer function for setting the invoice number in the invoice state.
     *
     * This reducer updates the invoice number based on the provided payload.
     *
     * @param {Object} state - The current invoice state.
     * @param {Object} action - The Redux action containing the payload.
     * @param {string} action.payload - The new invoice number to be set.
     * @returns {Object} The updated invoice state with the modified invoice number.
     */
    setInvoiceNumber: (state, action) => {
      return updateInvoiceData(state, { isEditing: state.isEditing, data: { invoiceNumber: action.payload } });
    },
    /**
     * Reducer function for setting the company name in the invoice state.
     *
     * This reducer updates the company name of the user associated with the invoice.
     *
     * @param {Object} state - The current invoice state.
     * @param {Object} action - The Redux action containing the payload.
     * @param {string} action.payload - The new company name to be set.
     * @returns {Object} The updated invoice state with the modified company name.
     */
    setCompanyName: (state, action) => {
      return updateInvoiceData(state, { isEditing: state.isEditing, data: { user: { ...state.invoice.user, name: action.payload } } });
    },
    /**
     * Reducer function for setting the company name in the invoice state.
     *
     * This reducer updates the company email of the user associated with the invoice.
     *
     * @param {Object} state - The current invoice state.
     * @param {Object} action - The Redux action containing the payload.
     * @param {string} action.payload - The new company name to be set.
     * @returns {Object} The updated invoice state with the modified company email.
     */
    setCompanyEmail: (state, action) => {
      return updateInvoiceData(state, { isEditing: state.isEditing, data: { user: { ...state.invoice.user, email: action.payload } } });
    },
    /**
     * Reducer function for setting the company phone number in the invoice state.
     *
     * This reducer updates the phone number of the company associated with the invoice.
     *
     * @param {Object} state - The current invoice state.
     * @param {Object} action - The Redux action containing the payload.
     * @param {string} action.payload - The new phone number to be set for the company.
     * @returns {Object} The updated invoice state with the modified company phone number.
     */
    setCompanyPhone: (state, action) => {
      return updateInvoiceData(state, { isEditing: state.isEditing, data: { user: { ...state.invoice.user, phone: action.payload } } });
    },
    /**
     * Reducer function for setting the company NIP (Tax Identification Number) in the invoice state.
     *
     * This reducer updates the NIP of the company associated with the invoice.
     *
     * @param {Object} state - The current invoice state.
     * @param {Object} action - The Redux action containing the payload.
     * @param {string} action.payload - The new NIP to be set for the company.
     * @returns {Object} The updated invoice state with the modified company NIP.
     */
    setCompanyNip: (state, action) => {
      return updateInvoiceData(state, { isEditing: state.isEditing, data: { user: { ...state.invoice.user, NIP: action.payload } } });
    },
    /**
     * Reducer function for setting the company REGON (National Business Registry Number) in the invoice state.
     *
     * This reducer updates the REGON of the company associated with the invoice.
     *
     * @param {Object} state - The current invoice state.
     * @param {Object} action - The Redux action containing the payload.
     * @param {string} action.payload - The new REGON to be set for the company.
     * @returns {Object} The updated invoice state with the modified company REGON.
     */
    setCompanyRegon: (state, action) => {
      return updateInvoiceData(state, { isEditing: state.isEditing, data: { user: { ...state.invoice.user, REGON: action.payload } } });
    },
    /**
     * Reducer function for setting the invoice date in the invoice state.
     *
     * This reducer updates the invoice date based on the provided payload.
     *
     * @param {Object} state - The current invoice state.
     * @param {Object} action - The Redux action containing the payload.
     * @param {string} action.payload - The new invoice date to be set.
     * @returns {Object} The updated invoice state with the modified invoice date.
     */
    setInvoiceDate: (state, action) => {
      return updateInvoiceData(state, { isEditing: state.isEditing, data: { date: { ...state.invoice.date, invoiceDate: action.payload } } });
    },
    /**
     * Reducer function for setting the due date in the invoice state.
     *
     * This reducer updates the due date of the invoice based on the provided payload.
     *
     * @param {Object} state - The current invoice state.
     * @param {Object} action - The Redux action containing the payload.
     * @param {string} action.payload - The new due date to be set for the invoice.
     * @returns {Object} The updated invoice state with the modified due date.
     */
    setDueDate: (state, action) => {
      return updateInvoiceData(state, { isEditing: state.isEditing, data: { date: { ...state.invoice.date, dueDate: action.payload } } });
    },
    /**
     * Reducer function for setting the company city in the invoice state.
     *
     * This reducer updates the city in the address of the company associated with the invoice.
     *
     * @param {Object} state - The current invoice state.
     * @param {Object} action - The Redux action containing the payload.
     * @param {string} action.payload - The new city to be set in the company's address.
     * @returns {Object} The updated invoice state with the modified company city.
     */
    setCompanyCity: (state, action) => {
      return updateInvoiceData(state, { isEditing: state.isEditing, data: { user: { ...state.invoice.user, address: { ...state.invoice.user.address, city: action.payload } } } });
    },
    /**
     * Reducer function for setting the company postal code in the invoice state.
     *
     * This reducer updates the postal code in the address of the company associated with the invoice.
     *
     * @param {Object} state - The current invoice state.
     * @param {Object} action - The Redux action containing the payload.
     * @param {string} action.payload - The new postal code to be set in the company's address.
     * @returns {Object} The updated invoice state with the modified company postal code.
     */
    setCompanyPostal: (state, action) => {
      return updateInvoiceData(state, { isEditing: state.isEditing, data: { user: { ...state.invoice.user, address: { ...state.invoice.user.address, postalCode: action.payload } } } });
    },
    /**
     * Reducer function for setting the company address in the invoice state.
     *
     * This reducer updates the street address in the address of the company associated with the invoice.
     *
     * @param {Object} state - The current invoice state.
     * @param {Object} action - The Redux action containing the payload.
     * @param {string} action.payload - The new street address to be set in the company's address.
     * @returns {Object} The updated invoice state with the modified company address.
     */
    setCompanyAddress: (state, action) => {
      return updateInvoiceData(state, { isEditing: state.isEditing, data: { user: { ...state.invoice.user, address: { ...state.invoice.user.address, street: action.payload } } } });
    },
    /**
     * Reducer function for setting the client's name in the invoice state.
     *
     * This reducer updates the name of the client associated with the invoice.
     *
     * @param {Object} state - The current invoice state.
     * @param {Object} action - The Redux action containing the payload.
     * @param {string} action.payload - The new name to be set for the client.
     * @returns {Object} The updated invoice state with the modified client's name.
     */
    setClientName: (state, action) => {
      return updateInvoiceData(state, { isEditing: state.isEditing, data: { client: { ...state.invoice.client, clientName: action.payload } } });
    },
    /**
     * Reducer function for setting the client's email in the invoice state.
     *
     * This reducer updates the email of the client associated with the invoice.
     *
     * @param {Object} state - The current invoice state.
     * @param {Object} action - The Redux action containing the payload.
     * @param {string} action.payload - The new email to be set for the client.
     * @returns {Object} The updated invoice state with the modified client's email.
     */
    setClientEmail: (state, action) => {
      return updateInvoiceData(state, { isEditing: state.isEditing, data: { client: { ...state.invoice.client, clientEmail: action.payload } } });
    },
    /**
     * Reducer function for setting the client's NIP (Tax Identification Number) in the invoice state.
     *
     * This reducer updates the NIP of the client associated with the invoice.
     *
     * @param {Object} state - The current invoice state.
     * @param {Object} action - The Redux action containing the payload.
     * @param {string} action.payload - The new NIP to be set for the client.
     * @returns {Object} The updated invoice state with the modified client's NIP.
     */
    setClientNip: (state, action) => {
      return updateInvoiceData(state, { isEditing: state.isEditing, data: { client: { ...state.invoice.client, clientNip: action.payload } } });
    },
    /**
     * Reducer function for setting the client's REGON (National Business Registry Number) in the invoice state.
     *
     * This reducer updates the REGON of the client associated with the invoice.
     *
     * @param {Object} state - The current invoice state.
     * @param {Object} action - The Redux action containing the payload.
     * @param {string} action.payload - The new REGON to be set for the client.
     * @returns {Object} The updated invoice state with the modified client's REGON.
     */
    setClientRegon: (state, action) => {
      return updateInvoiceData(state, { isEditing: state.isEditing, data: { client: { ...state.invoice.client, clientRegon: action.payload } } });
    },
    /**
     * Reducer function for setting the client's phone number in the invoice state.
     *
     * This reducer updates the phone number of the client associated with the invoice.
     *
     * @param {Object} state - The current invoice state.
     * @param {Object} action - The Redux action containing the payload.
     * @param {string} action.payload - The new phone number to be set for the client.
     * @returns {Object} The updated invoice state with the modified client's phone number.
     */
    setClientPhone: (state, action) => {
      return updateInvoiceData(state, { isEditing: state.isEditing, data: { client: { ...state.invoice.client, clientPhone: action.payload } } });
    },
    /**
     * Reducer function for setting the client's city in the invoice state.
     *
     * This reducer updates the city in the address of the client associated with the invoice.
     *
     * @param {Object} state - The current invoice state.
     * @param {Object} action - The Redux action containing the payload.
     * @param {string} action.payload - The new city to be set in the client's address.
     * @returns {Object} The updated invoice state with the modified client's city.
     */
    setClientCity: (state, action) => {
      return updateInvoiceData(state, { isEditing: state.isEditing, data: { client: { ...state.invoice.client, clientCity: action.payload } } });
    },
    /**
     * Reducer function for setting the client's postal code in the invoice state.
     *
     * This reducer updates the postal code in the address of the client associated with the invoice.
     *
     * @param {Object} state - The current invoice state.
     * @param {Object} action - The Redux action containing the payload.
     * @param {string} action.payload - The new postal code to be set in the client's address.
     * @returns {Object} The updated invoice state with the modified client's postal code.
     */
    setClientPostal: (state, action) => {
      return updateInvoiceData(state, { isEditing: state.isEditing, data: { client: { ...state.invoice.client, clientPostal: action.payload } } });
    },
    /**
     * Reducer function for setting the client's address in the invoice state.
     *
     * This reducer updates the street address in the address of the client associated with the invoice.
     *
     * @param {Object} state - The current invoice state.
     * @param {Object} action - The Redux action containing the payload.
     * @param {string} action.payload - The new street address to be set in the client's address.
     * @returns {Object} The updated invoice state with the modified client's address.
     */
    setClientAddress: (state, action) => {
      return updateInvoiceData(state, { isEditing: state.isEditing, data: { client: { ...state.invoice.client, clientAddress: action.payload } } });
    },
    /**
     * Reducer function for setting notes in the invoice state.
     *
     * This reducer updates the notes associated with the invoice.
     *
     * @param {Object} state - The current invoice state.
     * @param {Object} action - The Redux action containing the payload.
     * @param {string} action.payload - The new notes to be set for the invoice.
     * @returns {Object} The updated invoice state with the modified notes.
     */
    setNotes: (state, action) => {
      return updateInvoiceData(state, { isEditing: state.isEditing, data: { notes: action.payload } });
    },
    /**
     * Reducer function for setting the editing mode in the invoice state.
     *
     * This reducer updates the editing mode in the invoice state.
     *
     * @param {Object} state - The current invoice state.
     * @param {Object} action - The Redux action containing the payload.
     * @param {boolean} action.payload - The new editing mode value.
     * @returns {void}
     */
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
