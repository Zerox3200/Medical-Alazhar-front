import React from "react";
import { Link } from "react-router";

const AssessmentBox = ({ assessment }) => {
  const assessmentDate = new Date(assessment?.assessmentDate).toDateString();
  return (
    <div className="col-span-1 bg-white p-6 rounded-md shadow-sm text-secondary">
      <h1 className="text-xl flex justify-between items-center mb-2 font-bold">
        <Link>{assessment?.internId?.englishName}</Link>
      </h1>
      <div className="flex justify-between items-center mb-2">
        <h2>ID: {assessment?.internId?.facultyIDNumber} </h2>
        <h3>Wave: 5</h3>
      </div>
      <div className="flex justify-between items-center mt-2">
        <p>{assessmentDate} </p>
        <p
          className={`font-semibold ${
            assessment?.isPassed ? "text-emeraldGreen" : "text-error"
          }`}
        >
          {assessment?.isPassed ? "Passed" : "Failed"}
        </p>
      </div>
    </div>
  );
};

export default AssessmentBox;
