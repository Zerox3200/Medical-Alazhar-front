import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useTrainingContext } from "../../TrainingProvider";
import trainingData from "../../data";

const expectedLevelOptions = [
  { value: "A", label: "A" },
  { value: "B", label: "B" },
  { value: "C", label: "C" },
];

const MainThemeOfCase = () => {
  const [caseType, setCaseType] = useState("");
  const [epas, setEpas] = useState([]);
  const [expectedLevel, setExpectedLevel] = useState(null);
  const [frequency, setFrequency] = useState(20);

  // Consume Cases Context
  const { filteredList, selectedRound } = useTrainingContext();

  useEffect(() => {
    if (selectedRound) {
      setCaseType("");
    }
  }, [selectedRound]);

  return (
    <>
      <h3 className="col-span-full text-xl font-semibold text-mediumGray">
        Main Theme of Case
      </h3>

      {/* Case Type */}
      <div className="col-span-full">
        <label className="block text-sm font-medium mb-2">Case Type</label>
        <Select
          options={filteredList}
          value={caseType}
          isOptionSelected={{ caseType }}
          onChange={setCaseType}
          placeholder="Select Case Type"
        />
      </div>

      {/* Relevant Descriptors (EPAs) */}
      <div className="col-span-full">
        <label className="block text-sm font-medium mb-2">
          Relevant Descriptors (EPAs)
        </label>
        <Select
          isMulti
          options={trainingData.cases.epasList}
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
      <div className="col-span-2">
        <h2 className="text-sm font-medium mb-2 cursor-default">
          Minimal Frequency
        </h2>
        <p
          className={`border-1 border-mediumGray/60 rounded-sm p-1 text-lg outline-0 block w-full ${
            frequency <= 0 ? "text-emeraldGreen" : "text-error"
          }`}
        >
          {+frequency || 20}
        </p>
      </div>
    </>
  );
};

export default MainThemeOfCase;
