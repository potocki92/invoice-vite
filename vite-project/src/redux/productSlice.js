import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  products: [],
};

const productTaxRateSlice = createSlice({
  name: "productTaxRate",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload
    },
    setProductTaxRate: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { setProducts, setProductTaxRate } = productTaxRateSlice.actions;
export default productTaxRateSlice.reducer;