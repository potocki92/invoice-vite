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
    "allClients/addClient",
    async (newClient, asyncThunkAPI) => {
        try {
            const token = asyncThunkAPI.getState().auth.token;
            setAuthHeader(token)
            console.log("Add client:", newClient);
            return newClient
        } catch(error) {
            console.error(error)
            throw error
        }
    }
)