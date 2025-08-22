import React from "react";
import { Outlet } from "react-router";
import MainNavbar from "../components/MainNavbar.jsx";
import Copyright from "../components/Copyright.jsx";

const MainLayout = () => {
  return (
    <div className="relative">
      <div className="font-ubuntu min-h-screen">
        <div>
          <MainNavbar />
        </div>
        <div className="bg-flashWhite min-h-screen pt-[96px]">
          <Outlet />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16">
          <Copyright />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
