import React from "react";
import { Navigate, Outlet } from "react-router";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";

const AuthLayout = () => {
  const { token, user } = useSelector((state) => state.auth);
  const isAuthenticated = !!token && !!user;

  return !isAuthenticated ? (
    <>
      <div className="bg-flashWhite min-h-screen flex justify-center items-center">
        <Outlet />
      </div>
    </>
  ) : (
    <Navigate to="/" replace />
  );
};

export default AuthLayout;
