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
      const { index, taxRate } = action.payload; // Używamy "index" zamiast "productId"
      const product = state.products[index]; // Używamy indeksu produktu jako identyfikatora
      if (product) {
        product.productsTaxRate = taxRate;
      }
    },
  },
});
export const { setProducts, setProductTaxRate } = productTaxRateSlice.actions;
export default productTaxRateSlice.reducer;