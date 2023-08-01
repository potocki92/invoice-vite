import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setAuthHeader } from "../auth/operations";

axios.defaults.baseURL = "https://incom-fff0742e5ae9.herokuapp.com/";

export const fetchProducts = createAsyncThunk(
  "allProducts/fetchProducts",
  async (_, asyncThunkAPI) => {
    try {
      const token = asyncThunkAPI.getState().auth.token;
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

export const addProduct = createAsyncThunk(
  "allProducts/addProduct",
  async ( newProduct, asyncThunkAPI) => {
    try {
      const token = asyncThunkAPI.getState().auth.token;
      setAuthHeader(token);
      const response = await axios.post("/addProduct", newProduct)
      console.log("Added new product:", response.data);
      
      return newProduct
    } catch(error) {
      console.log(error)
      throw error
    }
  }
)