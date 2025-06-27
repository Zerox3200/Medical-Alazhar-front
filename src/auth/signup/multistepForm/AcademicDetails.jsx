import React from "react";
import {
  facultiesList,
  grades,
  graduationYears,
} from "../../../constants/authFormData";
import Input from "../../components/Input";
import { Controller } from "react-hook-form";
import SelectBox from "../../components/SelectBox";

const AcademicDetails = ({ register, errors, control }) => {
  // facultyOfGraduation
  // mbbchCertificateImage

  return (
    <div className="grid grid-cols-2 justify-between items-start gap-4">
      {/* Order of graduate */}
      <div className="col-span-1">
        <Input
          placeholder="Order of graduate"
          type="number"
          {...register("orderOfGraduate")}
          error={errors.orderOfGraduate?.message}
        />
        {errors && (
          <p className="text-red-500 text-sm">
            {errors.idOrPassport?.orderOfGraduate?.message}
          </p>
        )}
      </div>
      {/* Cummulative Total */}
      <div className="col-span-1">
        <Input
          placeholder="Cummulative Total"
          type="number"
          {...register("cummulativeTotal")}
          error={errors.cummulativeTotal?.message}
        />
        {errors && (
          <p className="text-red-500 text-sm">
            {errors.idOrPassport?.cummulativeTotal?.message}
          </p>
        )}
      </div>

      {/* Faculty of Graduation */}
      <div className="col-span-1">
        <Controller
          name="facultyOfGraduation"
          control={control}
          render={({ field }) => (
            <SelectBox
              {...field}
              options={facultiesList()}
              placeholder="Faculty of graduation"
              error={errors.facultyOfGraduation}
            />
          )}
        />
        {errors && (
          <p className="text-red-500 text-sm">
            {errors.idOrPassport?.facultyOfGraduation?.message}
          </p>
        )}
      </div>
      {/* Year of graduation */}
      <div className="col-span-1">
        <Controller
          name="yearOfGraduation"
          control={control}
          render={({ field }) => (
            <SelectBox
              {...field}
              options={graduationYears()}
              placeholder="Year of graduation"
              error={errors.yearOfGraduation}
            />
          )}
        />
        {errors && (
          <p className="text-red-500 text-sm">
            {errors.idOrPassport?.yearOfGraduation?.message}
          </p>
        )}
      </div>
      {/* Grade */}
      <div className="col-span-1">
        <Controller
          name="grade"
          control={control}
          render={({ field }) => (
            <SelectBox
              {...field}
              options={grades()}
              placeholder="Grade"
              error={errors.grade}
            />
          )}
        />
        {errors && (
          <p className="text-red-500 text-sm">
            {errors.idOrPassport?.grade?.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default AcademicDetails;
