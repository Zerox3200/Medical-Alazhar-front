import React from "react";
import Select from "react-select";
import RoundSelector from "../../components/RoundSelector";
import Skill from "../../components/Skill";
import TrainingDatePicker from "../../components/TrainingDatePicker";
import SeenAt from "../../components/SeenAt";
import TrainingInput from "../../components/TrainingInput";
import trainingData from "../../data";
import { Modal } from "@mui/material";
import { toast } from "react-toastify";
import { useAddNewProcedureMutation } from "../../../../services/api/internApiSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { procedureValidationSchema } from "../../constants/procedureValidationSchema";
import Button from "../../../components/Button";

const AddProcedure = ({ open, handleClose }) => {
  const [addNewProcedure] = useAddNewProcedureMutation();

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
      round: null,
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
      await addNewProcedure({
        round: round.value,
        skill: skill.value,
        performanceLevel: performanceLevel.value,
        venue: venue.value,
        date: date.toISOString(),
        hospitalRecord,
      }).unwrap();
      toast.success("Procedure added successfully!");
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
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex items-center justify-center"
    >
      <div className="p-6 bg-softGray rounded outline-0 w-4/6">
        <h1 className="text-3xl">Add New Procedure</h1>
        <form
          className="mt-4 grid grid-cols-12 items-start gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
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

          {/* Submit Button */}
          <div className="col-span-full mt-4">
            <Button type="submit" label="Add" />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddProcedure;
