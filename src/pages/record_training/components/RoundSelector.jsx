import React, { useEffect } from "react";
import Select from "react-select";
import _ from "lodash";
import { cases, rounds } from "../cases/casesData.js";
import { useCasesContext } from "../cases/CasesProvider.jsx";

const orderedRounds = _.orderBy(rounds, ["label"], ["asc"]);

const RoundAndUnitSelector = () => {
  const { selectedRound, setSelectedRound, filteredCases, setFilteredCases } =
    useCasesContext();

  useEffect(() => {
    if (selectedRound) {
      setFilteredCases(selectedRound ? cases[selectedRound?.value] : []);
    }
  }, [selectedRound, filteredCases, setFilteredCases]);

  return (
    <>
      <div className="col-span-full">
        <label className="text-sm font-medium block mb-2">
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
