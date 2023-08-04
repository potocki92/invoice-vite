import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setAuthHeader } from "@redux/auth/operations";

axios.defaults.baseURL = "https://incom-fff0742e5ae9.herokuapp.com/";

/**
 * Fetches the user's data from the server.
 *
 * @returns {Promise} - A promise that resolves to the fetched user data or rejects with an error.
 */
export const fetchUser = createAsyncThunk("user/fetchUser", async (_, asyncThunkAPI) => {
  try {
    const token = asyncThunkAPI.getState().auth.token;
    setAuthHeader(token);
    const response = await axios.get("/user");
    console.log("Fetched user:", response.data);

    return response.data;
  } catch (error) {
    return asyncThunkAPI.rejectWithValue(error.message);
  }
});

/**
 * Updates the user's data on the server.
 *
 * @param {Object} credentials - The updated user credentials.
 * @param {string} credentials.name - The updated user's name.
 * @param {string} credentials.email - The updated user's email.
 * @param {string} credentials.password - The updated user's password.
 * @returns {Promise} - A promise that resolves to the updated user credentials or rejects with an error.
 */
export const updateUser = createAsyncThunk("user/updateUser", async (credentials, asyncThunkAPI) => {
  try {
    const token = asyncThunkAPI.getState().auth.token;
    setAuthHeader(token);
    await axios.put('/user', credentials);
    console.log("User updated:", credentials);

    return credentials;
  } catch (error) {
    return asyncThunkAPI.rejectWithValue(error.message);
  }
});
