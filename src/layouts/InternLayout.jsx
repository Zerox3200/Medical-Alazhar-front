import React from "react";
import Navbar from "../interns/components/Navbar.jsx";
import { Outlet, useLocation } from "react-router";
import Footer from "../components/Footer.jsx";
import ProfileApproval from "../interns/components/ProfileApproval.jsx";
import { useIntern } from "../services/intern/api/hooks/authHooks.js";
import { useSelector } from "react-redux";

const InternLayout = () => {
  const { role, id } = useSelector((state) => state.auth.user);
  const { pathname } = useLocation();

  const { internData } = useIntern({
    userRole: role,
    userId: id,
    internId: id,
  });

  return (
    <div>
      {!internData?.intern?.approved && pathname !== "/profile" ? (
        <div>
          <ProfileApproval />
        </div>
      ) : (
        <div className="font-ubuntu flex flex-col justify-between">
          <div>
            <Navbar />
          </div>
          <div className="bg-flashWhite pt-[96px]">
            <Outlet />
          </div>
          <div>
            <Footer />
          </div>
        </div>
      )}
    </div>
  );
};

export default InternLayout;
