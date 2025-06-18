/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Button from "../../../components/Button";
import _ from "lodash";
import { useEditDirectLearningMutation } from "../../../../services/intern/api/hooks/directLearningHooks";
import { useParams, useSearchParams } from "react-router";
import SelfLearningRoundSelectBox from "./DirectLearningRoundSelectBox";
import trainingData from "../../data";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

/* My Components */
import EditSelectBox from "../../components/edit/EditSelectBox";
import EditInputBox from "../../components/edit/EditInputBox";

const SelfLearningContent = ({
  internData,
  directLearningData,
  editMode,
  setEditMode,
}) => {
  const { activityId } = useParams();
  const [roundId, setRoundId] = useState(null);
  const [learnedActivity, setLearnedActivity] = useState(null);
  const [topic, setTopic] = useState(null);
  const [date, setDate] = useState(Date.now());

  // Set edit mode
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams({ edit: editMode });
  }, [editMode, setSearchParams]);

  const rounds =
    internData?.intern?.trainingProgress.map((progress) => progress.roundId) ||
    [];

  let roundOptions = [];
  for (let round of rounds) {
    roundOptions.push({
      label: _.startCase(round?.name),
      value: round?._id,
    });
  }
  const [editDirectLearning] = useEditDirectLearningMutation();

  const handleEditSelfLearningActivity = async (e) => {
    e.preventDefault();

    try {
      const response = await editDirectLearning({
        activityId: activityId,
        editMode,
        roundId: roundId.value ?? directLearningData?.data?.roundId?._id,
        learnedActivity:
          learnedActivity.value ?? directLearningData?.data?.learnedActivity,
        topic: topic.value ?? directLearningData?.data?.topic,
        date: date ?? directLearningData?.data?.date,
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
          procedureDataValue={directLearningData?.data?.roundId}
          placeholder="Select your round"
          selectValue={roundId}
          handleSelectChange={(option) => setRoundId(option)}
          options={roundOptions}
        />
        {/* Learned Activity */}
        <EditSelectBox
          editMode={editMode}
          dataTitle="Learned Activity"
          dataValue={directLearningData?.data?.learnedActivity}
          placeholder="Select activity"
          selectValue={learnedActivity}
          handleSelectChange={(value) => setLearnedActivity(value)}
          options={[
            { label: "Lecture", value: "lecture" },
            { label: "Workshop", value: "workshop" },
            { label: "Other", value: "other" },
          ]}
        />
        {/* Topic */}
        <EditSelectBox
          editMode={editMode}
          dataTitle="Topic"
          dataValue={directLearningData?.data?.topic}
          placeholder="Select topic"
          selectValue={topic}
          handleSelectChange={(value) => setTopic(value)}
          options={trainingData.activities.directLearningActivtiesData}
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
              {directLearningData?.data?.date.split("T")[0]}
            </span>
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
