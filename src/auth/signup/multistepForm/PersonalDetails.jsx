import React, { useMemo } from "react";
import { Controller } from "react-hook-form";
import countryList from "react-select-country-list";
import BirthdayPicker from "../../components/BirthdayPicker";
import SelectBox from "../../components/SelectBox";
import Input from "../../components/Input";

const PersonalDetails = ({ register, errors, control }) => {
  const countryListOptions = useMemo(() => countryList().getData(), []);

  return (
    <div className="grid grid-cols-2 justify-between items-start gap-4">
      {/* Fullname */}
      <div className="col-span-1">
        <Input
          placeholder="Fullname"
          {...register("fullname")}
          error={errors.fullname?.message}
        />
        {errors && (
          <p className="text-red-500 text-sm">
            {errors.idOrPassport?.fullname?.message}
          </p>
        )}
      </div>
      {/* Arabic Name */}
      <div className="col-span-1">
        <Input
          placeholder="Arabic name"
          {...register("arabicName")}
          error={errors.arabicName?.message}
        />
        {errors && (
          <p className="text-red-500 text-sm">
            {errors.idOrPassport?.arabicName?.message}
          </p>
        )}
      </div>
      {/* Email */}
      <div className="col-span-1">
        <Input
          placeholder="Email"
          type="email"
          {...register("email")}
          error={errors.email?.message}
        />
        {errors && (
          <p className="text-red-500 text-sm">
            {errors.idOrPassport?.email?.message}
          </p>
        )}
      </div>
      {/* Date of birth */}
      <div className="col-span-1">
        <Controller
          name="dob"
          control={control}
          render={({ field }) => (
            <BirthdayPicker
              field={field}
              error={errors.dob}
              placeholder="Select Date of Birth"
            />
          )}
        />
        {errors.dob && (
          <p className="text-red-500 text-sm">{errors?.dob.message}</p>
        )}
      </div>
      {/* Nationality */}
      <div className="col-span-1">
        <Controller
          name="nationality"
          control={control}
          render={({ field }) => (
            <SelectBox
              {...field}
              options={countryListOptions}
              placeholder="Nationality"
              error={errors.nationality}
            />
          )}
        />
        {errors && (
          <p className="text-red-500 text-sm">
            {errors.idOrPassport?.nationality?.message}
          </p>
        )}
      </div>
      {/* Phone Number */}
      <div className="col-span-1 relative">
        <p className="absolute w-fit left-0 top-0 bg-silverFrost/30 rounded-l-sm border-1 border-silverFrost/50 p-2 text-mistyMorning">
          +20
        </p>
        <Input
          customStyle="indent-12"
          placeholder="Phone Number"
          type="tel"
          {...register("phone", {
            required: "Phone number is required",
            pattern: {
              value: /^01[0-2,5-5]\d{8}$/,
              message: "Invalid Egyptian mobile number (e.g., 0101234567)",
            },
          })}
          error={errors.phone?.message}
        />
        {errors && (
          <p className="text-red-500 text-sm">
            {errors.idOrPassport?.phone?.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default PersonalDetails;
