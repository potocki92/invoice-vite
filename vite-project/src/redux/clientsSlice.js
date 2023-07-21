import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    clients: []
}

const clientsSlice = createSlice({
    name: "clients",
    initialState,
    reducers: {
        setClients: (state, action) => {
            state.clients = action.payload
        }
    }
})
export const { setClients } = clientsSlice.actions
export default clientsSlice.reducer