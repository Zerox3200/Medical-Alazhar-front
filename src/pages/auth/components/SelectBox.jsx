import React, { useState } from "react";

import Select from "react-select";

const SelectBox = ({
  customStyleClass,
  placeholder,
  error,
  options,
  ...additionParams
}) => {
  const [value, setValue] = useState("");

  const changeHandler = (value) => {
    setValue(value);
  };

  return (
    <div className={`my-2 w-full ${customStyleClass}`}>
      <Select
        options={options}
        placeholder={placeholder}
        value={value}
        onChange={changeHandler}
        {...additionParams}
        styles={{
          control: (styles) => ({
            ...styles,
            borderColor: error
              ? "var(--color-error)"
              : "color-mix(in oklab, var(--color-mediumGray) 60%, transparent)",
          }),
        }}
      />
      <p className="text-error mt-2">{error?.message}</p>
    </div>
  );
};

export default SelectBox;
