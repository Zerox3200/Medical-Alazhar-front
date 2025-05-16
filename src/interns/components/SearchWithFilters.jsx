import React from "react";
import Select from "react-select";

const filterItems = [
  {
    options: [
      { value: "vascular", label: "Vascular" },
      { value: "surgery", label: "Surgery" },
      { value: "medicine", label: "Medicine" },
      { value: "obsGyn", label: "Obs&Gyn" },
      { value: "pediatrics", label: "Pediatrics" },
      { value: "orthopedics", label: "Orthopedics" },
    ],
    label: "Tags",
  },
  {
    options: [
      { value: "abdallah_elmallah", label: "Dr. Abdallah Elmallah" },
      {
        value: "mostafa_abou_elenin",
        label: "Dr. Mostafa Abou Elenin",
      },
    ],
    lebel: "Instructor",
  },
  {
    options: [
      { value: "obligatory", label: "Obligatory" },
      { value: "optional", label: "Optional" },
    ],
    lebel: "Type",
  },
  {
    options: [
      { value: "completed", label: "Completed" },
      { value: "not_completed", label: "Not Completed" },
    ],
    lebel: "State",
  },
];

const SearchWithFilters = ({
  placeholder,
  inputValue,
  handleInputValue,
  selectValue,
  handleSelectChange,
}) => {
  return (
    <div className="grid grid-cols-6 gap-6">
      <div className="col-span-3">
        <input
          value={inputValue}
          onChange={handleInputValue}
          type="search"
          className="p-3 border-1 border-mistyMorning/20 rounded-md w-full indent-2 outline-none bg-flashWhite/60"
          placeholder={placeholder}
        />
      </div>
      {/* Filters */}

      <div className="col-span-3 flex items-center gap-6">
        {filterItems?.map((item, i) => {
          return (
            <div className="flex-1" key={i}>
              <Select
                options={item.options}
                placeholder={item.label}
                value={selectValue}
                onChange={handleSelectChange}
                isClearable
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchWithFilters;
