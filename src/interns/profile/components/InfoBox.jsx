import React from "react";
import Input from "./Input";

const InfoBox = ({ label, value, id, handleChange }) => {
  return (
    <div className="flex flex-col gap-2 mb-4">
      <label className="block col-span-1" htmlFor={id}>
        {label}
      </label>
      <Input value={value} id={id} handleChange={handleChange} />
    </div>
  );
};

export default InfoBox;
