import React from "react";
import Select from "react-select";
import RoundSelector from "../../components/RoundSelector";
import TrainingDatePicker from "../../components/TrainingDatePicker";
import trainingData from "../../data";
import toast, { Toaster } from "react-hot-toast";
import { useAddDirectLearningMutation } from "../../../../services/intern/api/hooks/directLearningHooks.js";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { directLearningActivityValidationSchema } from "../../constants/directLearningActivityValidationSchema.js";
import Button from "../../../components/Button";

const AddDirectLearningActivity = () => {
  const [addDirectLearningActivity] = useAddDirectLearningMutation();

  const {
    handleSubmit,
    control,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(directLearningActivityValidationSchema),
    defaultValues: {
      learnedActivity: null,
      topic: null,
      date: null,
    },
  });

  const onSubmit = async (formData) => {
    try {
      const response = await addDirectLearningActivity({
        roundId: formData.round.value,
        learnedActivity: formData.learnedActivity.value,
        topic: formData.topic.value,
        date: formData.date.toISOString(),
      }).unwrap();
      if (response?.code === 201) {
        toast.success(response?.message);
      }
      reset();
    } catch (error) {
      if (error.data?.errors) {
        error.data.errors.forEach((err) => {
          setError(err.path, {
            type: "manual",
            message: err.msg,
          });
        });
      } else {
        toast.error(error.message || "Failed to add new activity");
      }
    }
  };

  return (
    <div className="bg-flashWhite">
      <Toaster />
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-4xl text-secondary">
          Add Direct Learning Activity
        </h1>
        {/* Submit Button */}
        <div className="col-span-full flex gap-4 items-center justify-end">
          <div>
            <Button
              type="button"
              label="Reset"
              customClass="!bg-white !border-white hover:!opacity-50 !shadow-md !text-secondary"
              handleClick={() => reset()}
            />
          </div>
          <div>
            <Button
              type="submit"
              label="Add Now"
              handleClick={handleSubmit(onSubmit)}
            />
          </div>
        </div>
      </div>
      <form
        className="grid grid-cols-12 items-start gap-4 bg-white shadow p-6 rounded-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Round */}
        <div className="col-span-6">
          <Controller
            name="round"
            control={control}
            render={({ field }) => <RoundSelector field={field} />}
          />
          {errors.round && (
            <p className="text-red-500 text-sm">{errors?.round?.message}</p>
          )}
        </div>
        {/* Learning Activity */}
        <div className="col-span-6">
          <Controller
            name="learnedActivity"
            control={control}
            render={({ field }) => (
              <div className="col-span-1">
                <label className="text-md font-medium block mb-2">
                  Learning Activity
                </label>
                <Select
                  {...field}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  className="block w-full"
                  options={[
                    { label: "Lecture", value: "lecture" },
                    { label: "Workshop", value: "workshop" },
                    { label: "Other", value: "other" },
                  ]}
                  placeholder="Learned Activity"
                />
              </div>
            )}
          />
          {errors.learnedActivity && (
            <p className="text-red-500 text-sm">
              {errors?.learnedActivity?.message}
            </p>
          )}
        </div>
        {/* Topic */}
        <div className="col-span-6">
          <Controller
            name="topic"
            control={control}
            render={({ field }) => (
              <div className="col-span-1">
                <label className="text-md font-medium block mb-2">Topic</label>
                <Select
                  {...field}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  className="block w-full"
                  options={trainingData.activities?.directLearningActivtiesData}
                  placeholder="Topic"
                />
              </div>
            )}
          />
          {errors.topic && (
            <p className="text-red-500 text-sm">{errors?.topic?.message}</p>
          )}
        </div>
        {/* Date */}
        <div className="col-span-6">
          <Controller
            name="date"
            control={control}
            render={({ field }) => <TrainingDatePicker field={field} />}
          />
          {errors.date && (
            <p className="text-red-500 text-sm">{errors?.date?.message}</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddDirectLearningActivity;
