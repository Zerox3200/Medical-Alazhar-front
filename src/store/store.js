import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  PERSIST,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { apiSlice } from "../services/api/apiSlice";
import authReducer from "../services/slices/authSlice";

const persistConfig = {
  key: "auth",
  storage,
  version: 1,
  whitelist: ["auth"],
  timeout: 1000,
};

const rootReducer = combineReducers({
  auth: authReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST, REHYDRATE],
      },
    }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);
