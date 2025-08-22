import React from "react";
import OverviewHeader from "../components/OverviewHeader";
import OverviewContent from "../components/OverviewContent";
import OverviewSidebar from "../components/OverviewSidebar";

const Overview = () => {
  return (
    <div className="p-6 pb-30 flex items-start justify-between gap-10">
      <div className="w-4/6 bg-white p-6 shadow-sm rounded-sm">
        {/* Header */}
        <OverviewHeader />

        {/* Separator */}
        <div className="h-0.5 my-6 bg-mistyMorning/20"></div>

        {/* Content */}
        <OverviewContent />
      </div>
      {/* Overview sidebar */}
      <div className="w-2/6 bg-white p-6 shadow-sm rounded-sm">
        <OverviewSidebar />
      </div>
    </div>
  );
};

export default Overview;
