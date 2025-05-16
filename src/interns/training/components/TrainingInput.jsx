import React from "react";

const TrainingInput = ({
  labelId,
  labelTitle,
  inputId,
  inputType,
  value,
  handleChange,
  infoTooltip,
  ...additionalParams
}) => {
  return (
    <>
      <label htmlFor={labelId} className="text-md font-medium flex gap-1 mb-2">
        {labelTitle}
        {infoTooltip}
      </label>
      <input
        id={inputId}
        type={inputType || "number"}
        className={`border-1 border-mediumGray/60 rounded-sm p-1.5 outline-0 block w-full`}
        autoComplete="off"
        min={0}
        value={value}
        onChange={handleChange}
        {...additionalParams}
      />
    </>
  );
};

export default TrainingInput;
