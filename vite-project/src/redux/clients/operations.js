import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setAuthHeader } from "../auth/operations";

axios.defaults.baseURL = "https://tender-ring-bee.cyclic.app/";

export const fetchClients = createAsyncThunk(
    "allClients/fetchClients",
    async(token) => {
        setAuthHeader(token);
        const response = await axios.get("/clients")
        console.log("Fetched clients:", response.data)
        return response.data
    }
)