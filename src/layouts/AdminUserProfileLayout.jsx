import React from "react";
import { Outlet } from "react-router";
const ProfileLayout = () => {
  return (
    <div className="font-ubuntu">
      <div className="pt-[96px]">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileLayout;
