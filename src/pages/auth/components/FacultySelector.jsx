import React from "react";
import Select from "react-select";
import { facultyList } from "../../../constants/SignupFormData";

const FacultySelector = () => {
  return (
    <div className="my-2 w-full">
      <Select
        className="block w-full"
        options={facultyList()}
        placeholder="Faculty of Graduation"
      />
    </div>
  );
};

export default FacultySelector;
