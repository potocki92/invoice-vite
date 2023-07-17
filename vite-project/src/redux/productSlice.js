import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    productsPrice: 0,
    productsQty: 1,
    productTaxRate: 0,
    amount: 0
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setSubtotal: (state, action) => {
            state.subtotal = action.payload
        },
        setProductTaxRate: (state, action) => {
            state.productTaxRate = action.payload
        }
    }
})

export const { setSubtotal } = productSlice.actions
export default productSlice.reducer