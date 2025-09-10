import React, { useMemo } from "react";
import { Controller } from "react-hook-form";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaGlobe } from "react-icons/fa";
import countryList from "react-select-country-list";
import BirthdayPicker from "../../components/BirthdayPicker";
import SelectBox from "../../components/SelectBox";
import Input from "../../components/Input";

const PersonalDetails = ({ register, errors, control }) => {
  const countryListOptions = useMemo(() => countryList().getData(), []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Fullname */}
        <Input
          label="Full Name (English)"
          icon={FaUser}
          placeholder="Enter your full name in English"
          {...register("fullname")}
          error={errors.fullname?.message}
        />

        {/* Arabic Name */}
        <Input
          label="Full Name (Arabic)"
          icon={FaUser}
          placeholder="Enter your full name in Arabic"
          {...register("arabicName")}
          error={errors.arabicName?.message}
        />

        {/* Email */}
        <Input
          label="Email Address"
          icon={FaEnvelope}
          placeholder="Enter your email address"
          type="email"
          {...register("email")}
          error={errors.email?.message}
        />
        {/* Date of birth */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Date of Birth
          </label>
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
        </div>

        {/* Nationality */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Nationality
          </label>
          <Controller
            name="nationality"
            control={control}
            render={({ field }) => (
              <SelectBox
                {...field}
                options={countryListOptions}
                placeholder="Select Nationality"
                error={errors.nationality}
              />
            )}
          />
        </div>

        {/* Phone Number */}
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
      </div>
    </motion.div>
  );
};

export default PersonalDetails;
