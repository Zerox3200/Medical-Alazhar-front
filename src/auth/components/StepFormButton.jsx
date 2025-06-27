import React from "react";

const StepFormButton = ({
  icon,
  label,
  customClass,
  handleClick,
  type,
  disabled,
}) => {
  return (
    <button
      type={type}
      className={`flex items-center justify-between gap-2 bg-mediumBlue text-white border-1 border-mediumBlue py-2 px-3 rounded-md shadow-sm  hover:bg-lightBlue hover:border-lightBlue duration-150 transition-all ${customClass} ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
      onClick={handleClick}
      disabled={disabled}
    >
      {icon}
      {label}
    </button>
  );
};

export default StepFormButton;
