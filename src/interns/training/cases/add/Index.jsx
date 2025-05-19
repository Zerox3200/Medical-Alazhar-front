import React from "react";
import MainThemeOfCase from "./MainThemeOfCase";
import MainInfo from "./MainInfo";
import Button from "../../../components/Button";
import { Modal, Tooltip } from "@mui/material";
import { FaCircleInfo } from "react-icons/fa6";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAddNewCaseMutation } from "../../../../services/api/internApiSlice";
import { toast } from "react-toastify";
import _ from "lodash";
import { caseValidationSchema } from "../../constants/caseValidationSchema";
import { useSelector } from "react-redux";

const AddCase = ({ open, handleClose }) => {
  const { id } = useSelector((state) => state.auth.user);
  const [addNewCase] = useAddNewCaseMutation();

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
      round: null,
      intern: null,
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
      await addNewCase({
        round: round.value,
        intern: id,
        patientGender: patientGender.value,
        venue: _.snakeCase(venue.value),
        patientSerial,
        patientAge,
        date: date.toISOString(),
        caseType: caseType.value,
        epas: epas.flatMap((epa) => epa.value),
        expectedLevel: expectedLevel.value,
        caseSummary,
        selfReflection,
      }).unwrap();
      toast.success("Case added successfully!");
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
        toast.error(error.message || "Failed to add new case");
      }
    }
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex items-center justify-center overflow-y-scroll p-20"
    >
      <div className="p-6 bg-flashWhite rounded outline-0 w-5/6 mt-20">
        <h1 className="text-2xl font-semibold text-secondary">Add New Case</h1>

        <form
          className="mt-4 grid grid-cols-12 items-start gap-6"
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
              className="border-1 border-mediumGray/20 block w-full h-20 resize-none rounded-sm outline-0 p-2"
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
              className="border-1 border-mediumGray/20 block w-full h-20 resize-none rounded-sm outline-0 p-2"
              id="self-reflection"
            />
            {errors && (
              <p className="text-red-500 text-sm">
                {errors.selfReflection?.message}
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

export default AddCase;
