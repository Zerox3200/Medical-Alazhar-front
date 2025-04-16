import React from "react";
import RoundSelector from "../../components/RoundSelector";
import TrainingDatePicker from "../../components/TrainingDatePicker";
import SeenAt from "../../components/SeenAt";
import Select from "react-select";
import TrainingInput from "../../components/TrainingInput";
import { Tooltip } from "@mui/material";
import { FaCircleInfo } from "react-icons/fa6";
import trainingData from "../../data";

const MainInfo = () => {
  return (
    <>
      <h3 className="col-span-full text-xl font-semibold text-mediumGray">
        Main Information
      </h3>
      {/* Intern Round */}
      <div className="col-span-2">
        <RoundSelector listType={trainingData.cases.casesList} />
      </div>
      {/* Gender */}
      <div className="col-span-2">
        <label htmlFor="patient-age" className="text-sm font-medium block mb-2">
          Patient Gender
        </label>
        <Select
          options={[
            { value: "Male", label: "Male" },
            { value: "Female", label: "Female" },
          ]}
        />
      </div>

      {/* Patient serial */}
      <div className="col-span-2">
        <TrainingInput
          labelId="patient-serial"
          labelTitle="Patient serial # (In the logbook)"
          inputId="patient-serial"
          infoTooltip={
            <Tooltip title="Hospital ID" placement="top" color="#0d6efd">
              <FaCircleInfo className="text-xs" />
            </Tooltip>
          }
        />
      </div>

      {/* Age */}
      <div className="col-span-2">
        <TrainingInput
          labelId="patient-age"
          labelTitle="Patient Age"
          inputId="patient-age"
        />
      </div>

      {/* Seen At */}
      <div className="col-span-2">
        <SeenAt />
      </div>
      {/* Date */}
      <div className="col-span-2">
        <TrainingDatePicker />
      </div>
    </>
  );
};

export default MainInfo;
