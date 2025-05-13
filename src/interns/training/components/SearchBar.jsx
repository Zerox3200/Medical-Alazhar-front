import React, { useState } from "react";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <>
      <input
        className="border-1 bg-softGray border-mediumGray/30 p-2 w-full rounded-sm outline-0"
        type="search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search..."
      />
    </>
  );
};

export default SearchBar;
