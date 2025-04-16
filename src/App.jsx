import React, { Suspense } from "react";
import routes from "./routes/index.routes.jsx";
import { useRoutes } from "react-router";
import Loader from "./components/Loader";

const App = () => {
  const element = useRoutes(routes);
  return <Suspense fallback={<Loader />}>{element}</Suspense>;
};

export default App;
