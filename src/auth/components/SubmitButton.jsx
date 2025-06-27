import React from "react";

const SubmitButton = ({ isLoading, isSubmitting, label }) => {
  return (
    <div>
      <button
        type="submit"
        className={`w-full transition-colors duration-200 bg-mediumBlue hover:bg-lightBlue text-white p-2 rounded-md focus:outline-none ${
          isLoading || isSubmitting
            ? "bg-mistyMorning/30 hover:bg-mistyMorning/30 cursor-not-allowed"
            : "cursor-pointer"
        }`}
        disabled={isLoading || isSubmitting}
      >
        {label}
      </button>
    </div>
  );
};

export default SubmitButton;
