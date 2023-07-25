import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import invoiceReducer from "./invoiceSlice";
import totalReducer from "./totalSlice";
import productReducer from "./productSlice";
import clientsReducer from "./clientsSlice";
import allInvoicesReducer from "./allInvoicesSlice";
import { authReducer } from "./auth/slice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    invoice: invoiceReducer,
    allInvoices: allInvoicesReducer,
    total: totalReducer,
    product: productReducer,
    clients: clientsReducer,
  },
});

export default store;
