import { configureStore } from "@reduxjs/toolkit";
import invoiceReducer from "./invoiceSlice";
import totalReducer from "./totalSlice"
import productReducer from "./productSlice"
import clientsReducer from "./clientsSlice";

const store = configureStore({
  reducer: {
    invoice: invoiceReducer,
    total: totalReducer,
    product: productReducer,
    clients: clientsReducer,
  },
});

export default store;
