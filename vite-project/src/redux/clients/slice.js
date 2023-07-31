import { createSlice } from "@reduxjs/toolkit";
import { fetchClients } from "./operations";

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
      });
  },
});

export default allClientsSlice.reducer;
