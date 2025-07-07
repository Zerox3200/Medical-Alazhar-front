import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const SupervisorLayout = () => {
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
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default SupervisorLayout;
