import _, { isArray } from "lodash";
import React from "react";
import Select from "react-select";

const ProcedureRoundSelectBox = ({
  editMode,
  options,
  procedureDataTitle,
  procedureDataValue,
  handleSelectChange,
  selectValue,
  placeholder,
  ...additionalParams
}) => {
  const procedureDataValue2 = _.cloneDeep(procedureDataValue);
  _.set(procedureDataValue2, "label", _.startCase(procedureDataValue?.name));
  delete procedureDataValue2?.name;

  return (
    <div className="grid grid-cols-5 gap-2 mb-4">
      <label className="text-mistyMorning col-span-2">
        {procedureDataTitle}:{" "}
      </label>
      {editMode ? (
        <Select
          options={options}
          onChange={handleSelectChange}
          value={selectValue ?? procedureDataValue2}
          placeholder={placeholder}
          className="col-span-2"
          isMulti={isArray(procedureDataValue)}
          {...additionalParams}
        />
      ) : (
        <span className="text-secondary font-semibold col-span-2">
          {procedureDataValue2?.label}
        </span>
      )}
    </div>
  );
};

export default ProcedureRoundSelectBox;
