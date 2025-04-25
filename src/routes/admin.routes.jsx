import React, { lazy } from "react";
const ProtectedRoute = lazy(() => import("../utils/ProtectedRoute.jsx"));
const AdminLayout = lazy(() => import("../layouts/AdminLayout.jsx"));
const AdminDashboard = lazy(() => import("../admin/dashboard/Dashboard.jsx"));
import Rounds from "../admin/rounds";
import Supervisors from "../admin/supervisors";
import Interns from "../admin/interns";
import Profile from "../admin/profile";

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
            path: "/rounds",
            element: <Rounds />,
          },
          {
            path: "/supervisors",
            element: <Supervisors />,
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
