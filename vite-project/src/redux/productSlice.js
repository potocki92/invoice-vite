import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: {},
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
      addProduct: (state, action) => {
        const { _id, productsName, qty, productsPrice, productsTax, amount } = action.payload;
        state.products[_id] = {
          _id,
          productsName,
          qty: Number(qty),
          productsPrice: Number(productsPrice),
          productsTax: Number(productsTax),
          amount: Number(amount),
        };
      },
      updateProduct: (state, action) => {
        const { _id, productsName, qty, productsPrice, productsTax, amount } = action.payload;
        if (state.products[_id]) {
          state.products[_id] = {
            ...state.products[_id], // Dodajemy, aby zachować pozostałe pola _id
            productsName,
            qty: Number(qty),
            productsPrice: Number(productsPrice),
            productsTax: Number(productsTax),
            amount: Number(amount),
          };
        }
      },
      removeProduct: (state, action) => {
        const productId = action.payload;
        delete state.products[productId];
      },
    },
  });

export const { addProduct, updateProduct, removeProduct } = productSlice.actions;
export default productSlice.reducer;
