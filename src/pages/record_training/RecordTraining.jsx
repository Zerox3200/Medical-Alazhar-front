import React from "react";
import RecordTrainingNavbar from "./components/RecordTrainingNavbar";
import CasesTab from "./CasesTab";

const RecordTraining = () => {
  return (
    <div className="grid grid-cols-6">
      <div className="col-span-1">
        <RecordTrainingNavbar />
      </div>
      <div className="col-span-5">
        <CasesTab />
      </div>
    </div>
  );
};

export default RecordTraining;
