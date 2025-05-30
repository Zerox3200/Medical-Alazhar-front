import React, { useState } from "react";
import Select from "react-select";
import trainingData from "../data";

const Skill = ({ field }) => {
  const [procedureType, setProcedureType] = useState("");

  const handleChange = (procedureType) => {
    field.onChange(procedureType);
    setProcedureType(procedureType);
  };

  return (
    <>
      <div className="col-span-1">
        <label className="text-md font-medium block mb-2">
          Skill (procedure)
        </label>
        <Select
          options={trainingData.procedures.proceduresList}
          {...field}
          value={field.value}
          onChange={handleChange}
          isOptionSelected={{ procedureType }}
          placeholder="Select Skill"
        />
      </div>
    </>
  );
};

export default Skill;
