import React from "react";
import { TbMoodCry } from "react-icons/tb";

const EmptyData = () => {
  return (
    <div className="w-full flex justify-center items-center flex-col">
      <p className="text-emeraldGreen text-5xl">
        <TbMoodCry />
      </p>
      <h3 className="text-4xl text-emeraldGreen font-semibold flex items-end">
        No data to show
      </h3>
    </div>
  );
};

export default EmptyData;
