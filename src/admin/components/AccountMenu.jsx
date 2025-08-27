import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router";
import { FaUserLarge, FaMoon, FaSun } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { BsFillGearFill } from "react-icons/bs";
import { useLogoutMutation } from "../../services/common/authApiSlice";
import { useCookies } from "react-cookie";

const AccountMenu = ({ name, role, profileImage }) => {
  const [opened, setOpened] = useState(false);
  const [toggleTheme, setToggleTheme] = useState(false);
  const accountMenuRef = useRef(null);
  const [, , removeCookies] = useCookies(['Al-Azhar']);

  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      removeCookies('Al-Azhar', { path: '/' });
    } catch (error) {
      toast.error(error);
    }
  };

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target)) {
        setOpened(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const menuVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.15,
        ease: "easeIn"
      }
    }
  };

  return (
    <div className="relative" ref={accountMenuRef}>
      <ToastContainer position="top-center" />

      {/* Profile Button */}
      <motion.div
        className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        onClick={() => setOpened(!opened)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="relative">
          <motion.img
            src={"http://localhost:3000/" + profileImage}
            alt="profile-image-icon"
            className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 shadow-sm"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="absolute -bottom-0.5 -right-0.5 bg-green-500 rounded-full w-3 h-3 border-2 border-white"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
        <div className="hidden md:block">
          <h3 className="text-sm font-semibold text-secondary">{name}</h3>
          <p className="text-xs text-gray-500 capitalize">{role}</p>
        </div>
        <motion.div
          animate={{ rotate: opened ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="hidden md:block"
        >
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {opened && (
          <motion.div
            className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 z-50"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <img
                  src={"http://localhost:3000/" + profileImage}
                  alt="profile"
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                />
                <div>
                  <h4 className="font-semibold text-secondary">{name}</h4>
                  <p className="text-sm text-gray-500 capitalize">{role}</p>
                  <p className="text-xs text-gray-400">Online</p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-2">
              <motion.div
                className="space-y-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Link
                  to="/profile"
                  className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 group"
                  onClick={() => setOpened(false)}
                >
                  <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors duration-200">
                    <FaUserLarge className="text-blue-600 text-sm" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Profile</p>
                    <p className="text-xs text-gray-500">View your profile</p>
                  </div>
                </Link>

                <Link
                  to="/admin/profile"
                  className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 group"
                  onClick={() => setOpened(false)}
                >
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors duration-200">
                    <BsFillGearFill className="text-gray-600 text-sm" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Settings</p>
                    <p className="text-xs text-gray-500">Manage your account</p>
                  </div>
                </Link>

                <div className="border-t border-gray-100 my-2"></div>

                {/* Theme Toggle */}
                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      {toggleTheme ? (
                        <FaMoon className="text-purple-600 text-sm" />
                      ) : (
                        <FaSun className="text-yellow-600 text-sm" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">Dark Mode</p>
                      <p className="text-xs text-gray-500">Toggle theme</p>
                    </div>
                  </div>
                  <motion.button
                    type="button"
                    className={`relative rounded-full w-12 h-6 transition-colors duration-300 focus:outline-none ${toggleTheme ? "bg-purple-600" : "bg-gray-300"
                      }`}
                    onClick={() => setToggleTheme(!toggleTheme)}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.span
                      className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm"
                      animate={{
                        x: toggleTheme ? 24 : 2
                      }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </motion.button>
                </div>

                <div className="border-t border-gray-100 my-2"></div>

                {/* Logout */}
                <motion.button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors duration-200 group"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors duration-200">
                    <MdLogout className="text-red-600 text-sm" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Logout</p>
                    <p className="text-xs text-red-500">Sign out of your account</p>
                  </div>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccountMenu;
