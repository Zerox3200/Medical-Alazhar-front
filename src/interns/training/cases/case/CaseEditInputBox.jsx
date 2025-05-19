import React, { useEffect, useState } from "react";

const CaseEditInputBox = ({
  caseDataTitle,
  caseDataValue,
  editMode,
  inputValue,
  handleInputChange,
}) => {
  const [localValue, setLocalValue] = useState(caseDataValue || "");

  // Sync with external inputValue when provided
  useEffect(() => {
    if (inputValue !== undefined && inputValue !== null) {
      setLocalValue(inputValue);
    }
  }, [inputValue]);

  // Sync with caseDataValue when not in edit mode
  useEffect(() => {
    if (!editMode) {
      setLocalValue(caseDataValue || "");
    }
  }, [editMode, caseDataValue]);

  const handleLocalChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    if (handleInputChange) {
      handleInputChange(e); // Propagate change to parent
    }
  };

  return (
    <div className="grid grid-cols-5 gap-2 mb-4">
      <label className="text-mistyMorning col-span-2">{caseDataTitle}: </label>
      {editMode ? (
        <input
          type="text"
          value={localValue}
          onChange={handleLocalChange}
          className="col-span-2 outline-none p-1 rounded-md bg-flashWhite border-1 border-silverFrost"
        />
      ) : (
        <span className="text-secondary font-semibold col-span-2">
          {caseDataValue ?? "N/A"}
        </span>
      )}
    </div>
  );
};

export default CaseEditInputBox;
