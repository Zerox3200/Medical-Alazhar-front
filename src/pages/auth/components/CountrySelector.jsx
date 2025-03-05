import React, { useState, useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";

function CountrySelector() {
  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value) => {
    setValue(value);
  };

  return (
    <div className="my-2 w-full">
      <Select
        className="block w-full"
        options={options}
        value={value}
        onChange={changeHandler}
        placeholder="Nationality"
      />
    </div>
  );
}

export default CountrySelector;
