import React from "react";

const Input = ({
  icon,
  type = "text",
  customStyle,
  placeholder,
  inputValue,
  handleInputChange,
  inputId,
  label,
}) => {
  return (
    <div className="flex flex-col gap-2 justify-center-start">
      <label htmlFor={inputId} className="text-md font-semibold">
        {label}
      </label>
      <input
        id={inputId}
        type={type}
        className={`w-full p-2 outline-none bg-flashWhite border-1 border-silverFrost/40 rounded-md ${customStyle}`}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
      />
      <span>{icon}</span>
    </div>
  );
};

export default Input;
