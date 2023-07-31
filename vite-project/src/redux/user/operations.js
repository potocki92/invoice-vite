import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setAuthHeader } from "../auth/operations";

axios.defaults.baseURL = "https://tender-ring-bee.cyclic.app/";

export const fetchUser = createAsyncThunk(
    "user/fetchUser",
    async(token) => {
        setAuthHeader(token);
        const response = await axios.get("/user")
        console.log("Fetched user:", response.data)
    }
)