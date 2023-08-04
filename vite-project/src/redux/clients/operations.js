import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setAuthHeader } from "@redux/auth/operations";

// Set the base URL for axios requests
axios.defaults.baseURL = "https://incom-fff0742e5ae9.herokuapp.com/";

/**
 * Async thunk to fetch clients from the server.
 *
 * @returns {Promise} - A promise that resolves to the fetched clients or rejects with an error.
 */
export const fetchClients = createAsyncThunk(
  "allClients/fetchClients",
  async (_, asyncThunkAPI) => {
    const token = asyncThunkAPI.getState().auth.token;
    setAuthHeader(token);
    try {
      const response = await axios.get("/clients");
      console.log("Fetched clients:", response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

/**
 * Async thunk to add a new client to the server.
 *
 * @param {Object} newClient - The new client data to be added.
 * @returns {Promise} - A promise that resolves to the added client data or rejects with an error.
 */
export const addClient = createAsyncThunk(
  "allClients/addClient",
  async (newClient, asyncThunkAPI) => {
    try {
      const token = asyncThunkAPI.getState().auth.token;
      setAuthHeader(token);
      const response = await axios.post("/addClient", newClient);
      console.log("Add client:", newClient);
      return newClient;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

/**
 * Async thunk to delete a client from the server.
 *
 * @param {string} clientId - The ID of the client to be deleted.
 * @returns {Promise} - A promise that resolves to the deleted client ID or rejects with an error.
 */
export const deleteClient = createAsyncThunk(
  "allClients/deleteClient",
  async (clientId, asyncThunkAPI) => {
    try {
      const token = asyncThunkAPI.getState().auth.token;
      setAuthHeader(token);
      await axios.delete(`/clients/${clientId}`);
      console.log("Client deleted:", clientId);

      return clientId;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
