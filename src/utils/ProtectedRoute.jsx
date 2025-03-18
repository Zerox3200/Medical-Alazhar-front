import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { authState } = useContext(AuthContext);
  const isAuthenticated = authState.isLoggedIn;

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
