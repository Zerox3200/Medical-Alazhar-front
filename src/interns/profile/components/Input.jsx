import React from "react";

const Input = ({
  id,
  value,
  handleChange,
  icon,
  handleIconClick,
  type = "text",
  ...options
}) => {
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={handleChange}
        className="bg-flashWhite rounded-md py-2 px-4 outline-none w-full"
        {...options}
      />
      <span
        className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-mistyMorning"
        onClick={handleIconClick}
      >
        {icon}
      </span>
    </div>
  );
};

export default Input;
