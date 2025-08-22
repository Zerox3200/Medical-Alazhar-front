import React from "react";

const PrimaryButton = ({
  label,
  customClass,
  handleClick,
  type,
  disabled,
  icon,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`h-full border-1 bg-mediumBlue border-mediumBlue w-full flex justify-center items-center gap-2 text-flashWhite py-2 px-3 rounded-md shadow-sm hover:opacity-80 duration-150 transition-all ${customClass} ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
      onClick={handleClick}
    >
      {icon && <span>{icon}</span>}
      <span>{label}</span>
    </button>
  );
};

export default PrimaryButton;
