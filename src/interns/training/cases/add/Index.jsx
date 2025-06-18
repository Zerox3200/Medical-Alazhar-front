import React from "react";
import MainThemeOfCase from "./MainThemeOfCase";
import MainInfo from "./MainInfo";
import Button from "../../../components/Button";
import { Tooltip } from "@mui/material";
import { FaCircleInfo } from "react-icons/fa6";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAddCaseMutation } from "../../../../services/intern/api/hooks/casesHooks";
import toast, { Toaster } from "react-hot-toast";
import _ from "lodash";
import { caseValidationSchema } from "../../constants/caseValidationSchema";

const AddCase = () => {
  const [addCase] = useAddCaseMutation();

  const {
    register,
    handleSubmit,
    control,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(caseValidationSchema),
    defaultValues: {
      roundId: null,
      patientGender: null,
      patientSerial: null,
      patientAge: null,
      venue: null,
      date: null,
      caseType: null,
      epas: null,
      expectedLevel: null,
      caseSummary: null,
      selfReflection: null,
    },
  });

  const onSubmit = async ({
    round,
    patientGender,
    patientSerial,
    patientAge,
    venue,
    date,
    caseType,
    epas,
    expectedLevel,
    caseSummary,
    selfReflection,
  }) => {
    try {
      const response = await addCase({
        roundId: round.value,
        patientGender: patientGender.value,
        venue: _.snakeCase(venue.value),
        caseType: caseType.value,
        expectedLevel: expectedLevel.value,
        epas: epas.flatMap((epa) => epa.value),
        patientSerial,
        patientAge,
        date: date.toISOString(),
        caseSummary,
        selfReflection,
      }).unwrap();
      console.log(response);
      if (response?.code === 201) {
        toast.success(response?.message);
      }
      reset();
    } catch (error) {
      console.log("error", error);
      if (error.data?.errors) {
        error.data.errors.forEach((err) => {
          setError(err.path, {
            type: "manual",
            message: err.msg,
          });
        });
      } else {
        toast.error(error.data?.message || "Failed to add new case");
      }
    }
  };
  return (
    <div className="bg-flashWhite rounded">
      <Toaster />
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-4xl text-secondary">Add Case</h1>
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
      >
        {/* Main Information */}
        <div className="col-span-6 grid grid-cols-4 gap-6 items-center shadow-md p-6 h-full bg-white rounded-md">
          <MainInfo register={register} errors={errors} control={control} />
        </div>
        {/* Main Theme of Case */}
        <div className="col-span-6 grid grid-cols-4 gap-6 items-center shadow-md p-6 h-full bg-white rounded-md">
          <MainThemeOfCase
            register={register}
            errors={errors}
            control={control}
          />
        </div>

        <div className="col-span-6 shadow-md p-6 bg-white rounded-md">
          {/* Case Summary */}
          <label className="text-md font-medium flex gap-1 mb-2">
            Case Summary
          </label>
          <textarea
            {...register("caseSummary")}
            className="border-1 border-mediumGray/20 block w-full h-26 resize-none rounded-sm outline-0 p-2"
            id="case-summary"
          />
          {errors && (
            <p className="text-red-500 text-sm">
              {errors.caseSummary?.message}
            </p>
          )}
        </div>
        {/* Self Reflection */}
        <div className="col-span-6 shadow-md p-6 bg-white rounded-md">
          <label className="text-md font-medium flex gap-1 mb-2">
            Self-reflection:
            <Tooltip
              title="What did I do right?, What needs more development?, Plan for further development"
              placement="top"
              color="#0d6efd"
            >
              <FaCircleInfo className="text-xs" />
            </Tooltip>
          </label>
          <textarea
            {...register("selfReflection")}
            className="border-1 border-mediumGray/20 block w-full h-26 resize-none rounded-sm outline-0 p-2"
            id="self-reflection"
          />
          {errors && (
            <p className="text-red-500 text-sm">
              {errors.selfReflection?.message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddCase;
