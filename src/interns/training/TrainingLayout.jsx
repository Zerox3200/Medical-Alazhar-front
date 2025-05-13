import React from "react";
import TrainingNavbar from "./components/TrainingNavbar";
import { Outlet } from "react-router";
import { TrainingProvider } from "./TrainingProvider";

const TrainingLayout = () => {
  return (
    <div className="grid grid-cols-6">
      <div className="col-span-1">
        <TrainingNavbar />
      </div>
      <div className="col-span-5">
        <TrainingProvider>
          <Outlet />
        </TrainingProvider>
      </div>
    </div>
  );
};

export default TrainingLayout;
