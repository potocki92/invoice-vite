import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setAuthHeader } from "@redux/auth/operations";

// Set the base URL for axios requests
axios.defaults.baseURL = "https://incom-fff0742e5ae9.herokuapp.com/";

/**
 * Async thunk to fetch products from the server.
 *
 * @returns {Promise} - A promise that resolves to the fetched products or rejects with an error.
 */
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
      throw error;
    }
  }
);

/**
 * Async thunk to add a new product to the server.
 *
 * @param {Object} newProduct - The new product data to be added.
 * @returns {Promise} - A promise that resolves to the added product data or rejects with an error.
 */
export const addProduct = createAsyncThunk(
  "allProducts/addProduct",
  async (newProduct, asyncThunkAPI) => {
    try {
      const token = asyncThunkAPI.getState().auth.token;
      setAuthHeader(token);
      const response = await axios.post("/addProduct", newProduct);
      console.log("Added new product:", response.data);

      return newProduct;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

/**
 * Async thunk to delete a product from the server.
 *
 * @param {string} productId - The ID of the product to be deleted.
 * @returns {Promise} - A promise that resolves to the deleted product ID or rejects with an error.
 */
export const deleteProduct = createAsyncThunk(
  "allProducts/deleteProduct",
  async (productId, asyncThunkAPI) => {
    try {
      const token = asyncThunkAPI.getState().auth.token;
      setAuthHeader(token);
      await axios.delete(`/products/${productId}`);
      console.log("Product deleted:", productId);

      return productId;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
