import React, { lazy } from "react";
const ProtectedRoute = lazy(() => import("../utils/ProtectedRoute.jsx"));
const AdminLayout = lazy(() => import("../layouts/AdminLayout.jsx"));
const AdminDashboard = lazy(() => import("../admin/dashboard/Dashboard.jsx"));
const Courses = lazy(() => import("../admin/courses"));
import Rounds from "../admin/rounds";
import Round from "../admin/rounds/round";
import Supervisors from "../admin/supervisors";
import Interns from "../admin/interns";
import Profile from "../admin/profile";

import SupervisorProfile from "../admin/supervisors/profile";

const AdminRoutes = [
  {
    path: "/",
    element: <ProtectedRoute allowedRoles={["admin"]} />,
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <AdminDashboard />,
          },
          {
            path: "/admin/courses",
            element: <Courses />,
          },
          {
            path: "/admin/rounds",
            element: <Rounds />,
          },
          {
            path: "/admin/rounds/:roundId",
            element: <Round />,
          },
          {
            path: "/admin/supervisors",
            element: <Supervisors />,
          },
          {
            path: "/admin/supervisors/:supervisorId",
            element: <SupervisorProfile />,
          },

          {
            path: "/admin/interns",
            element: <Interns />,
          },
          {
            path: "/admin/profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
];

export default AdminRoutes;
