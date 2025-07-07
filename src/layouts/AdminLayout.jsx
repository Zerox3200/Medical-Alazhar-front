import React from "react";
import { Outlet } from "react-router";
import DashobardSidebar from "../admin/components/DashobardSidebar.jsx";
import DashboardHeadbar from "../admin/components/DashboardHeadbar.jsx";
import Footer from "../components/Footer.jsx";

const AdminLayout = () => {
  return (
    <div className="font-ubuntu bg-flashWhite overflow-hidden">
      <div className="grid grid-cols-6">
        <div className="col-span-1">
          <DashobardSidebar />
        </div>
        <div className="col-span-5">
          <DashboardHeadbar />
          <div className="pb-10">
            <Outlet />
          </div>
        </div>
        <div className="col-span-full">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
