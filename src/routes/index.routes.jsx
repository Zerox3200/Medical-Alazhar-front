import React, { lazy } from "react";
import authRoutes from "./auth.routes.jsx";
import internRoutes from "./intern.routes.jsx";
// import appRoutes from './app.routes';
// import profileRoutes from './profile.routes';

const NotFound = lazy(() => import("../pages/NotFound.jsx"));
const Home = lazy(() => import("../pages/home/Index.jsx"));

const routes = [
  authRoutes,
  ...internRoutes,
  //   adminRoutes,
  //   appRoutes,
  //   profileRoutes,

  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
