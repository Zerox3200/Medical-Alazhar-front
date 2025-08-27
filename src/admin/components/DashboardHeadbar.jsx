import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCalendarPlus, FaBell, FaSearch } from "react-icons/fa";
import { useAdmin } from "../../services/admin/api/hooks/adminHooks.js";
import AccountMenu from "./AccountMenu.jsx";
import { useSelector } from "react-redux";

const DashboardHeadbar = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const date = new Date();
  const today = date.toDateString();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const { role, fullname, profileImage } = useSelector((state) => state.auth?.user);


  return (
    <motion.div
      className="bg-white shadow-sm border-b border-gray-200 px-6 py-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        {/* Welcome and date */}
        <div className="flex-1">
          <motion.h1
            className="text-2xl lg:text-3xl font-bold text-secondary"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            Welcome Back,{" "}
            <span className="text-lightBlue">
              Dr. {fullname?.split(" ")[0]}
            </span>
          </motion.h1>
          <motion.div
            className="flex items-center gap-4 mt-2 text-gray-600"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2">
              <FaCalendarPlus className="text-lightBlue" />
              <span className="font-medium">{today}</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-gray-300"></div>
            <span className="font-mono text-sm">{time}</span>
          </motion.div>
        </div>

        {/* Search and Actions */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <motion.div
            className="hidden md:flex items-center bg-gray-50 rounded-lg px-4 py-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <FaSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-sm w-48"
            />
          </motion.div>

          {/* Notifications */}
          <motion.button
            className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <FaBell className="text-gray-600 text-lg" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </motion.button>

          {/* Account Menu */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <AccountMenu
              profileImage={profileImage}
              name={
                fullname.split(" ")[0] +
                " " +
                fullname.split(" ")[1]
              }
              role={role}
            />
          </motion.div>
        </div>
      </div>


    </motion.div>
  );
};

export default DashboardHeadbar;
