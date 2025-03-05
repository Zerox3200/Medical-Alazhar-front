import React from "react";
import Select from "react-select";
import { graduationYear } from "../../../constants/SignupFormData";

const YearOfGraduation = () => {
  return (
    <div className="my-2 w-full">
      <Select
        className="block w-full"
        options={graduationYear()}
        placeholder="Year of graduation"
      />
    </div>
  );
};

export default YearOfGraduation;
