import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAuthHeader } from "../auth/operations";

axios.defaults.baseURL = "https://tender-ring-bee.cyclic.app/";

export const fetchInvoices = createAsyncThunk(
  "allInvoices/fetchInvoices",
  async (token) => {
    setAuthHeader(token);
    const response = await axios.get("/invoices");
    console.log("Fetched invoices:", response.data);
    return response.data;
  }
);
