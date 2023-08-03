import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setAuthHeader } from "@redux/auth/operations";

axios.defaults.baseURL = "https://incom-fff0742e5ae9.herokuapp.com/";

export const fetchUser = createAsyncThunk("user/fetchUser", 
async (_, asyncThunkAPI) => {
  try {
    const token = asyncThunkAPI.getState().auth.token;
    setAuthHeader(token);
    const response = await axios.get("/user");
    console.log("Fetched user:", response.data);

    return response.data;
  } catch(error) {
    return asyncThunkAPI.rejectWithValue(error.message);
  }
});

export const updateUser= createAsyncThunk("user/updateUser",
async(credentials, asyncThunkAPI) => {
  try {
    const token = asyncThunkAPI.getState().auth.token;
    setAuthHeader(token);
    await axios.put('/user', credentials)
    console.log("User updated:", credentials);

    return credentials
  } catch(error) {
    return asyncThunkAPI.rejectWithValue(error.message);
  }
})
