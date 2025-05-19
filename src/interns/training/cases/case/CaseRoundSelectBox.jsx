import _, { isArray } from "lodash";
import React from "react";
import Select from "react-select";

const CaseRoundSelectBox = ({
  editMode,
  options,
  caseDataTitle,
  caseDataValue,
  handleSelectChange,
  selectValue,
  placeholder,
  ...additionalParams
}) => {
  const caseDataValue2 = _.cloneDeep(caseDataValue);
  _.set(caseDataValue2, "label", _.startCase(caseDataValue?.name));
  delete caseDataValue2?.name;

  return (
    <div className="grid grid-cols-5 gap-2 mb-4">
      <label className="text-mistyMorning col-span-2">{caseDataTitle}: </label>
      {editMode ? (
        <Select
          options={options}
          onChange={handleSelectChange}
          value={selectValue ?? caseDataValue2}
          placeholder={placeholder}
          className="col-span-2"
          isMulti={isArray(caseDataValue)}
          {...additionalParams}
        />
      ) : (
        <span className="text-secondary font-semibold col-span-2">
          {caseDataValue2?.label}
        </span>
      )}
    </div>
  );
};

export default CaseRoundSelectBox;
