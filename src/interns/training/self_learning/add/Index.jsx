import React from "react";
import Select from "react-select";
import RoundSelector from "../../components/RoundSelector";
import TrainingDatePicker from "../../components/TrainingDatePicker";
import TrainingInput from "../../components/TrainingInput";
import trainingData from "../../data";
import toast, { Toaster } from "react-hot-toast";
import { useAddSelfLearningMutation } from "../../../../services/intern/api/hooks/selfLearningHooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { selfLearningActivityValidationSchema } from "../../constants/selfLearningActivityValidationSchema";
import Button from "../../../components/Button";
import { FaCamera } from "react-icons/fa6";

const AddActivity = () => {
  const [addSelfLearningActivity] = useAddSelfLearningMutation();

  const {
    register,
    handleSubmit,
    control,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(selfLearningActivityValidationSchema),
    defaultValues: {
      learnedActivity: null,
      activityTitle: null,
      evidence: null,
      date: null,
    },
  });

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("learnedActivity", data.learnedActivity.value);
    formData.append("activityTitle", data.activityTitle);
    formData.append("date", data.date.toISOString());

    if (data.evidence) {
      formData.append("selfLearningActivityEvidence", data.evidence);
    }

    try {
      const response = await addSelfLearningActivity({
        roundId: data?.round?.value,
        formData,
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
        toast.error(error.message || "Failed to add new procedure");
      }
    }
  };

  return (
    <div className="p-6 pt-0 bg-flashWhite rounded outline-0">
      <Toaster />
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-4xl text-secondary">Add Self Learning Activity</h1>
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
        className="grid grid-cols-12 items-start gap-4"
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        noValidate
      >
        {/* Round */}
        <div className="col-span-6">
          <Controller
            name="round"
            control={control}
            render={({ field }) => (
              <RoundSelector
                field={field}
                listType={trainingData.procedures.proceduresList}
              />
            )}
          />
          {errors.round && (
            <p className="text-red-500 text-sm">{errors?.round?.message}</p>
          )}
        </div>

        {/* Learned Activity */}
        <div className="col-span-6">
          <Controller
            name="learnedActivity"
            control={control}
            render={({ field }) => (
              <div className="col-span-1">
                <label className="text-md font-medium block mb-2">
                  Choose your activity
                </label>
                <Select
                  {...field}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  className="block w-full"
                  options={trainingData.activities.selfLearningActivtiesData}
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

        {/* Activity Title */}
        <div className="col-span-6">
          <TrainingInput
            {...register("activityTitle")}
            labelId="activity-title"
            inputType="text"
            labelTitle="Activity title"
            inputId="activity-title"
          />
          {errors && (
            <p className="text-red-500 text-sm">
              {errors?.activityTitle?.message}
            </p>
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
        {/* Evidence */}
        <div className="col-span-full h-52">
          <Controller
            name="evidence"
            control={control}
            render={({ field: { onChange, value, ...field } }) => {
              return (
                <>
                  <input
                    type="file"
                    id="evidence"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      onChange(file);
                    }}
                    {...field}
                  />
                  <label
                    htmlFor="evidence"
                    className="  bg-white border-2 border-dashed border-mistyMorning p-4 rounded-lg flex flex-col items-center justify-center w-full h-full cursor-pointer"
                  >
                    {value ? (
                      <>
                        <img
                          src={URL.createObjectURL(value)}
                          alt="Preview"
                          className="max-h-32 max-w-full object-contain mb-2"
                        />
                        <span>{value.name}</span>
                      </>
                    ) : (
                      <>
                        <FaCamera className="text-mistyMorning text-3xl mb-2" />
                        <span>Click to upload evidence</span>
                      </>
                    )}
                  </label>
                </>
              );
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default AddActivity;
