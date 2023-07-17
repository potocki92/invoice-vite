import { configureStore } from "@reduxjs/toolkit";
import invoiceReducer from "./invoiceSlice";
import totalReducer from "./totalSlice"
import productReducer from "./productSlice"

const store = configureStore({
  reducer: {
    invoice: invoiceReducer,
    total: totalReducer,
    product: productReducer
  },
});

export default store;
