import React from "react";
import { motion } from "framer-motion";
import StatsBox from "./components/StatsBox";
import { FaUserMd, FaBookMedical, FaChartLine, FaUsers, FaCalendarPlus } from "react-icons/fa";
import {
  HiOutlineArrowNarrowUp,
  HiOutlineArrowNarrowDown,
} from "react-icons/hi";
import { FaHeartPulse } from "react-icons/fa6";
import { MdSupervisorAccount } from "react-icons/md";
import { useAdminSupervisors } from "../../services/admin/api/hooks/supervisorHooks";
import { useAdminInterns } from "../../services/admin/api/hooks/internHooks";
import CasesLogged from "./charts/CasesLogged";
import PassedRounds from "./charts/PassedRounds";
import RecentAccounts from "./components/RecentAccounts";

const Dashboard = () => {
  const { supervisors } = useAdminSupervisors();
  const { interns } = useAdminInterns();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="p-6 space-y-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >

        {/* Quick Stats Bar */}
        <motion.div
          className="mt-4 grid my-4 grid-cols-1 md:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="bg-gradient-to-r from-lightBlue/10 to-blue-600/10 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Appointments</p>
                <p className="text-xl font-bold text-secondary">12</p>
              </div>
              <div className="w-8 h-8 bg-lightBlue rounded-full flex items-center justify-center">
                <FaCalendarPlus className="text-white text-sm" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500/10 to-emerald-600/10 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Interns</p>
                <p className="text-xl font-bold text-secondary">45</p>
              </div>
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">I</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500/10 to-indigo-600/10 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Reviews</p>
                <p className="text-xl font-bold text-secondary">8</p>
              </div>
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">R</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Page Header */}
        <motion.div
          className="mb-8"
          variants={itemVariants}
        >
          <h1 className="text-3xl font-bold text-secondary mb-2">Dashboard Overview</h1>
          <p className="text-gray-600">Welcome to your medical education management dashboard</p>
        </motion.div>

        {/* Statistics Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          variants={containerVariants}
        >
          {/* Interns */}
          <motion.div variants={itemVariants}>
            <StatsBox
              heading="Total Interns"
              lineColor="bg-pink"
              subHeading={interns?.count || 0}
              icon={<FaUserMd />}
              iconBg="bg-pink/30"
              iconColor="text-hotPink"
              trend="+12%"
              trendDirection="up"
            />
          </motion.div>

          {/* Supervisors */}
          <motion.div variants={itemVariants}>
            <StatsBox
              heading="Active Supervisors"
              lineColor="bg-lightRed"
              subHeading={supervisors?.count || 0}
              icon={<MdSupervisorAccount />}
              iconBg="bg-lightRed/20"
              iconColor="text-darkRed"
              trend="+8%"
              trendDirection="up"
            />
          </motion.div>

          {/* Cases Logged */}
          <motion.div variants={itemVariants}>
            <StatsBox
              heading="Cases Logged"
              lineColor="bg-mediumBlue"
              subHeading="1,247"
              icon={<FaHeartPulse />}
              iconBg="bg-lightBlue/30"
              iconColor="text-mediumBlue"
              trend="-3.2%"
              trendDirection="down"
            />
          </motion.div>

          {/* Procedures Logged */}
          <motion.div variants={itemVariants}>
            <StatsBox
              heading="Procedures"
              lineColor="bg-emeraldGreen"
              subHeading="892"
              icon={<FaBookMedical />}
              iconBg="bg-mediumGreen/20"
              iconColor="text-emeraldGreen"
              trend="-1.4%"
              trendDirection="down"
            />
          </motion.div>
        </motion.div>

        {/* Charts Section */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
          variants={containerVariants}
        >
          <motion.div
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-secondary">Cases Logged</h3>
                <p className="text-sm text-gray-500">Monthly case statistics</p>
              </div>
              <div className="w-10 h-10 bg-lightBlue/10 rounded-lg flex items-center justify-center">
                <FaChartLine className="text-lightBlue text-lg" />
              </div>
            </div>
            <CasesLogged />
          </motion.div>

          <motion.div
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-secondary">Passed Rounds</h3>
                <p className="text-sm text-gray-500">Round completion rates</p>
              </div>
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                <FaUsers className="text-green-500 text-lg" />
              </div>
            </div>
            <PassedRounds />
          </motion.div>
        </motion.div>

        {/* Recent Accounts */}
        <motion.div
          className="bg-white rounded-xl shadow-sm border border-gray-200"
          variants={itemVariants}
          whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
          transition={{ duration: 0.3 }}
        >
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-secondary">Recent Accounts</h3>
                <p className="text-sm text-gray-500">Latest registered users</p>
              </div>
              <motion.button
                className="px-4 py-2 bg-lightBlue text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All
              </motion.button>
            </div>
          </div>
          <div className="p-6">
            <RecentAccounts />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
