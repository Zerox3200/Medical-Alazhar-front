import React from "react";
import { motion } from "framer-motion";
import logo from "../../assets/images/logo.jpg";
import { Link, NavLink } from "react-router";
import { GoHomeFill } from "react-icons/go";
import { FaHouseMedical, FaVideo } from "react-icons/fa6";
import { IoCalendarClear } from "react-icons/io5";
import { BsFillGearFill } from "react-icons/bs";
import { FaHospital, FaStethoscope, FaUsers } from "react-icons/fa";
import { IoTimeSharp } from "react-icons/io5";

const DashboardLinks = [
  {
    icon: <GoHomeFill />,
    label: "Dashboard",
    value: "/admin",
    description: "Overview and analytics"
  },
  {
    icon: <IoCalendarClear />,
    label: "Calendar",
    value: "/admin/calendar",
    description: "Schedule management"
  },
  {
    icon: <FaVideo />,
    label: "Courses",
    value: "/admin/all-courses",
    description: "Course management"
  },
  {
    icon: <FaHospital />,
    label: "Hospitals",
    value: "/admin/hospitals",
    description: "Hospital directory"
  },
  {
    icon: <FaHouseMedical />,
    label: "Rounds",
    value: "/admin/rounds",
    description: "Medical rounds"
  },
  {
    icon: <FaUsers />,
    label: "Supervisors",
    value: "/admin/supervisors",
    description: "Supervisor management"
  },
  {
    icon: <FaStethoscope />,
    label: "Interns",
    value: "/admin/interns",
    description: "Intern management"
  },
  {
    icon: <BsFillGearFill />,
    label: "Settings",
    value: "settings",
    description: "System configuration"
  },
];

const DashobardSidebar = ({ onClose }) => {
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className="bg-white h-full w-full text-primary shadow-xl border-r border-gray-200 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <img src={logo} className="w-12 h-12 rounded-full shadow-lg" alt="Logo" />
            </motion.div>
            <div>
              <h2 className="font-bold text-xl text-secondary">Admin Panel</h2>
              <p className="text-sm text-gray-500">Medical Education</p>
            </div>
          </Link>
          {onClose && (
            <motion.button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <IoTimeSharp className="text-gray-600 text-lg" />
            </motion.button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <motion.ul
          className="space-y-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {DashboardLinks.map((link, i) => (
            <motion.li key={i} variants={itemVariants}>
              <NavLink
                to={`${link.value}`}
                className={({ isActive }) =>
                  `group relative p-3 rounded-xl transition-all duration-300 flex items-center space-x-3 
                ${isActive ? "bg-lightBlue/10 text-lightBlue border border-lightBlue/20 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-secondary"
                  }`
                }
                onClick={onClose}
              >
                <motion.div
                  className={`p-2 rounded-lg transition-all duration-300 ${link.value === "/admin" ? "bg-lightBlue/20" :
                    "bg-gray-100 group-hover:bg-lightBlue/10"
                    }`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-lg">{link.icon}</span>
                </motion.div>
                <div className="flex-1">
                  <span className="font-medium">{link.label}</span>
                  <p className="text-xs text-gray-400 mt-0.5">{link.description}</p>
                </div>
                <motion.div
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${link.value === "/admin" ? "bg-lightBlue" : "bg-transparent"
                    }`}
                  whileHover={{ scale: 1.5 }}
                />
              </NavLink>
            </motion.li>
          ))}
        </motion.ul>
      </nav>
    </motion.div>
  );
};

export default DashobardSidebar;
