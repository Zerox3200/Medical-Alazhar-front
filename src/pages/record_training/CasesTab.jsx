import React from "react";
import RoundSelector from "./components/RoundSelector";
import UnitSelector from "./components/UnitSelector";
import CaseDatePicker from "./components/CaseDatePicker";
import SeenAt from "./components/SeenAt";
import Select from "react-select";
import MainThemeOfCase from "./cases/MainThemeOfCase";
import MainInfo from "./cases/MainInfo";
import { FaRegSave } from "react-icons/fa";

const CasesTab = () => {
  return (
    <div className="p-10">
      {/* Heading and save button */}

      <div className="flex justify-between items-center">
        <h1 className="col-span-full text-4xl mb-10">
          Record Training / Cases
        </h1>
        <div>
          <button
            type="submit"
            className="bg-teal p-3 rounded-sm col-span-full cursor-pointer text-softGray text-lg hover:bg-deepBlue/80 transition-colors duration-150 flex items-center justify-between gap-3"
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

        <div className="col-span-6">
          {/* Self Reflection */}
          <label htmlFor="main-theme" className="block mb-2">
            Case Summary
          </label>
          <textarea className="border-1 border-mediumGray/20 block w-full h-20 resize-none rounded-sm" />
        </div>
        {/* Case Summary */}
        <div className="col-span-6">
          <label htmlFor="main-theme" className="block mb-2">
            Self-reflection:
          </label>
          <textarea className="border-1 border-mediumGray/20 block w-full h-20 resize-none rounded-sm" />
        </div>
      </div>
    </div>
  );
};

export default CasesTab;
