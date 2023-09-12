import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
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
import invoiceReducer from "./invoices/single/slice";
import allProductsReducer from "./products/slice";
import allInvoicesReducer from "./invoices/all/slice";
import allClientsReducer from "./clients/slice";
import userReducer from "./user/slice";
import homeReducer from "./home/slice";
import { authReducer } from "./auth/slice";

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
];

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
    allProducts: allProductsReducer,
    allClients: allClientsReducer,
    user: userReducer,
    home: homeReducer,
  },
  middleware,
  devTools: process.env.NODE_ENV === "development",
});

const persistor = persistStore(store);
export { store, persistor };
