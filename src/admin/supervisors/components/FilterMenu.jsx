import React from "react";
import Input from "../../components/Input";
import Select from "react-select";
import { specialities } from "../../constants/filterData";
import DarkButton from "../../components/DarkButton";

const FilterMenu = ({ activeMenuFilter }) => {
  return (
    <ul
      className={`p-3 absolute top-full right-0 w-96 max-h-52 rounded-md shadow-sm bg-white z-40 grid grid-cols-2 gap-2 ${
        activeMenuFilter ? "block" : "hidden"
      }`}
    >
      <li className="col-span-1">
        <Select options={specialities} placeholder="Speciality" />
      </li>
      <li className="col-span-1">
        <Select
          options={[
            { label: "Al Hussein", value: "al_hussein" },
            { label: "Sayed Galal", value: "sayed_galal" },
          ]}
          placeholder="Hospital"
        />
      </li>
      <li className="col-span-full flex flex-col items-cente gap-1">
        <h3>Round Name</h3>
        <Input customStyle="!p-1" />
      </li>

      <DarkButton
        label="Apply Filters"
        customName="col-span-full justify-center"
      />
    </ul>
  );
};

export default FilterMenu;
