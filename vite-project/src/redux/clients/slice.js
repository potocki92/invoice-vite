import { createSlice } from "@reduxjs/toolkit";
import { addClient, deleteClient, fetchClients } from "./operations";

const initialState = {
    allClients: [],
  isLoading: false,
  error: null,
};

const allClientsSlice = createSlice({
  name: "allClients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.allClients = action.payload;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addClient.fulfilled, (state, action) => {
        state.allClients.push(action.payload)
      })
      .addCase(addClient.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addClient.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.allClients = state.allClients.filter((client) => client._id !== action.payload)
      })
  },
});

export default allClientsSlice.reducer;
