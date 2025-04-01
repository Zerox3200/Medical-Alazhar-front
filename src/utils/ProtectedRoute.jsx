import React from "react";
import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { token, user } = useSelector((state) => state.auth);

  const isAuthenticated = !!token && !!user;

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;
