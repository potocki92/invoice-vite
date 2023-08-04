import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAuthHeader } from "@redux/auth/operations";

// Set the base URL for axios requests
axios.defaults.baseURL = "https://incom-fff0742e5ae9.herokuapp.com/";

/**
 * Async thunk to fetch invoices from the server.
 *
 * @returns {Promise} - A promise that resolves to the fetched invoices or rejects with an error.
 */
export const fetchInvoices = createAsyncThunk(
  "allInvoices/fetchInvoices",
  async (_, asyncThunkAPI) => {
    const token = asyncThunkAPI.getState().auth.token;
    setAuthHeader(token);
    try {
      const response = await axios.get("/invoices");
      console.log("Fetched invoices:", response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

/**
 * Async thunk to add a new invoice to the server.
 *
 * @param {Object} newInvoice - The new invoice data to be added.
 * @returns {Promise} - A promise that resolves to the added invoice data or rejects with an error.
 */
export const addInvoice = createAsyncThunk(
  "allInvoices/addInvoice",
  async (newInvoice, asyncThunkAPI) => {
    try {
      const token = asyncThunkAPI.getState().auth.token;
      setAuthHeader(token);
      const response = await axios.post("/addInvoice", newInvoice);
      console.log("Add invoice:", newInvoice);
      return newInvoice;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

/**
 * Async thunk to delete an invoice from the server.
 *
 * @param {string} invoiceId - The ID of the invoice to be deleted.
 * @returns {Promise} - A promise that resolves to the deleted invoice ID or rejects with an error.
 */
export const deleteInvoice = createAsyncThunk(
  "allInvoices/deleteInvoice",
  async (invoiceId, asyncThunkAPI) => {
    try {
      const token = asyncThunkAPI.getState().auth.token;
      setAuthHeader(token);
      await axios.delete(`/invoice/${invoiceId}`);
      console.log("Invoice deleted:", invoiceId);

      return invoiceId;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

/**
 * Async thunk to fetch an invoice by ID from the server.
 *
 * @param {string} invoiceId - The ID of the invoice to be fetched.
 * @returns {Promise} - A promise that resolves to the fetched invoice data or rejects with an error.
 */
export const fetchInvoiceFromId = createAsyncThunk(
  "allInvoices/fetchInvoiceFromId",
  async (invoiceId, asyncThunkAPI) => {
    try {
      const token = asyncThunkAPI.getState().auth.token;
      setAuthHeader(token);
      const response = await axios.get(`/invoice/${invoiceId}`);
      console.log("Invoice fetched:", response.data);

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

/**
 * Async thunk to update an existing invoice on the server.
 *
 * @param {Object} payload - The payload containing the invoice ID and updated invoice data.
 * @returns {Promise} - A promise that resolves to the updated invoice data or rejects with an error.
 */
export const updateInvoice = createAsyncThunk(
  "allInvoices/updateInvoice",
  async ({ invoiceId, invoice }, asyncThunkAPI) => {
    try {
      const token = asyncThunkAPI.getState().auth.token;
      setAuthHeader(token);
      await axios.put(`/invoice/${invoiceId}`, invoice);
      console.log("Invoice updated:", invoice);

      return { invoiceId, invoice };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
