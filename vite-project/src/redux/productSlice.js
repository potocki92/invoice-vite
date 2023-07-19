import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

const productTaxRateSlice = createSlice({
  name: "productTaxRate",
  initialState,
  reducers: {
    setProductTaxRate: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setProductTaxRate } = productTaxRateSlice.actions;

export default productTaxRateSlice.reducer;
