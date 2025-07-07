/**
 * This component is intended to serve seraching functionality
 * and filtering the content
 */
import React from "react";

const SearchBar = ({ placeholder, searchValue, handleChangeValue }) => {
  return (
    <input
      value={searchValue}
      onChange={handleChangeValue}
      type="search"
      className="p-3 border-1 border-mistyMorning/40 rounded-md w-full indent-2 outline-none bg-white focus:border-lightBlue"
      placeholder={placeholder}
    />
  );
};

export default SearchBar;
