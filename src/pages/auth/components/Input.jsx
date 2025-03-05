import React from "react";

const Input = ({ type = "text", placeholder, customStyle }) => {
  return (
    <div className="my-2 w-full">
      <input
        type={type}
        placeholder={placeholder}
        className={`border-1 border-mediumGray/60 rounded-sm p-2 outline-0 block w-full ${customStyle}`}
        autoComplete="off"
        min={0}
      />
    </div>
  );
};

export default Input;
