import { isArray } from "lodash";
import React from "react";
import Select from "react-select";

const CaseEditSelectBox = ({
  caseDataTitle,
  caseDataValue,
  editMode,
  selectValue,
  handleSelectChange,
  options,
  placeholder,
  isMulti,
  ...additionalParams
}) => {
  const getSelectedOptions = () => {
    if (selectValue) {
      return isMulti ? selectValue : [selectValue].filter(Boolean);
    }

    if (Array.isArray(caseDataValue)) {
      return caseDataValue
        .map((value) =>
          options.find(
            (option) => option.value === value || option.label === value
          )
        )
        .filter(Boolean);
    }

    const foundOption = options.find(
      (option) =>
        option.value === caseDataValue || option.label === caseDataValue
    );
    return foundOption ? [foundOption] : [];
  };

  const selectedOptions = getSelectedOptions();

  const displayText =
    selectedOptions
      .map((opt) => opt?.label)
      .filter(Boolean)
      .join(", ") || "N/A";

  return (
    <div className="grid grid-cols-5 gap-2 mb-4">
      <label className="text-mistyMorning col-span-2">{caseDataTitle}: </label>
      {editMode ? (
        <Select
          options={options}
          onChange={handleSelectChange}
          value={selectedOptions}
          placeholder={placeholder}
          className="col-span-2"
          isMulti={isArray(caseDataValue)}
          {...additionalParams}
        />
      ) : (
        <span className="text-secondary font-semibold col-span-2">
          {displayText}
        </span>
      )}
    </div>
  );
};

export default CaseEditSelectBox;
