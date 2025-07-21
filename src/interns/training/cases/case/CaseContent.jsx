import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Button from "../../../components/Button";
import CaseEditInputBox from "./CaseEditInputBox";
import CaseEditSelectBox from "./CaseEditSelectBox";
import CaseEditTextAreaBox from "./CaseEditTextAreaBox";
import _ from "lodash";
import trainingData from "../../data";
import CaseRoundSelectBox from "./CaseRoundSelectBox";
import CaseEPASelectBox from "./CaseEPASelectBox";
import { useEditCaseMutation } from "../../../../services/intern/api/hooks/casesHooks";
import { useParams, useSearchParams } from "react-router";

const CaseContent = ({ internData, caseData, editMode, setEditMode }) => {
  const { caseId } = useParams();
  const [roundId, setRoundId] = useState(null);
  const [caseType, setCaseType] = useState(null);
  const [serial, setSerial] = useState(null);
  const [gender, setGender] = useState(null);
  const [venue, setVenue] = useState(null);
  const [level, setLevel] = useState(null);
  const [age, setAge] = useState(null);
  const [summary, setSummary] = useState(null);
  const [reflection, setReflection] = useState(null);
  const [epas, setEpas] = useState([]);

  // Set edit mode
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams({ edit: editMode });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editMode]);

  const rounds = internData?.intern?.trainingProgress.map(
    (progress) => progress.roundId
  );

  let roundOptions = [];
  if (rounds) {
    for (let round of rounds) {
      roundOptions.push({
        label: _.startCase(round?.name),
        value: round?._id,
      });
    }
  }

  const casesOptions = trainingData?.cases?.casesList.flatMap(
    (opt) => opt.options
  );

  const epasValues = caseData?.data?.epas.map((value) =>
    trainingData.cases.epasList.find((epa) => epa.value === value)
  );

  const genderOptions = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];

  const [editCase] = useEditCaseMutation();
  const handleEditCase = async (e) => {
    e.preventDefault();
    try {
      const response = await editCase({
        editMode,
        caseId: caseId.toString(),
        roundId: roundId?.value,
        patientGender: gender?.value,
        venue: venue?.value,
        caseType: caseType?.value,
        expectedLevel: level?.value,
        patientAge: age ?? caseData?.data?.patientAge,
        patientSerial: serial ?? caseData?.data?.patientSerial,
        caseSummary: summary ?? caseData?.data?.caseSummary,
        selfReflection: reflection ?? caseData?.data?.selfReflection,
        epas:
          epas.length > 0 ? epas.map((epa) => epa.value) : caseData?.data?.epas,
      }).unwrap();
      if (response?.code === 200) {
        toast.success(response?.message);
        setEditMode(false);
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div className="col-span-full min-h-[400px]">
      <Toaster />
      <form
        className="grid grid-cols-2 gap-10 w-full"
        onSubmit={handleEditCase}
      >
        <div className="col-span-1">
          {/* Round */}
          <CaseRoundSelectBox
            editMode={editMode}
            caseDataTitle="Round"
            caseDataValue={caseData?.data?.roundId}
            placeholder="Select your round"
            selectValue={roundId}
            handleSelectChange={(option) => setRoundId(option)}
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
        {editMode && (
          <div className="col-span-full">
            <Button
              label="Save changes"
              handleClick={handleEditCase}
              type="submit"
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default CaseContent;
