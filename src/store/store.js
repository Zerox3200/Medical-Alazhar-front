import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  PERSIST,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Api Slices
import courseApiSlice from "../services/course/api/";
import internApiSlice from "../services/intern/api/";
import adminApiSlice from "../services/admin/api/";
import supervisorApiSlice from "../services/supervisor/api/";
import { authApiSlice } from "../services/common/authApiSlice";
import { uploadApiSlice } from "../services/common/uploadApiSlice";

// Slices
import authReducer from "../services/slices/authSlice";
import adminSlice from "../services/slices/adminSlice";
import internFormSlice from "../services/slices/internSlice";

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
  internForm: internFormSlice,
  [courseApiSlice.reducerPath]: courseApiSlice.reducer,
  [adminApiSlice.reducerPath]: adminApiSlice.reducer,
  [internApiSlice.reducerPath]: internApiSlice.reducer,
  [supervisorApiSlice.reducerPath]: supervisorApiSlice.reducer,
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
      courseApiSlice.middleware,
      adminApiSlice.middleware,
      internApiSlice.middleware,
      authApiSlice.middleware,
      uploadApiSlice.middleware
    ),
});

export const persistor = persistStore(store);
