import React from "react";
import MainThemeOfCase from "./MainThemeOfCase";
import MainInfo from "./MainInfo";
import { FaRegSave } from "react-icons/fa";
import { CasesProvider } from "../CasesProvider";

const AddCase = () => {
  return (
    <CasesProvider>
      <div className="p-10 shadow-md">
        {/* Heading and save button */}

        <div className="flex justify-between items-center">
          <h1 className="text-4xl mb-8 text-mediumGray">Add New Case</h1>
          <div>
            <button
              type="submit"
              className="bg-deepBlue py-2 px-4 rounded-sm col-span-full cursor-pointer text-softGray text-lg hover:bg-deepBlue/80 transition-colors duration-150 flex items-center justify-between gap-3"
            >
              Save <FaRegSave />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 items-start gap-6">
          {/* Main Information */}
          <div className="col-span-6 grid grid-cols-4 gap-6 items-center shadow-md p-6 min-h-[455.6px]">
            <MainInfo />
          </div>
          {/* Main Theme of Case */}
          <div className="col-span-6 shadow-md p-6">
            <MainThemeOfCase />
          </div>

          <div className="col-span-6 shadow-md p-6">
            {/* Self Reflection */}
            <label htmlFor="main-theme" className="block mb-2">
              Case Summary
            </label>
            <textarea className="border-1 border-mediumGray/20 block w-full h-20 resize-none rounded-sm" />
          </div>
          {/* Case Summary */}
          <div className="col-span-6 shadow-md p-6">
            <label htmlFor="main-theme" className="block mb-2">
              Self-reflection:
            </label>
            <textarea className="border-1 border-mediumGray/20 block w-full h-20 resize-none rounded-sm" />
          </div>
        </div>
      </div>
    </CasesProvider>
  );
};

export default AddCase;
