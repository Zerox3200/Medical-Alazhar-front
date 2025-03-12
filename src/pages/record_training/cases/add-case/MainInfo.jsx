import React from "react";
import RoundSelector from "../../components/RoundSelector";
import CaseDatePicker from "../../components/CaseDatePicker";
import SeenAt from "../../components/SeenAt";
import Select from "react-select";

const MainInfo = () => {
  return (
    <>
      <h3 className="col-span-full text-xl font-semibold text-mediumGray mb-4">
        Main Information
      </h3>
      {/* Intern Round */}
      <div className="col-span-2">
        <RoundSelector />
      </div>
      {/* Gender */}
      <div className="col-span-2">
        <label htmlFor="patient-age" className="text-sm font-medium block mb-2">
          Patient Gender
        </label>
        <Select
          options={[
            { value: "Male", label: "Male" },
            { value: "Female", label: "Female" },
          ]}
        />
      </div>

      {/* Patient serial */}
      <div className="col-span-2">
        <label
          htmlFor="patient-serial"
          className="text-sm font-medium block mb-2"
        >
          Patient serial # (In the logbook)
        </label>
        <input
          id="patient-serial"
          type="number"
          className={`border-1 border-mediumGray/60 rounded-sm p-1 outline-0 block w-full`}
          autoComplete="off"
          min={0}
        />
      </div>

      {/* Age */}
      <div className="col-span-2">
        <label htmlFor="patient-age" className="text-sm font-medium block mb-2">
          Patient Age
        </label>
        <input
          id="patient-age"
          type="number"
          className={`border-1 border-mediumGray/60 rounded-sm p-1 outline-0 block w-full`}
          autoComplete="off"
          min={0}
        />
      </div>

      {/* Seen At */}
      <div className="col-span-2">
        <label htmlFor="seen-at" className="text-sm font-medium block mb-2">
          Seen At
        </label>
        <SeenAt />
      </div>
      {/* Date */}
      <div className="col-span-2">
        <label htmlFor="seen-at" className="text-sm font-medium block mb-2">
          Date
        </label>
        <CaseDatePicker />
      </div>
    </>
  );
};

export default MainInfo;
