import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    total: 0
}

const totalSlice = createSlice({
    name: "total",
    initialState,
    reducers: {
        setTotal: (state, action) => {
            state.total = action.payload
        }
    }
})

export const { setTotal } = totalSlice.actions
export default totalSlice.reducer