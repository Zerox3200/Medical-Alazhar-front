import React from "react";
import { Controller } from "react-hook-form";
import SelectBox from "../../components/SelectBox";
import BirthdayPicker from "../../components/BirthdayPicker";
import Input from "../../components/Input";

const InternshipDetails = ({ errors, control, register }) => {
  return (
    <div className="grid grid-cols-2 justify-between items-start gap-4">
      {/* Hospital */}
      <div className="col-span-1">
        <Controller
          name="hospital"
          control={control}
          render={({ field }) => (
            <SelectBox
              {...field}
              options={[
                { value: "sayed_galal", label: "Sayed Galal Hospital" },
                { value: "al_hussein", label: "Al Hussein Hospital" },
              ]}
              placeholder="Hospital"
              error={errors.hospital}
            />
          )}
        />
        {errors && (
          <p className="text-red-500 text-sm">
            {errors.idOrPassport?.hospital?.message}
          </p>
        )}
      </div>
      {/* Intern Level */}
      <div className="col-span-1">
        <Controller
          name="internLevel"
          control={control}
          render={({ field }) => (
            <SelectBox
              {...field}
              options={[
                { value: "mi_1", label: "MI-1" },
                { value: "mi_2", label: "MI-2" },
              ]}
              placeholder="Intern Level"
              error={errors.internLevel}
            />
          )}
        />
        {errors && (
          <p className="text-red-500 text-sm">
            {errors.idOrPassport?.internLevel?.message}
          </p>
        )}
      </div>
      {/* Internship Start Date */}
      <div className="col-span-1">
        <Controller
          name="internshipStartDate"
          control={control}
          render={({ field }) => (
            <BirthdayPicker
              field={field}
              error={errors.internshipStartDate}
              placeholder="Internship Start Date"
            />
          )}
        />
        {errors.internshipStartDate && (
          <p className="text-red-500 text-sm">
            {errors?.internshipStartDate.message}
          </p>
        )}
      </div>
      {/* Faculty ID Number */}
      <div className="col-span-1">
        <Input
          placeholder="Faculty ID Number"
          type="number"
          {...register("idNumber")}
          error={errors.idNumber?.message}
        />
        {errors && (
          <p className="text-red-500 text-sm">
            {errors.idOrPassport?.idNumber?.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default InternshipDetails;
