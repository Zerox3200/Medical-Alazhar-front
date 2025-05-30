import React, { useState } from "react";
import _ from "lodash";
import { BsThreeDotsVertical } from "react-icons/bs";
import OptionsList from "./OptionsList";

const stateBox = (procedureData, state, bgColor) => {
  return (
    <>
      {procedureData?.data?.procedureState === state && (
        <span className={`${bgColor} text-white font-semibold p-1 rounded-sm`}>
          {_.startCase(procedureData?.data?.procedureState)}
        </span>
      )}
    </>
  );
};

const ProcedureHeader = ({ editMode, setEditMode, procedureData }) => {
  const [openOptions, setOpenOptions] = useState(false);

  return (
    <div className="col-span-full flex justify-between items-center border-b-2 border-flashWhite pb-4">
      <div className="flex justify-between items-center gap-10">
        {/* Procedure State */}
        <p>
          <span className="text-mistyMorning">State: </span>
          {/* Accepted */}
          {stateBox(procedureData, "accepted", "bg-emeraldGreen")}
          {/* Rejected */}
          {stateBox(procedureData, "rejected", "bg-error")}
          {/* Under Review */}
          {stateBox(procedureData, "under_review", "bg-yellow-400")}
        </p>
        {/* Accepted By */}
        <div>
          <span className="text-mistyMorning">Supervisor: </span>
          <span className="text-secondary font-semibold">Mohamed Farouk</span>
        </div>
        {/* Date of acceptance */}
        <div>
          <span className="text-mistyMorning">Date of acceptance: </span>
          <span className="text-secondary font-semibold"> 15/07/2025</span>
        </div>
      </div>
      {/* Edit */}
      <div className="relative text-2xl">
        {openOptions && (
          <OptionsList
            setEditMode={setEditMode}
            editMode={editMode}
            setOpenOptions={setOpenOptions}
          />
        )}
        <BsThreeDotsVertical
          className="cursor-pointer hover:text-mistyMorning"
          onClick={() => setOpenOptions(!openOptions)}
        />
      </div>
    </div>
  );
};

export default ProcedureHeader;
