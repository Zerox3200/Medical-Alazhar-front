import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaPhone, FaLock, FaHospital, FaUserMd } from "react-icons/fa";
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Toaster />
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Supervisor Registration
        </h3>
        <p className="text-gray-600 text-sm">
          Join as a medical supervisor
        </p>
      </div>

      <form
        className="w-full space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Fullname */}
        <Input
          label="Full Name"
          icon={FaUser}
          placeholder="Enter your full name"
          {...register("fullname")}
          error={errors.fullname?.message}
        />

        {/* Hospital */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Hospital
          </label>
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
                placeholder="Select Hospital"
                error={errors.hospital?.message}
              />
            )}
          />
        </div>

        {/* Speciality */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Speciality
          </label>
          <Controller
            name="speciality"
            control={control}
            render={({ field }) => (
              <SelectBox
                {...field}
                options={specialities}
                placeholder="Select Speciality"
                error={errors.speciality?.message}
              />
            )}
          />
        </div>
        {/* Email */}
        <Input
          label="Email Address"
          icon={FaEnvelope}
          placeholder="Enter your email address"
          type="email"
          {...register("email")}
          error={errors.email?.message}
        />

        {/* Phone */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaPhone className="h-5 w-5 text-gray-400" />
            </div>
            <div className="absolute inset-y-0 left-8 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 text-sm">+20</span>
            </div>
            <input
              type="tel"
              placeholder="Enter your phone number"
              className={`block w-full pl-16 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors.phone?.message
                ? 'border-red-300 bg-red-50'
                : 'border-gray-300 bg-white'
                }`}
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^01[0-2,5-5]\d{8}$/,
                  message: "Invalid Egyptian mobile number (e.g., 0101234567)",
                },
              })}
            />
          </div>
          {errors.phone?.message && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-600 text-sm flex items-center gap-1"
            >
              {errors.phone?.message}
            </motion.p>
          )}
        </div>

        {/* Password */}
        <Input
          label="Password"
          icon={FaLock}
          placeholder="Create a strong password"
          type={visiblePassword ? "text" : "password"}
          showPassword={visiblePassword}
          onTogglePassword={() => setVisiblePassword(!visiblePassword)}
          {...register("password")}
          error={errors.password?.message}
        />

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isLoading || isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 ${isLoading || isSubmitting
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
            }`}
        >
          {isLoading || isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Creating Account...
            </div>
          ) : (
            'Create Supervisor Account'
          )}
        </motion.button>

        {/* Login Link */}
        <div className="text-center pt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="font-medium text-green-600 hover:text-green-700 transition-colors duration-200"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </form>
    </motion.div>
  );
};

export default SupervisorSignupForm;
