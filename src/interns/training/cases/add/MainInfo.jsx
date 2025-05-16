import React from "react";
import { Controller } from "react-hook-form";
import RoundSelector from "../../components/RoundSelector";
import TrainingDatePicker from "../../components/TrainingDatePicker";
import SeenAt from "../../components/SeenAt";
import Select from "react-select";
import TrainingInput from "../../components/TrainingInput";
import { Tooltip } from "@mui/material";
import { FaCircleInfo } from "react-icons/fa6";
import trainingData from "../../data";
import CaseDatePicker from "../../components/CaseDatePicker";

const MainInfo = ({ register, errors, control }) => {
  return (
    <>
      <h3 className="col-span-full text-xl font-semibold text-primary/70">
        Main Information
      </h3>
      {/* Intern Round */}
      <div className="col-span-2">
        <Controller
          name="round"
          control={control}
          render={({ field }) => (
            <RoundSelector
              field={field}
              listType={trainingData.cases.casesList}
            />
          )}
        />
        {errors.round && (
          <p className="text-red-500 text-sm">{errors?.round.message}</p>
        )}
      </div>
      {/* Gender */}
      <div className="col-span-2">
        <label
          htmlFor="patient-gender"
          className="text-md font-medium block mb-2"
        >
          Patient Gender
        </label>
        <Controller
          name="patientGender"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              onChange={(value) => field.onChange(value)}
              value={field.value}
              options={[
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
              ]}
            />
          )}
        />
        {errors.patientGender && (
          <p className="text-red-500 text-sm">
            {errors?.patientGender.message}
          </p>
        )}
      </div>

      {/* Patient serial */}
      <div className="col-span-2">
        <TrainingInput
          {...register("patientSerial")}
          labelId="patient-serial"
          labelTitle="Patient serial"
          inputId="patient-serial"
          infoTooltip={
            <Tooltip title="Hospital ID" placement="top" color="#0d6efd">
              <FaCircleInfo className="text-xs" />
            </Tooltip>
          }
        />
        {errors && (
          <p className="text-red-500 text-sm">
            {errors.patientSerial?.message}
          </p>
        )}
      </div>

      {/* Age */}
      <div className="col-span-2">
        <TrainingInput
          {...register("patientAge")}
          labelId="patient-age"
          labelTitle="Patient Age"
          inputId="patient-age"
        />
        {errors && (
          <p className="text-red-500 text-sm">{errors.patientAge?.message}</p>
        )}
      </div>

      {/* Seen At */}
      <div className="col-span-2">
        <Controller
          name="venue"
          control={control}
          render={({ field }) => <SeenAt field={field} />}
        />
        {errors.venue && (
          <p className="text-red-500 text-sm">{errors?.venue.message}</p>
        )}
      </div>
      {/* Date */}
      <div className="col-span-2">
        <Controller
          name="date"
          control={control}
          render={({ field }) => <CaseDatePicker field={field} />}
        />
        {errors.date && (
          <p className="text-red-500 text-sm">{errors?.date.message}</p>
        )}
      </div>
    </>
  );
};

export default MainInfo;
