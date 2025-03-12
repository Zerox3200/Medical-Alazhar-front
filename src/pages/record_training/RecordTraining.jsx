import React from "react";
import RecordTrainingNavbar from "./components/RecordTrainingNavbar";
import { Outlet } from "react-router";

const RecordTraining = () => {
  return (
    <div className="grid grid-cols-6">
      <div className="col-span-1">
        <RecordTrainingNavbar />
      </div>
      <div className="col-span-5">
        {/* <p>Cases Summary</p> */}
        <Outlet />
      </div>
    </div>
  );
};

export default RecordTraining;
