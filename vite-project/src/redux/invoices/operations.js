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
