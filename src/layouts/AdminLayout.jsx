import React from "react";
import { Outlet } from "react-router";
import DashobardSidebar from "../pages/admin/components/DashobardSidebar.jsx";
import DashboardHeadbar from "../pages/admin/components/DashboardHeadbar.jsx";

const AdminLayout = () => {
  return (
    <div className="font-ubuntu bg-flashWhite overflow-hidden">
      <div className="grid grid-cols-6">
        <div className="col-span-1">
          <DashobardSidebar />
        </div>
        <div className="col-span-5">
          <DashboardHeadbar />
          <div className="p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
