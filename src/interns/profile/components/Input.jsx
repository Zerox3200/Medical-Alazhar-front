import React from "react";

const Input = ({ id, value, handleChange }) => {
  return (
    <input
      id={id}
      type="text"
      value={value}
      onChange={handleChange}
      className="bg-flashWhite rounded-md py-2 px-4 outline-none w-full"
    />
  );
};

export default Input;
