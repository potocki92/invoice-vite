import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Set the base URL for axios requests
axios.defaults.baseURL = "https://incom-fff0742e5ae9.herokuapp.com/";

/**
 * Set the authorization header for axios requests.
 *
 * @param {string} token - The authorization token to be set.
 * @returns {void}
 */
export const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

/**
 * Clear the authorization header for axios requests.
 *
 * @returns {void}
 */
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

/**
 * Async thunk for user registration.
 *
 * @param {Object} credentials - User registration credentials.
 * @param {Object} thunkAPI - The Thunk API object.
 * @returns {Promise} - A promise that resolves to the registration response data or rejects with an error.
 */
export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post("/register", credentials);
      setAuthHeader(res.data.token);
      return { success: true, message: res.data.message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
);

/**
 * Async thunk for user login.
 *
 * @param {Object} credentials - User login credentials.
 * @param {Object} thunkAPI - The Thunk API object.
 * @returns {Promise} - A promise that resolves to the login response data or rejects with an error.
 */
export const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post("/login", credentials);
      setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/**
 * Async thunk for user logout.
 *
 * @param {void} _ - No parameters needed.
 * @param {Object} thunkAPI - The Thunk API object.
 * @returns {Promise} - A promise that resolves to the logout response data or rejects with an error.
 */
export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/logout");
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

/**
 * Async thunk for refreshing user data.
 *
 * @param {void} _ - No parameters needed.
 * @param {Object} thunkAPI - The Thunk API object.
 * @returns {Promise} - A promise that resolves to the refreshed user data or rejects with an error.
 */
export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }

    try {
      setAuthHeader(persistedToken);
      const res = await axios.get("/current");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
