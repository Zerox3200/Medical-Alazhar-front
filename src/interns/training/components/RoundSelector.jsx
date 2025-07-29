import React from "react";
import Select from "react-select";
import { useSelector } from "react-redux";
import _ from "lodash";
import { useIntern } from "../../../services/intern/api/hooks/authHooks";

const RoundAndUnitSelector = ({ field }) => {
  const { role, id } = useSelector((state) => state.auth.user);
  const { internData } = useIntern({
    userRole: role,
    userId: id,
    internId: id,
  });

  const rounds =
    internData?.data?.trainingProgress.map((progress) => progress.roundId) ||
    [];

  let roundsList = [];
  for (let round of rounds) {
    roundsList.push({
      label: _.startCase(round?.name),
      value: round?._id,
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
