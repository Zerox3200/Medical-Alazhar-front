import React from "react";
import { Link } from "react-router";
import { FaPhone } from "react-icons/fa";
import { FaRegIdCard } from "react-icons/fa";
import _ from "lodash";

const InternBox = ({
  internData,
  casesCount = 0,
  proceduresCount = 0,
  selfLearningCount = 0,
  directLearningCount = 0,
}) => {
  return (
    <div className="bg-white shadow-md rounded-md border-silverFrost/20 col-span-1 p-3">
      <div className="rounded-md flex items-start gap-4 mb-4">
        <div className="rounded-full w-16 h-16 overflow-hidden object-cover border-1 border-silverFrost">
          <img
            src={"http://localhost:3000/" + internData?.profileImage}
            className="w-full"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-medium text-secondary">
            <Link to={`/interns/${internData?._id}`}>
              {internData?.englishName.split(" ").slice(0, 3).join(" ")}
            </Link>
          </h3>
          <h4 className="text-primary text-sm flex items-center">
            <span className="text-emeraldGreen mr-2">
              <FaPhone />
            </span>
            {internData?.phone.toString().slice(2)}
          </h4>
          <h5 className="text-primary text-sm flex items-center">
            <span className="text-mediumBlue mr-2">
              <FaRegIdCard />
            </span>
            {internData?.facultyIDNumber}
          </h5>
        </div>
      </div>
      {/* Progress Details */}
      <div className="grid grid-cols-2 gap-4 border-t-1 border-silverFrost pt-3 text-secondary">
        <p className="col-span-1 text-secondary">
          Cases:<span className="text-mistyMorning"> {casesCount}/25</span>
        </p>
        <p className="col-span-1">
          Procedures:{" "}
          <span className="text-mistyMorning"> {proceduresCount}/32</span>
        </p>
        <p className="col-span-1">
          Self learning:{" "}
          <span className="text-mistyMorning"> {selfLearningCount}/15 </span>
        </p>
        <p className="col-span-1">
          Direct learning:{" "}
          <span className="text-mistyMorning">{directLearningCount}/15 </span>
        </p>
      </div>
    </div>
  );
};

export default InternBox;
