import React from "react";
import TrainingNavbar from "./components/TrainingNavbar";
import { Outlet } from "react-router";
import { TrainingProvider } from "./TrainingProvider";
import TrainingBreadcrumbs from "./components/TrainingBreadcrumbs";

const TrainingLayout = () => {
  return (
    <div className="flex gap-6">
      <div className="w-1/6">
        <TrainingNavbar />
      </div>
      <div className="w-5/6">
        <div className="py-6">
          <TrainingBreadcrumbs />
        </div>
        <div className="pr-6">
          <TrainingProvider>
            <Outlet />
          </TrainingProvider>
        </div>
      </div>
    </div>
  );
};

export default TrainingLayout;
