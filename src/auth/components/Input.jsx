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
    <div className="w-full">
      <input
        onInput={handleInput}
        type={type}
        placeholder={placeholder}
        className={`border-1 border-silverFrost/40 text-secondary/80 focus:border-lightBlue hover:border-lightBlue rounded-md p-2 outline-0 block w-full bg-white ${customStyle} ${
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
