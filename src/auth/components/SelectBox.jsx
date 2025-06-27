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
    <div className={`w-full h-full ${customStyleClass}`}>
      <Select
        options={options}
        placeholder={placeholder}
        value={value}
        onChange={changeHandler}
        {...additionParams}
        styles={{
          control: (provided) => ({
            ...provided,
            height: "100%",
            border: error
              ? "1px solid red"
              : "1px solid color-mix(in oklab, var(--color-silverFrost) 40%, transparent);",
            borderRadius: "6px",
            boxShadow: "none",
            padding: "3px",
            "&:hover": {
              borderColor: "var(--color-lightBlue)",
            },
          }),
        }}
      />
      <p className="text-error mt-2">{error?.message}</p>
    </div>
  );
};

export default SelectBox;
