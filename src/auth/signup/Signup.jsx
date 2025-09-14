import React, { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaUserMd, FaUserGraduate, FaHome, FaShieldAlt, FaUser } from "react-icons/fa";
import InternSignupForm from "./InternSignupForm";
import SupervisorSignupForm from "./SupervisorSignupForm";
import NormalUserSignupForm from "./NormalUserSignupForm";

const Signup = () => {
  const [selectedUser, setSelectedUser] = useState("intern");

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

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="w-full max-w-6xl">
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
            Join our medical training and supervision platform
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
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Create Account
              </h2>
              <p className="text-blue-100 text-lg">
                Select your role to get started
              </p>
            </div>
          </div>

          {/* User Type Selection */}
          <div className="p-6 sm:p-8 lg:p-12">
            <div className="mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Intern Option */}
                <motion.div
                  className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${selectedUser === "intern"
                    ? "border-blue-500 bg-blue-50 shadow-lg"
                    : "border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100"
                    }`}
                  onClick={() => setSelectedUser("intern")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedUser === "intern"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-600"
                      }`}>
                      <FaUserGraduate className="text-xl" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        Medical Intern
                      </h3>
                      <p className="text-sm text-gray-600">
                        Register as a medical intern
                      </p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedUser === "intern"
                      ? "border-blue-500 bg-blue-500"
                      : "border-gray-300"
                      }`}>
                      {selectedUser === "intern" && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Supervisor Option */}
                <motion.div
                  className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${selectedUser === "supervisor"
                    ? "border-green-500 bg-green-50 shadow-lg"
                    : "border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100"
                    }`}
                  onClick={() => setSelectedUser("supervisor")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedUser === "supervisor"
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-600"
                      }`}>
                      <FaUserMd className="text-xl" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        Medical Supervisor
                      </h3>
                      <p className="text-sm text-gray-600">
                        Register as a medical supervisor
                      </p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedUser === "supervisor"
                      ? "border-green-500 bg-green-500"
                      : "border-gray-300"
                      }`}>
                      {selectedUser === "supervisor" && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Normal User Option */}
                <motion.div
                  className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${selectedUser === "normal"
                    ? "border-purple-500 bg-purple-50 shadow-lg"
                    : "border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100"
                    }`}
                  onClick={() => setSelectedUser("normal")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedUser === "normal"
                      ? "bg-purple-500 text-white"
                      : "bg-gray-200 text-gray-600"
                      }`}>
                      <FaUser className="text-xl" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        Regular User
                      </h3>
                      <p className="text-sm text-gray-600">
                        Register as a regular user
                      </p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedUser === "normal"
                      ? "border-purple-500 bg-purple-500"
                      : "border-gray-300"
                      }`}>
                      {selectedUser === "normal" && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Form Content */}
            <motion.div
              key={selectedUser}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {selectedUser === "intern" ? (
                <InternSignupForm />
              ) : selectedUser === "supervisor" ? (
                <SupervisorSignupForm />
              ) : (
                <NormalUserSignupForm />
              )}
            </motion.div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 sm:px-8 lg:px-12 py-4 border-t border-gray-100">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Secure registration process</span>
              </div>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <span>SSL Protected</span>
                <span>•</span>
                <span>Data Encrypted</span>
                <span>•</span>
                <span>Privacy Assured</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-sm text-gray-500">
            By creating an account, you agree to our{" "}
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

export default Signup;
