import React, { useState, useMemo, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import countryList from "react-select-country-list";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import Input from "./components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  facultiesList,
  grades,
  graduationYears,
  signupValidationSchema,
} from "../../constants/authFormData";
import SelectBox from "./components/SelectBox";

const Signup = () => {
  const [selectedIDType, setSelectedIDType] = useState("nationalID");
  const [visiblePassword, setVisiblePassword] = useState(false);

  const navigate = useNavigate();

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
    setError,
    reset,
    formState: { errors, isSubmitSuccessful, isLoading, isSubmitting },
  } = useForm({
    resolver: yupResolver(signupValidationSchema(selectedIDType)),
  });

  const onSubmit = async ({
    fullname,
    facultyIDNumber,
    orderOfGraduate,
    idOrPassportNumber,
    email,
    phone,
    password,
    grade,
    facultyOfGraduation,
    hospital,
    nationality,
    yearOfGraduation,
  }) => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          fullname,
          facultyIDNumber,
          orderOfGraduate,
          idOrPassport: {
            type: selectedIDType,
            number: +idOrPassportNumber.replaceAll("-", ""),
          },
          email,
          phone,
          password,
          grade: grade.value,
          facultyOfGraduation: facultyOfGraduation.value,
          hospital: hospital.value,
          nationality: nationality.value,
          yearOfGraduation: yearOfGraduation.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();

      if (response.ok) {
        toast.success(result?.message);
        setTimeout(() => navigate("/auth/login"), 2000);
      } else {
        toast.error("Signup failed. Please check your details.");
      }

      if (!response.ok) {
        Object.keys(result.errors).forEach((field) => {
          setError(result.errors[field]?.path, {
            type: "manual",
            message: result.errors[field]?.msg,
          });
        });
        return;
      }
    } catch (error) {
      setError("general", {
        type: "manual",
        error: error,
        message: toast.error("Network error, please try again."),
      });
    }
  };

  // Reset form fields after Successful submission
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        fullname: "",
        facultyIDNumber: "",
        orderOfGraduate: "",
        idOrPassportNumber: "",
        email: "",
        phone: "",
        password: "",
        grade: null,
        facultyOfGraduation: null,
        hospital: null,
        nationality: null,
        yearOfGraduation: null,
      });
    }
  }, [reset, isSubmitSuccessful, setValue, navigate]);

  return (
    <div className="bg-crispWhite w-full md:w-2/3 lg:w-4/6 p-6 md:p-12">
      <ToastContainer />
      {errors?.general && (
        <p className="text-red-500 text-sm">
          {toast(errors?.general?.message)}
        </p>
      )}
      <h1 className="text-teal text-2xl md:text-4xl mb-6 md:mb-8 font-semibold">
        Create Your Account to Begin
      </h1>
      <div className="h-[1px] w-full bg-mediumGray my-8"></div>
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 justify-between items-start gap-4">
          <div className="col-span-1">
            <Input
              placeholder="Name in English"
              {...register("fullname")}
              error={errors.fullname?.message}
            />
            {errors && (
              <p className="text-red-500 text-sm">
                {errors.idOrPassport?.fullname?.message}
              </p>
            )}
          </div>
          <div className="col-span-1 flex justify-between items-start">
            <Input
              placeholder="Order of graduate"
              type="Number"
              {...register("orderOfGraduate")}
              error={errors.orderOfGraduate?.message}
            />
            {errors && (
              <p className="text-red-500 text-sm">
                {errors.idOrPassport?.orderOfGraduate?.message}
              </p>
            )}
            <div className="mx-2"></div>
            <Input
              placeholder="Faculty ID Number"
              type="number"
              {...register("facultyIDNumber")}
              error={errors.facultyIDNumber?.message}
            />
            {errors && (
              <p className="text-red-500 text-sm">
                {errors.idOrPassport?.facultyIDNumber?.message}
              </p>
            )}
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
                  setValue("idOrPassportNumber", "");
                  setSelectedIDType("nationalID");
                  if (errors.idOrPassportNumber) {
                    errors.idOrPassportNumber.message = "";
                  }
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
                  setValue("idOrPassportNumber", "");
                  setSelectedIDType("passport");
                  if (errors.idOrPassportNumber) {
                    errors.idOrPassportNumber.message = "";
                  }
                }}
              />
            </div>
            {errors && (
              <p className="text-red-500 text-sm">
                {errors.idOrPassport?.type?.message}
              </p>
            )}
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
            {...register("idOrPassportNumber")}
            error={errors.idOrPassportNumber?.message}
          />
          {errors && (
            <p className="text-red-500 text-sm">
              {errors.idOrPassport?.number?.message}
            </p>
          )}
        </div>

        <div className="flex justify-between items-start gap-4">
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
            {errors && (
              <p className="text-red-500 text-sm">
                {errors.idOrPassport?.nationality?.message}
              </p>
            )}
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
            {errors && (
              <p className="text-red-500 text-sm">
                {errors.idOrPassport?.facultyOfGraduation?.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-between items-start gap-4">
          {/* Hospital */}
          <div className="w-full">
            <Controller
              name="hospital"
              control={control}
              render={({ field }) => (
                <SelectBox
                  {...field}
                  options={[
                    { value: "Sayed Galal", label: "Sayed Galal Hospital" },
                    { value: "Al-Hussein", label: "Al-Hussein Hospital" },
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
            {errors && (
              <p className="text-red-500 text-sm">
                {errors.idOrPassport?.yearOfGraduation?.message}
              </p>
            )}
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
            {errors && (
              <p className="text-red-500 text-sm">
                {errors.idOrPassport?.grade?.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-between items-start">
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
          <div className="mx-2"></div>
          <Input
            placeholder="Phone Number"
            type="tel"
            {...register("phone")}
            error={errors.phone?.message}
          />
          {errors && (
            <p className="text-red-500 text-sm">
              {errors.idOrPassport?.phone?.message}
            </p>
          )}
        </div>
        <div className="relative">
          <Input
            placeholder="Password"
            type={!visiblePassword ? "password" : "text"}
            {...register("password")}
            error={errors.password?.message}
          />
          <p
            className="absolute right-2 top-3 cursor-pointer text-lg text-mediumGray/80"
            onClick={() => setVisiblePassword(!visiblePassword)}
          >
            {visiblePassword ? <FaEyeSlash /> : <FaEye />}
          </p>
          {errors && (
            <p className="text-red-500 text-sm">
              {errors.idOrPassport?.password?.message}
            </p>
          )}
        </div>

        <div className="w-full mt-6">
          <button
            type="submit"
            className={`w-full transition-colors duration-200 bg-deepBlue hover:bg-teal text-crispWhite p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal ${
              isLoading || isSubmitting
                ? "bg-lightBlue cursor-not-allowed"
                : "cursor-pointer"
            }`}
            disabled={isLoading || isSubmitting}
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
