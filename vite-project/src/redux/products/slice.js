import { createSlice } from "@reduxjs/toolkit";
import { addProduct, deleteProduct, fetchProducts } from "./operations";

const initialState = {
  allProducts: [],
  isLoading: false,
  error: null,
};

const allProductsSlice = createSlice({
  name: "allProducts",
  initialState,
  reducers: {
    setProductTaxRate: (state, action) => {
    const { index, taxRate } = action.payload; // Używamy "index" zamiast "productId"
    const product = state.allProducts[index]; // Używamy indeksu produktu jako identyfikatora
    if (product) {
      product.productsTaxRate = taxRate;
    }
  },},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.allProducts = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.allProducts.push(action.payload)
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.allProducts = state.allProducts.filter((product) => product._id !== action.payload)
      })
  },
});
export const { setProductTaxRate } = allProductsSlice.actions;
export default allProductsSlice.reducer;
