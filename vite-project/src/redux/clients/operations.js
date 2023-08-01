import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setAuthHeader } from "../auth/operations";

axios.defaults.baseURL = "https://incom-fff0742e5ae9.herokuapp.com/";

export const fetchClients = createAsyncThunk(
    "allClients/fetchClients",
    async(_, asyncThunkAPI) => {
        const token = asyncThunkAPI.getState().auth.token;
        setAuthHeader(token);
        const response = await axios.get("/clients")
        console.log("Fetched clients:", response.data)
        return response.data
    }
)

export const addClient = createAsyncThunk(
    "allClients/addClients",
    async(credentials, asyncThunkAPI) => {
        try {
            const token = asyncThunkAPI.getState().auth.token;
            setAuthHeader(token)
            const response = await axios.post("/addClient", credentials);
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)