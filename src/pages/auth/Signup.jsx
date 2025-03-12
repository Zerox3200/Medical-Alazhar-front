import React, { useState, useMemo } from "react";
import countryList from "react-select-country-list";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router";
import Input from "./components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  facultiesList,
  grades,
  graduationYears,
  signupValidationSchema,
} from "../../constants/signupFormData";
import SelectBox from "./components/SelectBox";

const Signup = () => {
  const [selectedIDType, setSelectedIDType] = useState("nationalID");

  const countryListOptions = useMemo(() => countryList().getData(), []);

  const formatNationalID = (e) => {
    if (selectedIDType === "nationalID") {
      let value = e.target.value.replace(/\D/g, "");
      let formattedValue = "";

      for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) {
          formattedValue += "-";
        }
        formattedValue += value[i];
      }
      e.target.value = formattedValue;
    }
  };

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupValidationSchema(selectedIDType)),
  });
  const onSubmit = (data) => console.log(data);

  return (
    <div className="bg-crispWhite md:w-2/3 lg:w-5/8 p-12">
      <h1 className="text-teal text-4xl mb-8 font-semibold">
        Create Your Account to Begin
      </h1>
      <div className="h-[1px] w-full bg-mediumGray my-8"></div>
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 justify-between items-start gap-x-2">
          <div className="col-span-1">
            <Input
              placeholder="Name in English"
              {...register("fullname")}
              error={errors.fullname?.message}
            />
          </div>
          <div className="col-span-1 flex justify-between items-start gap-x-2">
            <Input
              placeholder="Order of graduate"
              type="Number"
              {...register("orderOfGraduate")}
              error={errors.orderOfGraduate?.message}
            />
            <Input
              placeholder="Faculty ID Number"
              type="number"
              {...register("facultyIDNumber")}
              error={errors.facultyIDNumber?.message}
            />
          </div>
        </div>
        {/* Nation ID / Passport Number */}
        <div className="w-full">
          <div className="flex items-start">
            <div>
              <label htmlFor="nationalID" className="mr-2">
                National ID
              </label>
              <input
                type="radio"
                id="nationalID"
                name="idOrPassport"
                value="nationalID"
                checked={selectedIDType === "nationalID"}
                onChange={() => {
                  setValue("idOrPassport", "");
                  errors.idOrPassport.message = "";
                  setSelectedIDType("nationalID");
                }}
              />
            </div>
            <div className="ml-4">
              <label htmlFor="passport" className="mr-2">
                Passport
              </label>
              <input
                type="radio"
                id="passport"
                name="idOrPassport"
                checked={selectedIDType === "passport"}
                value="passport"
                onChange={() => {
                  setValue("idOrPassport", "");
                  errors.idOrPassport.message = "";
                  setSelectedIDType("passport");
                }}
              />
            </div>
          </div>

          <Input
            handleInput={(e) => formatNationalID(e)}
            placeholder={`${
              selectedIDType === "nationalID"
                ? "National ID"
                : "Passport Number"
            }`}
            type="text"
            maxLength={selectedIDType === "nationalID" ? 17 : 12}
            {...register("idOrPassport")}
            error={errors.idOrPassport?.message}
          />
        </div>

        <div className="flex justify-between items-start gap-x-2">
          {/* Nationality */}
          <div className="w-full">
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
          </div>

          {/* Faculty of Graduation */}
          <div className="w-full">
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
          </div>
        </div>
        <div className="flex justify-between items-start gap-x-2">
          {/* Hospital */}
          <div className="w-full">
            <Controller
              name="hospital"
              control={control}
              render={({ field }) => (
                <SelectBox
                  {...field}
                  options={[
                    { value: "sayed_galal", label: "Sayed Galal Hospital" },
                    { value: "alhussein", label: "Al-Hussein Hospital" },
                  ]}
                  placeholder="Hospital"
                  error={errors.hospital}
                />
              )}
            />
          </div>
          <div className="w-full">
            {/* Year of graduation */}
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
          </div>
          <div className="w-full">
            {/* Grade */}
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
          </div>
        </div>

        <div className="flex justify-between items-start gap-x-2">
          <Input
            placeholder="Email"
            type="email"
            {...register("email")}
            error={errors.email?.message}
          />
          <Input
            placeholder="Phone Number"
            type="tel"
            {...register("phone")}
            error={errors.phone?.message}
          />
        </div>
        <div>
          <Input
            placeholder="Password"
            type="text"
            {...register("password")}
            error={errors.password?.message}
          />
        </div>

        <div className="w-full mt-2">
          <button
            type="submit"
            className="w-full cursor-pointer bg-deepBlue text-crispWhite p-2 rounded-md"
          >
            Signup
          </button>
          <p className="mt-2">
            Already have an email?{" "}
            <Link to="/auth/login" className="text-deepBlue">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
