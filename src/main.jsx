import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store.js";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App.jsx";
import Loader from "./components/Loader.jsx";
import "./index.css";
import { CookiesProvider } from "react-cookie";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

let query = new QueryClient();


createRoot(document.getElementById("root")).render(
  <CookiesProvider defaultSetOptions={{ path: '/', secure: true }}>
    <QueryClientProvider client={query}>
      <Provider store={store}>
        <PersistGate loading={<Loader />} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
      <Toaster />
      <ReactQueryDevtools position="bottom-right" />
    </QueryClientProvider>
  </CookiesProvider>
);
