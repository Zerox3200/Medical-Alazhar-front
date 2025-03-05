import React, { useState } from "react";
import Select from "react-select";

// Dropdown options
const caseTypeOptions = [
  { value: "wounds_and_ulcers", label: "Wounds and Ulcers" },
  {
    value: "swellings_and_inguino-scrotal_swellings",
    label: "Swellings and inguino-scrotal swellings",
  },
  {
    value: "common_neck_swellings",
    label: "Common neck swellings (thyroid, lymph nodes)",
  },
  {
    value: "common_infections",
    label:
      "Common infections (e.g., peri-anal infection, breast infection, hand infection, face infection, erysipelas)",
  },
  {
    value: "burns",
    label: "Burns",
  },
  {
    value: "anal_disorders",
    label: "Anal Disorders",
  },
  {
    value: "hernias",
    label: "Hernias",
  },
  {
    value: "breast_masses",
    label: "Breast Masses",
  },
  {
    value: "janudice",
    label: "Jaundice",
  },
  {
    value: "acute_abdomen",
    label: "Acute abdomen",
  },
  {
    value: "varicose_veins",
    label: "Varicose Veins",
  },
  {
    value: "ischemic_limb",
    label: "Ischemic Limb",
  },
  {
    value: "diabetic_foot",
    label: "Diabetic Foot",
  },
  {
    value: "dyspepsia",
    label: "Dyspepsia",
  },
];

const procedureOptions = [
  { value: "wound_dressing", label: "Wound Dressing" },
  {
    value: "wound_stitching",
    label: "Wound Stitching and Removal of Stitches",
  },
  { value: "physical_examination", label: "Physical examination" },
  { value: "justify_the_diagnosis ", label: "Justify the diagnosis " },
  { value: "abscess_drainage ", label: "Abscess Drainage " },
];

const epaOptions = Array.from({ length: 20 }, (_, i) => ({
  value: `EPA ${i + 1}`,
  label: `EPA ${i + 1}`,
}));
const expectedLevelOptions = [
  { value: "A", label: "A" },
  { value: "B", label: "B" },
  { value: "C", label: "C" },
];

const MainThemeOfCase = () => {
  const [caseType, setCaseType] = useState(null);
  const [procedure, setProcedure] = useState(null);
  const [epas, setEpas] = useState([]);
  const [expectedLevel, setExpectedLevel] = useState(null);
  const [frequency, setFrequency] = useState();

  return (
    <div className="col-span-full grid grid-cols-4 gap-6 items-center">
      <h3 className="text-xl font-semibold text-mediumGray mb-4 col-span-full">
        Main Theme of Case
      </h3>

      {/* Case Type */}
      <div className="col-span-full">
        <label className="block text-sm font-medium mb-2">Case Type</label>
        <Select
          options={caseTypeOptions}
          value={caseType}
          onChange={setCaseType}
          placeholder="Select Case Type"
        />
      </div>

      {/* Procedure */}
      <div className="col-span-full">
        <label className="block text-sm font-medium mb-2">Procedure</label>
        <Select
          options={procedureOptions}
          value={procedure}
          onChange={setProcedure}
          placeholder="Select Procedure"
        />
      </div>

      {/* Relevant Descriptors (EPAs) */}
      <div className="col-span-2">
        <label className="block text-sm font-medium mb-2">
          Relevant Descriptors (EPAs)
        </label>
        <Select
          isMulti
          options={epaOptions}
          value={epas}
          onChange={setEpas}
          placeholder="Select EPAs"
        />
      </div>

      {/* Expected Level */}
      <div className="col-span-2">
        <label className="block text-sm font-medium mb-2">Expected Level</label>
        <Select
          options={expectedLevelOptions}
          value={expectedLevel}
          onChange={setExpectedLevel}
          placeholder="Select Expected Level"
        />
      </div>

      {/* Minimal Frequency */}
      <div className="col-span-full">
        <label className="block text-sm font-medium mb-2">
          Minimal Frequency
        </label>
        <input
          type="number"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          className="w-full p-2 border rounded-lg border-mediumGray/30"
          min={0}
          max={5}
          placeholder="Enter Frequency"
        />
      </div>
    </div>
  );
};

export default MainThemeOfCase;
