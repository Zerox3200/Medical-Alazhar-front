import React from "react";

const Input = ({
  type = "text",
  placeholder,
  customStyle,
  error,
  ref,
  handleInput,
  maxLength,
  ...additionalParams
}) => {
  return (
    <div className="my-2 w-full">
      <input
        onInput={handleInput}
        type={type}
        placeholder={placeholder}
        className={`border-1 border-mediumGray/60 rounded-sm p-2 outline-0 block w-full bg-white ${customStyle} ${
          error ? "!border-error" : ""
        }`}
        ref={ref}
        autoComplete="off"
        min={1}
        maxLength={maxLength}
        {...additionalParams}
      />
      <p className="text-error">{error}</p>
    </div>
  );
};

export default Input;
