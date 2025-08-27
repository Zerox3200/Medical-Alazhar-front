import React from "react";
import { motion } from "framer-motion";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { HiOutlineArrowNarrowUp, HiOutlineArrowNarrowDown } from "react-icons/hi";

const StatsBox = ({
  icon,
  iconColor,
  iconBg,
  heading,
  subHeading,
  lineColor,
  boxStatus,
  trend,
  trendDirection,
}) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
      whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-600 mb-1">{heading}</h3>
          <div className="flex items-baseline space-x-2">
            <h2 className="text-3xl font-bold text-secondary">{subHeading}</h2>
            {trend && (
              <div className={`flex items-center text-sm font-medium ${trendDirection === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                {trendDirection === 'up' ? (
                  <HiOutlineArrowNarrowUp className="w-4 h-4 mr-1" />
                ) : (
                  <HiOutlineArrowNarrowDown className="w-4 h-4 mr-1" />
                )}
                {trend}
              </div>
            )}
          </div>
        </div>

        <motion.div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg} ${iconColor}`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-xl">{icon}</span>
        </motion.div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <motion.div
          className={`h-2 rounded-full ${lineColor.replace('bg-', 'bg-')}`}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, Math.abs(parseInt(trend?.replace('%', '') || 0)))}%` }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>

      {boxStatus && (
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{boxStatus}</span>
          <span>vs last month</span>
        </div>
      )}

      {/* Optional Menu Button */}
      <div className="absolute top-4 right-4">
        <motion.button
          className="p-1 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <PiDotsThreeOutlineVerticalFill className="text-gray-400 text-lg" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default StatsBox;
