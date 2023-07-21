import { configureStore } from "@reduxjs/toolkit";
import invoiceReducer from "./invoiceSlice";
import totalReducer from "./totalSlice"
import productReducer from "./productSlice"
import clientsReducer from "./clientsSlice";
import allInvoicesReducer from "./allInvoicesSlice";

const store = configureStore({
  reducer: {
    invoice: invoiceReducer,
    allInvoices: allInvoicesReducer,
    total: totalReducer,
    product: productReducer,
    clients: clientsReducer,
  },
});

export default store;
