import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  PERSIST,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { adminApiSlice } from "../services/api/adminApiSlice";
import { internApiSlice } from "../services/api/internApiSlice";
import { authApiSlice } from "../services/api/authApiSlice";
import { uploadApiSlice } from "../services/api/uploadApiSlice";
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
  [adminApiSlice.reducerPath]: adminApiSlice.reducer,
  [internApiSlice.reducerPath]: internApiSlice.reducer,
  [authApiSlice.reducerPath]: authApiSlice.reducer,
  [uploadApiSlice.reducerPath]: uploadApiSlice.reducer,
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
    }).concat(
      apiSlice.middleware,
      adminApiSlice.middleware,
      internApiSlice.middleware,
      authApiSlice.middleware,
      uploadApiSlice.middleware
    ),
});

export const persistor = persistStore(store);
