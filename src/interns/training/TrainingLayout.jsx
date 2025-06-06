import React from "react";
import TrainingNavbar from "./components/TrainingNavbar";
import { Outlet } from "react-router";
import { TrainingProvider } from "./TrainingProvider";
import TrainingBreadcrumbs from "./components/TrainingBreadcrumbs";

const TrainingLayout = () => {
  return (
    <div className="grid grid-cols-6">
      <div className="col-span-1">
        <TrainingNavbar />
      </div>
      <div className="col-span-5">
        <div className="p-6 ">
          <TrainingBreadcrumbs />
        </div>
        <TrainingProvider>
          <Outlet />
        </TrainingProvider>
      </div>
    </div>
  );
};

export default TrainingLayout;
