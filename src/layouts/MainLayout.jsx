import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar.jsx";
import { Outlet } from "react-router";
import Footer from "../components/Footer.jsx";
import ProfileApproval from "../utils/ProfileApproval.jsx";

const MainLayout = () => {
  const { authState } = useContext(AuthContext);
  const { approved } = authState.user;

  return (
    <div className="font-ubuntu">
      {!approved && <ProfileApproval />}
      <Navbar />
      <div className="pt-[96px]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
