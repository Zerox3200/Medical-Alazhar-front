import React from "react";
import Navbar from "../components/Navbar.jsx";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="pt-[96px]">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
