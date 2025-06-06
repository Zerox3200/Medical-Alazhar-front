import React from "react";
import Select from "react-select";
import trainingData from "../../data";
import { Controller } from "react-hook-form";

const MainThemeOfCase = ({ errors, control }) => {
  return (
    <>
      <h3 className="col-span-full text-xl font-semibold text-primary/70">
        Main Theme of Case
      </h3>

      {/* Case Type */}
      <div className="col-span-full">
        <label className="block text-md font-medium mb-2">Case Type</label>
        <Controller
          name="caseType"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              onChange={(value) => field.onChange(value)}
              value={field.value}
              options={trainingData.cases.casesList}
              placeholder="Select Case Type"
            />
          )}
        />
        {errors.caseType && (
          <p className="text-red-500 text-sm">{errors?.caseType.message}</p>
        )}
      </div>

      {/* Relevant Descriptors (EPAs) */}
      <div className="col-span-full">
        <label className="text-md font-medium block mb-2">
          Relevant Descriptors (EPAs)
        </label>
        <Controller
          name="epas"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              onChange={(value) => field.onChange(value)}
              value={field.value || "no types"}
              isMulti
              options={trainingData.cases.epasList}
              placeholder="Select EPAs"
              closeMenuOnSelect={false}
            />
          )}
        />
        {errors.epas && (
          <p className="text-red-500 text-sm">{errors?.epas.message}</p>
        )}
      </div>

      {/* Expected Level */}
      <div className="col-span-full">
        <label className="text-md font-medium block mb-2">Expected Level</label>
        <Controller
          name="expectedLevel"
          control={control}
          render={({ field }) => (
            <Select
              options={trainingData.cases.expectedLevels}
              {...field}
              onChange={(value) => field.onChange(value)}
              value={field.value}
              placeholder="Select Expected Level"
            />
          )}
        />
        {errors.expectedLevel && (
          <p className="text-red-500 text-sm">
            {errors?.expectedLevel.message}
          </p>
        )}
      </div>
    </>
  );
};

export default MainThemeOfCase;
