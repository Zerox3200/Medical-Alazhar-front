import React from "react";
import { Outlet } from "react-router";

const Home = () => {
  return (
    <div className="text-emeraldGreen font-semibold text-4xl">
      <div className="m-auto h-screen text-center flex justify-center items-center">
        <h1 className="">
          Home
          <p className="block w-full text-red-500">Coming Soon</p>
        </h1>
      </div>
      <Outlet />
    </div>
  );
};

export default Home;
