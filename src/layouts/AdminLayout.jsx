import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars } from "react-icons/fa";
import DashobardSidebar from "../admin/components/DashobardSidebar.jsx";
import DashboardHeadbar from "../admin/components/DashboardHeadbar.jsx";
import Copyright from "../components/Copyright.jsx";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { clearAuth } from "../services/slices/authSlice.js";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cookies] = useCookies(['Al-Azhar']);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    if (!cookies['Al-Azhar']) {
      dispatch(clearAuth());
      navigate('/login');
    }
  }, [cookies['Al-Azhar']]);





  return (
    <div className="font-ubuntu bg-flashWhite min-h-screen overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="fixed inset-y-0 left-0 z-50 w-64 lg:hidden"
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <DashobardSidebar onClose={toggleSidebar} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:w-64 lg:fixed lg:inset-y-0 lg:z-50">
          <DashobardSidebar />
        </div>

        {/* Main Content */}
        <div className="lg:ml-64 flex-1 flex flex-col min-h-screen">
          {/* Mobile Header */}
          <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-3 flex items-center justify-between">
            <motion.button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaBars className="text-gray-600 text-xl" />
            </motion.button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-lightBlue rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">A</span>
              </div>
              <span className="text-gray-700 font-medium">Admin Panel</span>
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:block">
            <DashboardHeadbar />
          </div>

          {/* Main Content Area */}
          <main className="flex-1 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
