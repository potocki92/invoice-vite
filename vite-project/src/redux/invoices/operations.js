import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAuthHeader } from "../auth/operations";

axios.defaults.baseURL = "https://incom-fff0742e5ae9.herokuapp.com/";

export const fetchInvoices = createAsyncThunk(
  "allInvoices/fetchInvoices",
  async (_, asyncThunkAPI) => {
    const token = asyncThunkAPI.getState().auth.token;
    setAuthHeader(token);
    const response = await axios.get("/invoices");
    console.log("Fetched invoices:", response.data);
    return response.data;
  }
);

export const addInvoice = createAsyncThunk(
  "allInvoices/addInvoice",
  async ( newInvoice, asyncThunkAPI) => {
    try{

      const token = asyncThunkAPI.getState().auth.token;
      setAuthHeader(token);
      const response = await axios.post("/addInvoice", newInvoice);
      console.log("Add invoice:", newInvoice)
      return newInvoice
  } catch(error) {
      console.error(error);
      throw error 
    }
  }
)