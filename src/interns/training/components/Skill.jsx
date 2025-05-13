import React, { useEffect, useState } from "react";
import { useTrainingContext } from "../TrainingProvider";
import Select from "react-select";

const Skill = () => {
  const [procedureType, setProcedureType] = useState("");
  const { filteredList, selectedRound } = useTrainingContext();

  useEffect(() => {
    if (selectedRound) {
      setProcedureType("");
    }
  }, [selectedRound]);

  return (
    <>
      <div className="col-span-1">
        <label className="text-md font-medium block mb-2">
          Skill (procedure)
        </label>
        <Select
          options={filteredList}
          value={procedureType}
          isOptionSelected={{ procedureType }}
          onChange={setProcedureType}
          placeholder="Select Skill"
        />
      </div>
    </>
  );
};

export default Skill;
