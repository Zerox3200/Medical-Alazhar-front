import React, { useState } from "react";
import _ from "lodash";
import { BsThreeDotsVertical } from "react-icons/bs";
import OptionsList from "./OptionsList";

const stateBox = (objectData, state, bgColor) => {
  return (
    <>
      {objectData === state && (
        <span className={`${bgColor} text-white font-semibold p-1 rounded-sm`}>
          {_.startCase(objectData)}
        </span>
      )}
    </>
  );
};

const EditHeader = ({ editMode, setEditMode, objectData }) => {
  const [openOptions, setOpenOptions] = useState(false);
  return (
    <div className="col-span-full flex justify-between items-center border-b-2 border-flashWhite pb-4">
      <div className="flex justify-between items-center gap-10">
        <p>
          <span className="text-mistyMorning mr-2">State: </span>
          {/* Accepted */}
          {stateBox(objectData?.state, "accepted", "bg-emeraldGreen")}
          {/* Rejected */}
          {stateBox(objectData?.state, "rejected", "bg-error")}
          {/* Under Review */}
          {stateBox(objectData?.state, "under_review", "bg-yellow-400")}
        </p>
        {/* Accepted By */}
        <div>
          {objectData?.reviewedBy?.fullname && (
            <>
              <span className="text-mistyMorning mr-2">Reviewed by: </span>
              <span className="text-secondary font-semibold">
                Dr. {objectData?.reviewedBy?.fullname}
              </span>
            </>
          )}
        </div>
        {/* Date of acceptance */}
        <div>
          {objectData?.updatedAt && (
            <>
              <span className="text-mistyMorning">Reviewed at: </span>
              <span className="text-secondary font-semibold">
                {objectData?.updatedAt?.split("T")[0]}
              </span>
            </>
          )}
        </div>
      </div>
      {/* Edit */}
      {objectData?.state !== "accepted" && (
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
      )}
    </div>
  );
};

export default EditHeader;
