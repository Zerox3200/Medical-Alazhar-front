import React, { useEffect, useState } from "react";
import { useTrainingContext } from "../TrainingProvider";
import Select from "react-select";

const Skill = ({ field }) => {
  const [procedureType, setProcedureType] = useState("");
  const { filteredList, selectedRound } = useTrainingContext();

  useEffect(() => {
    if (selectedRound) {
      setProcedureType("");
    }
  }, [selectedRound]);

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
          options={filteredList}
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
