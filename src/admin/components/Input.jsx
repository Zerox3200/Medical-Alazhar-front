import React from "react";

const Input = ({
  type = "text",
  placeholder,
  customStyle,
  handleInput,
  maxLength,
  inputValue,
  handleChange,
  error,
  ...additionalParams
}) => {
  return (
    <div className="w-full">
      <input
        value={inputValue}
        onInput={handleInput}
        onChange={handleChange}
        type={type}
        placeholder={placeholder}
        className={`border-1 border-silverFrost rounded-sm p-2 outline-0  w-full bg-flashWhite ${customStyle}`}
        maxLength={maxLength}
        {...additionalParams}
      />
      <p className="text-error">{error}</p>
    </div>
  );
};

export default Input;
