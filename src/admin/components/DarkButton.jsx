import React from "react";

const DarkButton = ({ icon, label, customClass, handleClick, type }) => {
  return (
    <button
      type={type}
      className={`flex items-center justify-between gap-2 bg-hotPink text-white border-1 border-pink py-2 px-3 rounded-md shadow-sm cursor-pointer hover:bg-pink duration-150 transition-all ${customClass}`}
      onClick={handleClick}
    >
      {icon}
      {label}
    </button>
  );
};

export default DarkButton;
