import React from "react";
import Select from "react-select";
import RoundSelector from "../../components/RoundSelector";
import Skill from "../../components/Skill";
import TrainingDatePicker from "../../components/TrainingDatePicker";
import SeenAt from "../../components/SeenAt";
import TrainingInput from "../../components/TrainingInput";
import trainingData from "../../data";
import toast, { Toaster } from "react-hot-toast";
import { useAddProcedureMutation } from "../../../../services/intern/api/hooks/proceduresHooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { procedureValidationSchema } from "../../constants/procedureValidationSchema";
import Button from "../../../components/Button";
import _ from "lodash";

const AddProcedure = () => {
  const [addProcedure] = useAddProcedureMutation();

  const {
    register,
    handleSubmit,
    control,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(procedureValidationSchema),
    defaultValues: {
      roundId: null,
      skill: null,
      hospitalRecord: null,
      performanceLevel: null,
      venue: null,
      date: null,
    },
  });

  const onSubmit = async ({
    round,
    skill,
    hospitalRecord,
    performanceLevel,
    venue,
    date,
  }) => {
    try {
      const response = await addProcedure({
        roundId: round?.value,
        skill: skill?.value,
        performanceLevel: performanceLevel.value,
        venue: _.snakeCase(venue.value),
        date: date.toISOString(),
        hospitalRecord,
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
        toast.error(error.data?.message || "Failed to add new procedure");
      }
    }
  };

  return (
    <div className="p-6 pt-0 bg-flashWhite rounded outline-0">
      <Toaster />
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-4xl text-secondary">Add Procedure</h1>
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

      {/*  */}
      <form
        className="grid grid-cols-12 items-start gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="col-span-6 grid grid-cols-4 gap-6 items-center shadow-md p-6 h-full bg-white rounded-md">
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
          <div className="col-span-6">
            <Controller
              name="skill"
              control={control}
              render={({ field }) => <Skill field={field} />}
            />
            {errors.skill && (
              <p className="text-red-500 text-sm">{errors?.skill?.message}</p>
            )}
          </div>
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
        </div>

        <div className="col-span-6 grid grid-cols-4 gap-6 items-center shadow-md p-6 h-full bg-white rounded-md">
          <div className="col-span-6">
            <Controller
              name="venue"
              control={control}
              render={({ field }) => <SeenAt field={field} />}
            />
            {errors.venue && (
              <p className="text-red-500 text-sm">{errors?.venue?.message}</p>
            )}
          </div>

          <div className="col-span-6">
            <TrainingInput
              {...register("hospitalRecord")}
              labelId="hospital-record"
              labelTitle="Hospital record"
              inputId="hospital-record"
            />
            {errors && (
              <p className="text-red-500 text-sm">
                {errors?.hospitalRecord?.message}
              </p>
            )}
          </div>
          <div className="col-span-6">
            <label className="text-md font-medium block mb-2">
              Performance Level
            </label>
            <Controller
              name="performanceLevel"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  onChange={(value) => field.onChange(value)}
                  value={field.value}
                  className="block w-full"
                  options={trainingData.procedures.performanceLevels}
                  placeholder="Performance Level"
                />
              )}
            />
            {errors.performanceLevel && (
              <p className="text-red-500 text-sm">
                {errors?.performanceLevel?.message}
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProcedure;
