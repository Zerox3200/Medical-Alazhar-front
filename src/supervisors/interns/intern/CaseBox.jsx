import React from "react";
import _ from "lodash";

const CaseBox = ({ theCase, handleOpen, setSelectedCaseId }) => {
  return (
    <div className="col-span-1 bg-flashWhite text-mistyMorning rounded-md shadow-sm p-3 ">
      <div className="flex justify-between items-center">
        <h2 className="truncate" title={_.startCase(theCase?.caseType)}>
          Case:{" "}
          <span className="text-primary/70">
            {_.startCase(theCase?.caseType)}
          </span>
        </h2>
      </div>

      <div>
        <h2>
          Gander:{" "}
          <span className="text-primary/70">
            {_.capitalize(theCase?.patientGender)}
          </span>
        </h2>
        <h2
          className="truncate"
          title={_.chain(theCase?.expectedLevel).startCase().replace(" ", ". ")}
        >
          Expected level:{" "}
          <span className="text-primary/70">
            {_.chain(theCase?.expectedLevel).startCase().replace(" ", ". ")}
          </span>
        </h2>
        <h2>
          Venue:{" "}
          <span className="text-primary/70">{_.startCase(theCase?.venue)}</span>
        </h2>
      </div>
      <div className="border-t border-silverFrost mt-2 pt-2 flex items-center justify-between ">
        <h2>
          Case State:{" "}
          <span
            className={`${
              theCase?.state === "accepted"
                ? "text-emeraldGreen"
                : theCase?.state === "rejected"
                ? "text-error"
                : "text-secondary/70"
            } `}
          >
            {_.startCase(theCase?.state)}
          </span>
        </h2>
        <p
          className="text-mediumBlue/60 cursor-pointer hover:underline"
          onClick={() => {
            handleOpen();
            setSelectedCaseId(theCase?._id);
          }}
        >
          More...
        </p>
      </div>
    </div>
  );
};

export default CaseBox;
