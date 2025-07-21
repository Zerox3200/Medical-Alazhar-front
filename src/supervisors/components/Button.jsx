import React from "react";

const Button = ({ label, customClass, handleClick, type, disabled, icon }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`h-full border-1 border-mediumBlue w-full flex justify-center items-center gap-2 bg-mediumBlue text-white py-2 px-3 rounded-md shadow-sm hover:bg-lightBlue hover:border-lightBlue duration-150 transition-all ${customClass} ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
      onClick={handleClick}
    >
      {icon && <span>{icon}</span>}
      <span>{label}</span>
    </button>
  );
};

export default Button;
