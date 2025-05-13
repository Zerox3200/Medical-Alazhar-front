import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  PERSIST,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Api Slices
import { adminApiSlice } from "../services/api/adminApiSlice";
import { internApiSlice } from "../services/api/internApiSlice";
import { authApiSlice } from "../services/api/authApiSlice";
import { uploadApiSlice } from "../services/api/uploadApiSlice";

// Slices
import authReducer from "../services/slices/authSlice";
import adminSlice from "../services/slices/adminSlice";

const persistConfig = {
  key: "auth",
  storage,
  version: 1,
  whitelist: ["auth"],
  timeout: 1000,
};

const rootReducer = combineReducers({
  auth: authReducer,
  admin: adminSlice,
  [adminApiSlice.reducerPath]: adminApiSlice.reducer,
  [internApiSlice.reducerPath]: internApiSlice.reducer,
  [authApiSlice.reducerPath]: authApiSlice.reducer,
  [uploadApiSlice.reducerPath]: uploadApiSlice.reducer,
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
      adminApiSlice.middleware,
      internApiSlice.middleware,
      authApiSlice.middleware,
      uploadApiSlice.middleware
    ),
});

export const persistor = persistStore(store);
