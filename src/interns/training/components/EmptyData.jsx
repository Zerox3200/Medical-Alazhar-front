import React from "react";
import { TbMoodCry } from "react-icons/tb";
import { Link } from "react-router";

const EmptyData = ({ setOpen }) => {
  return (
    <div className="flex justify-center items-center flex-col relative translate-y-52">
      <p className="text-emeraldGreen text-5xl">
        <TbMoodCry />
      </p>
      <h3 className="text-4xl text-emeraldGreen font-semibold flex items-end">
        No data to show
      </h3>
      <div className="mt-6">
        <p
          onClick={() => setOpen(true)}
          className="bg-emeraldGreen text-lg rounded-sm text-crispWhite cursor-pointer py-1 px-4"
        >
          Add now
        </p>
      </div>
    </div>
  );
};

export default EmptyData;
