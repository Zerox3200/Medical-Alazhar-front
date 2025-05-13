import React, { useEffect } from "react";
import Select from "react-select";
import _ from "lodash";
import trainingData from "../data/index.js";
import { useTrainingContext } from "../TrainingProvider.jsx";

const orderedRounds = _.orderBy(trainingData.rounds, ["label"], ["asc"]);

const RoundAndUnitSelector = ({ listType }) => {
  const { selectedRound, setSelectedRound, filteredList, setFilteredList } =
    useTrainingContext();

  useEffect(() => {
    if (selectedRound) {
      setFilteredList(selectedRound ? listType[selectedRound?.value] : []);
    }
  }, [selectedRound, filteredList, setFilteredList, listType]);

  return (
    <>
      <div className="col-span-1">
        <label className="text-md font-medium block mb-2">
          Choose your round
        </label>
        <Select
          className="block w-full"
          options={orderedRounds}
          value={selectedRound}
          placeholder="Round"
          onChange={(selectedOption) => {
            setSelectedRound(selectedOption);
          }}
        />
      </div>
    </>
  );
};

export default RoundAndUnitSelector;
