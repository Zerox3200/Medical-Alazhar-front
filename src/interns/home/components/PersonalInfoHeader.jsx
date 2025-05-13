import _ from "lodash";
import React from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const PersonalInfoHeader = ({ data }) => {
  console.log("data", data);
  const date = new Date();
  const today = date.toDateString();

  return (
    <div className="mb-8 shadow-sm py-8 px-4 rounded-sm border-1 border-mediumGray/10 flex justify-between items-start">
      <div className="">
        <div className="mb-4">
          <p className="text-mediumGray text-lg font-semibold">{today}</p>
        </div>
        <h1 className="text-teal font-bold text-3xl">
          Dr. {data.user?.fullname.split(" ").slice(0, 2).join(" ")}.
        </h1>
        <p className="text-mediumGray text-xl my-2">
          {_.startCase(data.user?.facultyOfGraduation)} -{" "}
          {_.startCase(data.user?.yearOfGraduation)}
        </p>
        <p className="text-mediumGray/80 text-xl">
          {_.startCase(data.user?.hospital)} Hospital
        </p>
      </div>

      <div className="w-40">
        <CircularProgressbarWithChildren
          strokeWidth={8}
          value={52}
          styles={buildStyles({
            pathTransitionDuration: 0.5,
            pathColor: `#2d9c9c`,
            trailColor: "#f5f5f5",
          })}
        >
          <div className="flex flex-col text-sm items-center justify-center p-2 text-teal">
            <span>Year One Progress</span>
            <strong>52%</strong>
          </div>
        </CircularProgressbarWithChildren>
      </div>
    </div>
  );
};

export default PersonalInfoHeader;
