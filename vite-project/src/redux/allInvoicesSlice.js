import { createSlice } from "@reduxjs/toolkit"
import { fetchInvoices } from "./operations";

const initialState = {
    allInvoices: [],
    isLoading: false,
    error: null
}

const allInvoicesSlice = createSlice({
    name: "allInvoices",
    initialState,
    extraReducers: {
        [fetchInvoices.pending](state) {
            state.isLoading = true
        },
        [fetchInvoices.fulfilled](state, action) {
            state.isLoading = false;
            state.error = null;
            state.allInvoices = action.payload;
        },
        [fetchInvoices.rejected](state, action) {
            state.isLoading = false;
            state.error = action.payload
        }
    }
})

export const { fetchingInProgress, fetchingSuccess, fetchingError, setAllInvoices } = allInvoicesSlice.actions;
export default allInvoicesSlice.reducer;