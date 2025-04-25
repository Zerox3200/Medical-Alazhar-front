import React from "react";

const Input = ({
  type = "text",
  placeholder,
  customStyle,
  handleInput,
  maxLength,
  ...additionalParams
}) => {
  return (
    <div className="w-full">
      <input
        onInput={handleInput}
        type={type}
        placeholder={placeholder}
        className={`border-1 border-cloudVeil rounded-md p-2 outline-0 block w-full bg-white ${customStyle}`}
        maxLength={maxLength}
        {...additionalParams}
      />
    </div>
  );
};

export default Input;
