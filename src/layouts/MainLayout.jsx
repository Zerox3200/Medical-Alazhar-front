import React from "react";
import { Outlet } from "react-router";
import MainNavbar from "../components/Navbar/MainNavbar.jsx";
import Copyright from "../components/Copyright.jsx";

const MainLayout = () => {
  return (
    <div className="relative">
      <div className="font-ubuntu min-h-screen">
        <div>
          <MainNavbar />
        </div>
        <div className="bg-flashWhite min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
