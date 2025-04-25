import React from "react";

const LightButton = ({ icon, label, handleClick }) => {
  return (
    <button
      className="flex items-center gap-2 bg-white shadow-sm border-[1px] border-cloudVeil rounded-md p-2 cursor-pointer hover:shadow-2xl duration-150 transition-all"
      onClick={handleClick}
    >
      {icon}
      {label}
    </button>
  );
};

export default LightButton;
