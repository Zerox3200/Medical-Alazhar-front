import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import Input from "./components/Input";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidationSchema } from "../constants/authFormData";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../services/common/authApiSlice";
import { setAuth } from "../services/slices/authSlice";
import { LuEyeClosed, LuEye } from "react-icons/lu";
import SubmitButton from "./components/SubmitButton";
import { useCookies } from "react-cookie";
import { motion } from "framer-motion";
import { FaHome, FaShieldAlt, FaUserMd } from "react-icons/fa";

const Login = () => {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [Token, setToken] = useCookies(["Al-Azhar"]);
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginValidationSchema()),
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const onSubmit = async ({ email, password }) => {
    try {
      const response = await login({
        email,
        password,
      }).unwrap();

      const { data, accessToken, message, status } = response;

      if (status === "success") {
        toast.success(message);
        dispatch(setAuth({ token: accessToken, user: data?.data }));
        setToken("Al-Azhar", accessToken);

        if (data?.user?.role === "admin") {
          navigate("/admin");
          window.location.reload();
        } else if (data?.user?.role === "supervisor") {
          navigate("/supervisor/dashboard");
        } else {
          navigate("/");
        }
      }

    } catch (err) {
      if (err.status === 403) {
        toast.error("Account locked due to too many failed attempts.");
      } else if (err.status === 422) {
        toast.error(err.data?.message);
      } else if (err.status >= 500) {
        toast.error("Server error, please try again later.");
      } else {
        toast.error(err.error || "An unexpected error occurred.");
      }
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="w-full max-w-2xl">
        <Toaster />

        {/* Header Section */}
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Al-Azhar Medical Platform
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Welcome back to your medical training journey
          </p>
        </motion.div>

        {/* Home Button */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 text-sm sm:text-base shadow-md hover:shadow-lg"
          >
            <FaHome className="text-sm" />
            <span>Back to Home</span>
          </Link>
        </motion.div>

        {/* Main Form Container */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Form Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 sm:p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaUserMd className="text-2xl text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Welcome Back
              </h2>
              <p className="text-blue-100 text-lg">
                Sign in to your account to continue
              </p>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 sm:p-8 lg:p-12">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Email Address
                  </label>
                  <Input
                    placeholder="Enter your email"
                    type="email"
                    {...register("email")}
                    error={errors.email?.message}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      placeholder="Enter your password"
                      type={!visiblePassword ? "password" : "text"}
                      {...register("password")}
                      error={errors.password?.message}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                      onClick={() => setVisiblePassword(!visiblePassword)}
                    >
                      {visiblePassword ? <LuEyeClosed size={20} /> : <LuEye size={20} />}
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Forgot Password Link */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex justify-end"
              >
                <Link
                  to="/auth/reset"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                >
                  Forgot your password?
                </Link>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <SubmitButton
                  isLoading={isLoading}
                  isSubmitting={isSubmitting}
                  label="Sign In"
                  className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                />
              </motion.div>

              {/* Sign Up Link */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-center pt-4"
              >
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    to="/auth/signup"
                    className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                  >
                    Create one now
                  </Link>
                </p>
              </motion.div>
            </form>
          </div>

        </motion.div>

        {/* Additional Info */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <p className="text-sm text-gray-500">
            By signing in, you agree to our{" "}
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
              Privacy Policy
            </a>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Login;
