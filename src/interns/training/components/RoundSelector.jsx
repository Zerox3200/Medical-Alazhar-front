import React from "react";
import Select from "react-select";
import _ from "lodash";
import trainingData from "../data/index.js";
import { useTrainingContext } from "../TrainingProvider.jsx";

const orderedRounds = _.orderBy(trainingData.rounds, ["label"], ["asc"]);

const RoundAndUnitSelector = ({ listType, field }) => {
  const { setSelectedRound, setFilteredList } = useTrainingContext();

  const handleChange = (selectedOption) => {
    field.onChange(selectedOption);
    setSelectedRound(selectedOption);
    setFilteredList(listType[selectedOption?.value] || []);
  };
  return (
    <>
      <div className="col-span-1">
        <label className="text-md font-medium block mb-2">
          Choose your round
        </label>
        <Select
          {...field}
          value={field.value}
          onChange={handleChange}
          className="block w-full"
          options={orderedRounds}
          placeholder="Round"
        />
      </div>
    </>
  );
};

export default RoundAndUnitSelector;
