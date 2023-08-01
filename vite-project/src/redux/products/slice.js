import { createSlice } from "@reduxjs/toolkit";
import { addProduct, fetchProducts } from "./operations";

const initialState = {
  allProducts: [],
  isLoading: false,
  error: null,
};

const allProductsSlice = createSlice({
  name: "allProducts",
  initialState,
  reducers: {
    addProducct: (state, action) => {
      state.allProducts.push(action.payload)
    }
  },
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
  },
});

export default allProductsSlice.reducer;
