import React from "react";
import _ from "lodash";

const ProgressHeader = ({ internData }) => {
  return (
    <div className="flex justify-between items-center mb-6 shadow p-6 rounded-md bg-white">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          <span className="text-lightBlue">
            {internData?.intern?.englishName}'s
          </span>{" "}
          Training Progress
        </h1>
        <p className="text-gray-600">
          {_.startCase(internData?.intern?.hospital)} •{" "}
          {_.chain(internData?.intern?.internLevel).toUpper().replace("_", "-")}
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-center">
          <p className="text-sm text-gray-500">Internship Start</p>
          <p className="font-medium">
            {new Date(
              internData?.intern?.internshipStartDate
            ).toLocaleDateString("en-US", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="h-10 border-l border-gray-300"></div>
        <div className="text-center">
          <p className="text-sm text-gray-500">Current Round</p>
          <p className="font-medium">
            {_.startCase(internData?.intern?.currentRound?.roundId?.name)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgressHeader;
