import React from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";

const StatsBox = ({
  icon,
  iconColor,
  iconBg,
  heading,
  subHeading,
  lineColor,
  boxStatus,
}) => {
  return (
    <div className="bg-white shadow-md rounded-sm p-4 flex flex-col gap-3">
      {/* <div className="self-end text-lg cursor-pointer text-secondary">
        <PiDotsThreeOutlineVerticalFill />
      </div> */}

      <div className="grid grid-cols-5 flex-1">
        <div className={`col-span-1 w-1 h-full ${lineColor}`}></div>
        <div className="col-span-3">
          <h2 className=" text-xl text-silverFrost">{heading}</h2>
          <h4 className="text-4xl text-primary font-medium">{subHeading}</h4>
        </div>

        <p
          className={`col-span-1 w-12 m-auto h-12 text-2xl rounded-md flex justify-center items-center ${iconColor} ${iconBg}`}
        >
          {icon}
        </p>
      </div>

      <div className="flex-1 flex items-center gap-2">
        {boxStatus}{" "}
        <span className="text-mistyMorning text-md">since last month</span>
      </div>
    </div>
  );
};

export default StatsBox;
