import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setAuthHeader } from "../auth/operations";

axios.defaults.baseURL = "https://tender-ring-bee.cyclic.app/";

export const fetchProducts = createAsyncThunk(
  "allProducts/fetchProducts",
  async (token) => {
    try {
      setAuthHeader(token);
      const response = await axios.get("/products");
      console.log("Fetched products:", response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error
    }
  }
);
