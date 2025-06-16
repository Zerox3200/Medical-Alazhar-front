/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Button from "../../../components/Button";
import _ from "lodash";
import { useEditSelfLearningMutation } from "../../../../services/intern/api/hooks/selfLearningHooks";
import { useParams, useSearchParams } from "react-router";
import SelfLearningRoundSelectBox from "./SelfLearningRoundSelectBox";
import trainingData from "../../data";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCamera } from "react-icons/fa6";

/* My Components */
import EditSelectBox from "../../components/edit/EditSelectBox";
import EditInputBox from "../../components/edit/EditInputBox";
import ImagePopper from "./ImagePopper";

const SelfLearningContent = ({
  internData,
  selfLearningData,
  editMode,
  setEditMode,
}) => {
  const { activityId } = useParams();
  const [roundId, setRoundId] = useState(null);
  const [learnedActivity, setLearnedActivity] = useState(null);
  const [activityTitle, setActivityTitle] = useState(null);
  const [date, setDate] = useState(Date.now());
  const [evidence, setEvidence] = useState(null);

  // Set edit mode
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams({ edit: editMode });
    setDate(selfLearningData?.data?.date);
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

  const [editSelfLearning] = useEditSelfLearningMutation();

  const handleEditSelfLearningActivity = async (e) => {
    e.preventDefault();
    try {
      const response = await editSelfLearning({
        roundId: roundId?.value,
        editMode,
        activityId: activityId.toString(),
        learnedActivity: learnedActivity?.value,
        activityTitle: activityTitle ?? selfLearningData?.data?.activityTitle,
        date: date,
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
        onSubmit={handleEditSelfLearningActivity}
      >
        {/* Round */}
        <SelfLearningRoundSelectBox
          editMode={editMode}
          procedureDataTitle="Round"
          procedureDataValue={selfLearningData?.data?.roundId}
          placeholder="Select your round"
          selectValue={roundId}
          handleSelectChange={(option) => setRoundId(option)}
          options={roundOptions}
        />
        {/* Learned Activity */}
        <EditSelectBox
          editMode={editMode}
          dataTitle="Learned Activity"
          dataValue={selfLearningData?.data?.learnedActivity}
          placeholder="Select activity"
          selectValue={learnedActivity}
          handleSelectChange={(value) => setLearnedActivity(value)}
          options={trainingData.activities.selfLearningActivtiesData}
        />

        {/* Activity Title */}
        <EditInputBox
          editMode={editMode}
          dataTitle="Activity Title"
          dataValue={selfLearningData?.data?.activityTitle}
          inputValue={activityTitle}
          handleInputChange={(e) => setActivityTitle(e.target.value)}
        />

        {/* Date */}
        <div className="grid grid-cols-5 gap-2 mb-4">
          <label className="font-medium text-mistyMorning col-span-2">
            Date:{" "}
          </label>
          {editMode ? (
            <DatePicker
              dateFormat="yyyy-MM-dd"
              calendarClassName="w-full"
              className="border-1 border-mediumGray/20 rounded-sm p-1.5 outline-0 col-span-2"
              selected={date}
              value={date}
              onChange={(value) => setDate(value)}
            />
          ) : (
            <span className="text-secondary font-semibold col-span-2">
              {selfLearningData?.data?.date.split("T")[0]}
            </span>
          )}
        </div>

        {/* Evidence */}
        <div className="col-span-1 grid grid-cols-5 gap-2">
          <span className="text-mistyMorning mr-2 col-span-2">Evidence: </span>
          {selfLearningData?.data?.selfLearningActivityEvidence && !editMode ? (
            <div className="col-span-2">
              <ImagePopper
                src={
                  "http://localhost:3000/" +
                  selfLearningData?.data?.selfLearningActivityEvidence
                }
                alt={selfLearningData?.data?.activityTitle}
                // setOpenImageUploaderModal={setOpenImageUploaderModal}
              />
            </div>
          ) : (
            <div className="col-span-2">
              <input
                type="file"
                id="evidence"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setEvidence(file);
                }}
              />
              <label
                htmlFor="evidence"
                className="  bg-white border-2 border-dashed border-mistyMorning p-4 rounded-lg flex flex-col items-center justify-center w-full h-full cursor-pointer"
              >
                <FaCamera className="text-mistyMorning text-xl mb-2" />
                <span>Evidence</span>{" "}
              </label>
            </div>
          )}
        </div>

        {/* Save Button */}
        {editMode && (
          <div className="col-span-2">
            <Button
              label="Save changes"
              handleClick={handleEditSelfLearningActivity}
              type="submit"
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default SelfLearningContent;
