import React from "react";

const CaseEditTextAreaBox = ({
  editMode,
  caseDataTitle,
  caseDataValue,
  textAreaValue,
  handleTextAreaChange,
}) => {
  return (
    <div className="grid grid-cols-5 gap-2 mb-4">
      <label className="text-mistyMorning col-span-2">{caseDataTitle}: </label>
      {editMode ? (
        <textarea
          rows={6}
          value={textAreaValue || caseDataValue}
          onChange={handleTextAreaChange}
          className="col-span-2 outline-none p-1 rounded-md bg-flashWhite border-1 border-silverFrost overflow-hidden"
        >
          {textAreaValue || caseDataValue}
        </textarea>
      ) : (
        <span
          className="text-secondary font-semibold col-span-2 truncate"
          title={caseDataValue}
        >
          {caseDataValue}
        </span>
      )}
    </div>
  );
};

export default CaseEditTextAreaBox;
