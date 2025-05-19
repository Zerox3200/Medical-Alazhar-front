import React from "react";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";

const OptionsList = ({ editMode, setEditMode, setOpenOptions }) => {
  return (
    <ul className="absolute right-0 top-full min-w-fit min-h-fit bg-flashWhite shadow-sm rounded-sm p-2 overflow-hidden text-base ">
      <li
        className="flex items-center gap-2 hover:bg-silverFrost/40 cursor-pointer p-2 rounded-sm"
        onClick={() => {
          setEditMode(!editMode);
          setOpenOptions(false);
        }}
      >
        <span>
          <FaRegEdit />
        </span>
        <span> Edit</span>
      </li>
      <li className="flex items-center gap-2 hover:bg-silverFrost/40 cursor-pointer p-2 rounded-sm">
        <span>
          <FaRegTrashAlt />
        </span>
        <span> Delete</span>
      </li>
    </ul>
  );
};

export default OptionsList;
