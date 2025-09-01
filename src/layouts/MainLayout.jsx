import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import MainNavbar from "../components/Navbar/MainNavbar.jsx";
import Copyright from "../components/Copyright.jsx";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { clearAuth } from "../services/slices/authSlice.js";

const MainLayout = () => {

  const [cookies] = useCookies(['Al-Azhar']);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    if (!cookies['Al-Azhar']) {
      dispatch(clearAuth());
    }
  }, [cookies['Al-Azhar']]);


  return (
    <div className="relative">
      <div className="font-ubuntu min-h-screen">
        <div>
          <MainNavbar />
        </div>
        <div className="bg-flashWhite min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
