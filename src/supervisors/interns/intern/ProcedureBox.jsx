import React from "react";
import _ from "lodash";

const ProcedureBox = ({ procedure, handleOpen, setSelectedProcedureId }) => {
  return (
    <div className="col-span-1 bg-flashWhite text-mistyMorning rounded-md shadow-sm p-3 ">
      <div className="flex justify-between items-center">
        <h2 className="truncate" title={_.startCase(procedure?.skill)}>
          Skill:{" "}
          <span className="text-primary/70">
            {_.startCase(procedure?.skill)}
          </span>
        </h2>
      </div>

      <div>
        <h2
          className="truncate"
          title={_.chain(procedure?.performanceLevel)
            .startCase()
            .replace(" ", ". ")}
        >
          Expected level:{" "}
          <span className="text-primary/70">
            {_.chain(procedure?.performanceLevel)
              .startCase()
              .replace(" ", ". ")}
          </span>
        </h2>
        <h2>
          Venue:{" "}
          <span className="text-primary/70">
            {_.startCase(procedure?.venue)}
          </span>
        </h2>
      </div>
      <div className="border-t border-silverFrost mt-2 pt-2 flex items-center justify-between ">
        <h2>
          Procedure State:{" "}
          <span
            className={`${
              procedure?.state === "accepted"
                ? "text-emeraldGreen"
                : procedure?.state === "rejected"
                ? "text-error"
                : "text-secondary/70"
            } `}
          >
            {_.startCase(procedure?.state)}
          </span>
        </h2>
        <p
          className="text-mediumBlue/60 cursor-pointer hover:underline"
          onClick={() => {
            handleOpen();
            setSelectedProcedureId(procedure?._id);
          }}
        >
          More...
        </p>
      </div>
    </div>
  );
};

export default ProcedureBox;
