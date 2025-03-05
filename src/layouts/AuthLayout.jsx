import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const AuthLayout = () => {
  return (
    <>
      <Navbar />
      <div className="bg-softGray min-h-screen flex justify-center items-center py-40">
        <Outlet />
      </div>
    </>
  );
};

export default AuthLayout;
