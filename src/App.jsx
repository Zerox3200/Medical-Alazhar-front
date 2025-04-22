import React, { Suspense } from "react";
import createRoutes from "./routes/index.routes.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Loader from "./components/Loader";
import { useSelector } from "react-redux";

const App = () => {
  const { token, user } = useSelector((state) => state.auth);

  const router = createBrowserRouter(createRoutes(user?.role, token));

  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
