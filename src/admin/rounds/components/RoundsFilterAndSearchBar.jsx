import React from "react";
import Input from "../../components/Input";
import Select from "react-select";
import selectOptions from "../../constants/selectOptions";

const RoundsFilterAndSearchBar = ({
  durationValue,
  setDurationValue,
  hospitalValue,
  setHospitalValue,
  levelValue,
  setLevelValue,
  setInputValue,
}) => {
  const handleDurationValue = (value) => setDurationValue(value);
  const handleHospitalValue = (value) => setHospitalValue(value);
  const handleLevelValue = (value) => setLevelValue(value);

  return (
    <div className="text-lg text-primary bg-white border-t-[1px] border-b-[1px] border-cloudVeil p-6 mb-6 grid grid-cols-12 gap-6">
      <div className="col-span-5">
        <Input
          placeholder="Search by round name..."
          handleInput={(e) => setInputValue(e.target.value)}
        />
      </div>

      <div className="col-span-7 flex items-center gap-6">
        <div className="flex-1">
          <Select
            options={selectOptions.durationOptions}
            placeholder="duartion"
            value={durationValue}
            onChange={handleDurationValue}
            isClearable
          />
        </div>
        <div className="flex-1">
          <Select
            options={selectOptions.hospitalOptions}
            placeholder="Hospital"
            value={hospitalValue}
            onChange={handleHospitalValue}
            isClearable
          />
        </div>
        <div className="flex-1">
          <Select
            options={selectOptions.levelOptions}
            placeholder="Year Level"
            value={levelValue}
            onChange={handleLevelValue}
            isClearable
          />
        </div>
      </div>
    </div>
  );
};

export default RoundsFilterAndSearchBar;
