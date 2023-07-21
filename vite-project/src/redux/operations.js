import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://tender-ring-bee.cyclic.app/"

export const fetchInvoices = createAsyncThunk(
  "allInvoices/fetchInvoices",
  async (token, thunkAPI) => {
    try {
      const response = await axios.get("/invoices", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
