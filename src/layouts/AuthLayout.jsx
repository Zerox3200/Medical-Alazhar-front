import React from "react";
import { Navigate, Outlet } from "react-router";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";

const AuthLayout = () => {
  const { token, user } = useSelector((state) => state.auth);
  const isAuthenticated = !!token && !!user;

  return !isAuthenticated ? (
    <>
      <Navbar />
      <div className="bg-softGray min-h-screen flex justify-center items-center pt-20">
        {/* ProfileSidebar */}

        <Outlet />
      </div>
    </>
  ) : (
    <Navigate to="/" replace />
  );
};

export default AuthLayout;
