import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { LuEyeClosed, LuEye } from "react-icons/lu";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router";
import Input from "../components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSupervisorSignupMutation } from "../../services/common/authApiSlice";
import {
  specialities,
  supervisorSignupValidationSchema,
} from "../../constants/authFormData";
import SelectBox from "../components/SelectBox";

import SubmitButton from "../components/SubmitButton";

const SupervisorSignupForm = () => {
  const [supervisorSignup, { isLoading }] = useSupervisorSignupMutation();

  const [visiblePassword, setVisiblePassword] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(supervisorSignupValidationSchema()),
  });

  const onSubmit = async ({
    fullname,
    speciality,
    hospital,
    email,
    phone,
    password,
  }) => {
    try {
      const response = await supervisorSignup({
        fullname,
        email,
        hospital: hospital.value,
        speciality: speciality.value,
        phone: "+20" + phone,
        password,
      }).unwrap();
      if (response.status === "success") {
        toast.success(response.message);
        reset();
      }
    } catch (error) {
      toast.error(error.data?.message);
    }
  };

  return (
    <div className="w-2/3 m-auto">
      <Toaster />
      <form
        className="w-full flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          {/* Fullname */}
          <Input
            placeholder="Fullname"
            {...register("fullname")}
            error={errors.fullname?.message}
          />
        </div>

        <div className="flex flex-col items-center gap-2 w-full">
          {/* Hospital */}
          <div className="w-full">
            <Controller
              name="hospital"
              control={control}
              render={({ field }) => (
                <SelectBox
                  {...field}
                  options={[
                    { label: "Al-Hussein", value: "al_hussein" },
                    { label: "Sayed Galal", value: "sayed_galal" },
                  ]}
                  placeholder="Hospital"
                  error={errors.hospital?.message}
                />
              )}
            />
            {errors && (
              <p className="text-red-500 text-md">{errors.hospital?.message}</p>
            )}
          </div>
          {/* Speciality */}
          <div className="w-full">
            <Controller
              name="speciality"
              control={control}
              render={({ field }) => (
                <SelectBox
                  {...field}
                  options={specialities}
                  placeholder="Speciality"
                  error={errors.speciality?.message}
                />
              )}
            />
            {errors && (
              <p className="text-red-500 text-md">
                {errors.speciality?.message}
              </p>
            )}
          </div>
        </div>
        {/* Email */}
        <div>
          <Input
            placeholder="Email"
            type="email"
            {...register("email")}
            error={errors.email?.message}
          />
        </div>

        {/* Phone */}
        <div className="relative flex items-center">
          <p className="absolute w-fit left-0 top-0 bg-mistyMorning/30 rounded-l-sm border-1 border-mistyMorning/30 p-2 text-mistyMorning">
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
            {visiblePassword ? <LuEyeClosed /> : <LuEye />}
          </p>
        </div>

        <div className="w-full mt-6">
          <SubmitButton
            isLoading={isLoading}
            isSubmitting={isSubmitting}
            label="Signup"
          />

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

export default SupervisorSignupForm;
