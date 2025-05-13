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
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <AdminDashboard />,
          },
          {
            path: "/courses",
            element: <Courses />,
          },
          {
            path: "/rounds",
            element: <Rounds />,
          },
          {
            path: "/rounds/:roundId",
            element: <Round />,
          },
          {
            path: "/supervisors",
            element: <Supervisors />,
          },
          {
            path: "/supervisors/:supervisorId",
            element: <SupervisorProfile />,
          },

          {
            path: "/interns",
            element: <Interns />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
];

export default AdminRoutes;
