import React from "react";

const SearchBar = ({ placeholder, searchValue, handleChangeValue }) => {
  return (
    <input
      value={searchValue}
      onChange={handleChangeValue}
      type="search"
      className="p-3 border-1 border-mistyMorning/20 rounded-md w-1/3 indent-2 outline-none bg-flashWhite/60"
      placeholder={placeholder}
    />
  );
};

export default SearchBar;
