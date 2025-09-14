import React from "react";
import { Outlet } from "react-router";
import MainNavbar from "../components/Navbar/MainNavbar.jsx";

const UserLayout = () => {
    return (
        <div className="relative">
            <MainNavbar />
            <Outlet />
        </div>
    );
};

export default UserLayout;
