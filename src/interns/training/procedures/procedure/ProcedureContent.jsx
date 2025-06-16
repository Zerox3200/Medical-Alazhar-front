/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Button from "../../../components/Button";
import _ from "lodash";
import { useEditProcedureMutation } from "../../../../services/intern/api/hooks/proceduresHooks";
import { useParams, useSearchParams } from "react-router";
import ProcedureRoundSelectBox from "./ProcedureRoundSelectBox";
import trainingData from "../../data";
import ProcedureEditSelectBox from "./ProcedureEditSelectBox";
import ProcedureEditInputBox from "./ProcedureEditInputBox";

const ProcedureContent = ({
  internData,
  procedureData,
  editMode,
  setEditMode,
}) => {
  const { procedureId } = useParams();
  const [roundId, setRoundId] = useState(null);
  const [hospitalRecord, setHospitalRecord] = useState(null);
  const [skill, setSkill] = useState(null);
  const [venue, setVenue] = useState(null);
  const [performanceLevel, setPerformanceLevel] = useState(null);

  // Set edit mode
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams({ edit: editMode });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editMode]);

  const rounds = internData?.intern?.trainingProgress.map(
    (progress) => progress.roundId
  );

  let roundOptions = [];
  for (let round of rounds) {
    roundOptions.push({
      label: _.startCase(round?.name),
      value: round?._id,
    });
  }

  const proceduresOptions = trainingData?.procedures?.proceduresList.flatMap(
    (opt) => opt.options
  );

  const [editProcedure] = useEditProcedureMutation();

  const handleEditProcedure = async (e) => {
    e.preventDefault();

    try {
      const response = await editProcedure({
        editMode,
        procedureId: procedureId.toString(),
        roundId: roundId?.value,
        skill: skill?.value,
        venue: venue?.value,
        performanceLevel: performanceLevel?.value,
        hospitalRecord: hospitalRecord ?? procedureData?.data?.hospitalRecord,
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
        onSubmit={handleEditProcedure}
      >
        {/* Round */}
        <ProcedureRoundSelectBox
          editMode={editMode}
          procedureDataTitle="Round"
          procedureDataValue={procedureData?.data?.roundId}
          placeholder="Select your round"
          selectValue={roundId}
          handleSelectChange={(option) => setRoundId(option)}
          options={roundOptions}
        />
        {/* Skill */}
        <ProcedureEditSelectBox
          editMode={editMode}
          procedureDataTitle="Skill"
          procedureDataValue={procedureData?.data?.skill}
          placeholder="Select skill"
          selectValue={skill}
          handleSelectChange={(venue) => setSkill(venue)}
          options={proceduresOptions}
        />
        {/* Venue */}
        <ProcedureEditSelectBox
          editMode={editMode}
          procedureDataTitle="Venue"
          procedureDataValue={_.startCase(procedureData?.data?.venue)}
          placeholder="Select venue"
          selectValue={venue}
          handleSelectChange={(venue) => setVenue(venue)}
          options={trainingData.cases.venueOptions}
        />
        {/* Perfprmance Level */}
        <ProcedureEditSelectBox
          editMode={editMode}
          procedureDataTitle="Performance level"
          procedureDataValue={procedureData?.data?.performanceLevel}
          placeholder="Select your level"
          selectValue={performanceLevel}
          handleSelectChange={(level) => setPerformanceLevel(level)}
          options={trainingData.cases.expectedLevels}
        />
        {/* Hospital Record */}
        <ProcedureEditInputBox
          editMode={editMode}
          procedureDataTitle="Hospital Record"
          procedureDataValue={procedureData?.data?.hospitalRecord}
          inputValue={hospitalRecord}
          handleInputChange={(e) => setHospitalRecord(e.target.value)}
        />
        {editMode && (
          <div className="col-span-full">
            <Button
              label="Save changes"
              handleClick={handleEditProcedure}
              type="submit"
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default ProcedureContent;
