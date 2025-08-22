import React from "react";
import Navbar from "../interns/components/Navbar.jsx";
import { Outlet } from "react-router";
import Copyright from "../components/Copyright.jsx";

const InternLayout = () => {
  return (
    <div className="relative">
      <div className="font-ubuntu min-h-screen">
        <div>
          <Navbar />
        </div>
        <div className="bg-flashWhite pt-[96px] min-h-screen pb-22">
          <Outlet />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16">
          <Copyright />
        </div>
      </div>
    </div>
  );
};

export default InternLayout;
