import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import Input from "../components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSupervisorSignupMutation } from "../../../services/api/apiSlice";
import { supervisorSignupValidationSchema } from "../../../constants/authFormData";

const SupervisorSignupForm = () => {
  const [supervisorSignup, { isLoading, isSuccess }] =
    useSupervisorSignupMutation();

  const [visiblePassword, setVisiblePassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm({
    resolver: yupResolver(supervisorSignupValidationSchema()),
  });
  console.log("errors", errors);

  const onSubmit = async ({ firstname, lastname, email, phone, password }) => {
    try {
      const response = await supervisorSignup({
        firstname,
        lastname,
        email,
        phone: "+20" + phone,
        password,
      }).unwrap();

      if (isSuccess) {
        toast.success(response.message);
      }
    } catch (error) {
      Object.keys(error.data?.errors).forEach((field) => {
        setError(error.data?.errors[field]?.path, {
          type: "manual",
          message: error.data?.errors[field]?.msg,
        });
      });
    }
  };

  // Reset form fields after Successful submission
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        password: "",
      });
    }
  }, [reset, isSubmitSuccessful, setValue]);

  return (
    <div className="w-80 m-auto">
      <ToastContainer position="bottom-left" />
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        {/* Firstname */}
        <div className="">
          <Input
            placeholder="Firstname"
            {...register("firstname")}
            error={errors.firstname?.message}
          />
        </div>
        {/* Lastname */}
        <div className="">
          <Input
            placeholder="Lastname"
            type="text"
            {...register("lastname")}
            error={errors.lastname?.message}
          />
        </div>
        {/* Email */}
        <div className="">
          <Input
            placeholder="Email"
            type="email"
            {...register("email")}
            error={errors.email?.message}
          />
        </div>

        {/* Phone */}
        <div className="relative flex items-center">
          <p className="absolute w-fit left-0 top-2 bg-mediumGray/30 rounded-l-sm border-1 border-mediumGray/30 p-2 text-mediumGray">
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
            {visiblePassword ? <FaEyeSlash /> : <FaEye />}
          </p>
        </div>

        <div className="w-full mt-6">
          <button
            type="submit"
            className={`w-full transition-colors duration-200 text-crispWhite p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal ${
              isLoading || isSubmitting
                ? "bg-lightBlue cursor-not-allowed hover:bg-lightBlue"
                : "cursor-pointer hover:bg-teal bg-deepBlue"
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

export default SupervisorSignupForm;
