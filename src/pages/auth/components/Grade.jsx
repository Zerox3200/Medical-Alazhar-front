import React from "react";
import Select from "react-select";
import { grades } from "../../../constants/SignupFormData";

const Grade = () => {
  return (
    <div className="my-2 w-full">
      <Select className="block w-full" options={grades()} placeholder="Grade" />
    </div>
  );
};

export default Grade;
