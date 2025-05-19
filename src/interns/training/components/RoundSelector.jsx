import React from "react";
import Select from "react-select";
import { useSelector } from "react-redux";
import _ from "lodash";
import { useGetInternQuery } from "../../../services/api/internApiSlice.js";

const RoundAndUnitSelector = ({ field }) => {
  const { id } = useSelector((state) => state.auth.user);
  const { data: internData } = useGetInternQuery({ internId: id });

  const rounds = internData?.intern?.trainingProgress.map(
    (progress) => progress.round
  );
  console.log("rounds", rounds);

  let roundsList = [];
  for (let round of rounds) {
    roundsList.push({
      label: _.startCase(round.name),
      value: round._id,
    });
  }

  const handleChange = (selectedOption) => {
    field.onChange(selectedOption);
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
          options={roundsList}
          placeholder="Round"
        />
      </div>
    </>
  );
};

export default RoundAndUnitSelector;
