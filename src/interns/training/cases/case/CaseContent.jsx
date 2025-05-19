import React, { useState } from "react";
import CaseEditInputBox from "./CaseEditInputBox";
import CaseEditSelectBox from "./CaseEditSelectBox";
import CaseEditTextAreaBox from "./CaseEditTextAreaBox";
import _ from "lodash";
import trainingData from "../../data";
import CaseRoundSelectBox from "./CaseRoundSelectBox";
import CaseEPASelectBox from "./CaseEPASelectBox";

const CaseContent = ({ internData, caseData, editMode }) => {
  const [round, setRound] = useState(null);
  const [caseType, setCaseType] = useState(null);
  const [serial, setSerial] = useState(null);
  const [gender, setGender] = useState(null);
  const [venue, setVenue] = useState(null);
  const [level, setLevel] = useState(null);
  const [age, setAge] = useState(null);
  const [summary, setSummary] = useState(null);
  const [reflection, setReflection] = useState(null);
  const [epas, setEpas] = useState([]);

  const rounds = internData?.intern?.trainingProgress.map(
    (progress) => progress.round
  );

  let roundOptions = [];
  for (let round of rounds) {
    roundOptions.push({
      label: _.startCase(round.name),
      value: round._id,
    });
  }

  const casesOptions = trainingData.cases.casesList.flatMap(
    (opt) => opt.options
  );

  const epasValues = caseData?.data?.epas.map((value) =>
    trainingData.cases.epasList.find((epa) => epa.value === value)
  );

  const genderOptions = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];

  return (
    <div className="col-span-full min-h-[400px]">
      <form className="grid grid-cols-2 gap-10 w-full">
        <div className="col-span-1">
          {/* Round */}
          <CaseRoundSelectBox
            editMode={editMode}
            caseDataTitle="Round"
            caseDataValue={caseData?.data?.round}
            placeholder="Select your round"
            selectValue={round}
            handleSelectChange={(option) => setRound(option)}
            options={roundOptions}
          />
          {/* Case Type */}
          <CaseEditSelectBox
            editMode={editMode}
            caseDataTitle="Case type"
            caseDataValue={caseData?.data?.caseType}
            placeholder="Select case type"
            selectValue={caseType}
            handleSelectChange={(caseType) => setCaseType(caseType)}
            options={casesOptions}
          />
          {/* Patient gender */}
          <CaseEditSelectBox
            editMode={editMode}
            caseDataTitle="Patient gender"
            caseDataValue={_.capitalize(caseData?.data?.patientGender)}
            placeholder="Select patient gender"
            selectValue={gender}
            handleSelectChange={(gender) => setGender(gender)}
            options={genderOptions}
          />
          {/* Venue */}
          <CaseEditSelectBox
            editMode={editMode}
            caseDataTitle="Venue"
            caseDataValue={_.startCase(caseData?.data?.venue)}
            placeholder="Select venue"
            selectValue={venue}
            handleSelectChange={(venue) => setVenue(venue)}
            options={trainingData.cases.venueOptions}
          />
        </div>
        <div className="col-span-1">
          {/* Patient serial */}
          <CaseEditInputBox
            editMode={editMode}
            caseDataTitle="Patient serial"
            caseDataValue={caseData?.data?.patientSerial}
            inputValue={serial}
            handleInputChange={(e) => setSerial(e.target.value)}
          />
          {/* Patient Age */}
          <CaseEditInputBox
            editMode={editMode}
            caseDataTitle="Patient age"
            caseDataValue={caseData?.data?.patientAge}
            inputValue={age}
            handleInputChange={(e) => setAge(e.target.value)}
          />
          {/* Expected Level */}
          <CaseEditSelectBox
            editMode={editMode}
            caseDataTitle="Expected level"
            caseDataValue={caseData?.data?.expectedLevel}
            placeholder="Select your level"
            selectValue={level}
            handleSelectChange={(level) => setLevel(level)}
            options={trainingData.cases.expectedLevels}
          />
        </div>
        <div className="col-span-full grid grid-cols-2 gap-10 -mt-10">
          {/* Case summary */}
          <CaseEditTextAreaBox
            editMode={editMode}
            caseDataTitle="Case summary"
            caseDataValue={caseData?.data?.caseSummary}
            textAreaValue={summary}
            handleTextAreaChange={(e) => setSummary(e.target.value)}
          />
          {/* Self Reflection */}
          <CaseEditTextAreaBox
            editMode={editMode}
            caseDataTitle="Self Reflection"
            caseDataValue={caseData?.data?.selfReflection}
            textAreaValue={reflection}
            handleTextAreaChange={(e) => setReflection(e.target.value)}
          />
        </div>
        <div className="col-span-full">
          {/* EPAS */}
          <CaseEPASelectBox
            editMode={editMode}
            caseDataTitle="Relevant Descriptors (EPAs)"
            caseDataValue={epasValues}
            placeholder="Select your epas"
            selectValue={epas}
            handleSelectChange={(options) => setEpas(options || [])}
            options={trainingData.cases.epasList}
          />
        </div>
      </form>
    </div>
  );
};

export default CaseContent;
