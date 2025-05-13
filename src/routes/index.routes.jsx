import React, { lazy } from "react";
import AuthRoutes from "./auth.routes.jsx";
import AdminRoutes from "./admin.routes.jsx";
import InternRoutes from "./intern.routes.jsx";
import NotAuthorized from "../pages/NotAuthorized.jsx";
import ProtectedRoute from "../utils/ProtectedRoute.jsx";
import { Navigate } from "react-router";

const ErrorBoundary = lazy(() => import("../pages/ErrorBoundary.jsx"));
const NotFound = lazy(() => import("../pages/NotFound.jsx"));

const createRoutes = (userRole, token) => {
  return [
    AuthRoutes,
    {
      element: <ProtectedRoute allowedRoles={["admin", "intern"]} />,
      children: [
        ...(token && userRole === "admin" ? AdminRoutes : []),
        ...(token && userRole === "intern" ? InternRoutes : []),
      ],
    },
    {
      path: "*",
      element: token ? <NotFound /> : <Navigate to="/auth/login" replace />,
    },
  ];
};

export default createRoutes;
