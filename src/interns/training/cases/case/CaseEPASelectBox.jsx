import React, { useEffect, useState } from "react";
import Select from "react-select";
import Chip from "@mui/material/Chip";

const CaseEPASelectBox = ({
  editMode,
  caseDataTitle,
  caseDataValue,
  placeholder,
  selectValue,
  handleSelectChange,
  options,
}) => {
  const displayText = caseDataValue?.map((val) => val.label);
  const [localValue, setLocalValue] = useState([]);

  useEffect(() => {
    if (caseDataValue) {
      setLocalValue(caseDataValue);
    }
    if (editMode && selectValue?.length > 0) {
      setLocalValue(selectValue);
    }
  }, [caseDataValue, selectValue]);

  return (
    <div className="grid grid-cols-5 items-center gap-2 mb-4">
      <h1 className="text-mistyMorning col-span-1">{caseDataTitle}: </h1>
      {editMode ? (
        <Select
          options={options}
          onChange={handleSelectChange}
          value={localValue}
          placeholder={placeholder}
          className="col-span-3"
          isMulti={true}
          closeMenuOnSelect={false}
          isClearable={true}
        />
      ) : (
        <div className="col-span-3 text-secondary font-semibold text-sm flex items-center gap-2 ">
          <Chip label={displayText?.[0]} />
          <Chip label={displayText?.[1]} />
        </div>
      )}
    </div>
  );
};

export default CaseEPASelectBox;
