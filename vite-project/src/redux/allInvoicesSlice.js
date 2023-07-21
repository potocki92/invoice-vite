import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    allInvoices: [],
}

const allInvoicesSlice = createSlice({
    name: "allInvoices",
    initialState,
    reducers: {
        setAllInvoices: (state, action) => {
            state.allInvoices = action.payload
        }
    }
})

export const { setAllInvoices } = allInvoicesSlice.actions;
export default allInvoicesSlice.reducer;