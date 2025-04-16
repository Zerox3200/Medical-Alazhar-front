import React from "react";
import Navbar from "../components/Navbar.jsx";
import { Outlet } from "react-router";
import Footer from "../components/Footer.jsx";
import ProfileApproval from "../utils/ProfileApproval.jsx";

const MainLayout = () => {
  return (
    <div className="font-ubuntu flex flex-col justify-between h-screen">
      {/* <ProfileApproval /> */}
      <Navbar />
      <div className="pt-[96px]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
