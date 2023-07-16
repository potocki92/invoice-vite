import { configureStore } from "@reduxjs/toolkit";
import invoiceReducer from "./invoiceSlice";

const store = configureStore({
  reducer: {
    invoice: invoiceReducer,
  },
});

export default store;
