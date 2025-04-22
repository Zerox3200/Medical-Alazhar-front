import React, { lazy } from "react";
const ProtectedRoute = lazy(() => import("../utils/ProtectedRoute.jsx"));
const AdminLayout = lazy(() => import("../layouts/AdminLayout.jsx"));
const AdminDashboard = lazy(() =>
  import("../pages/admin/dashboard/Dashboard.jsx")
);
import Rounds from "../pages/admin/rounds/index.jsx";
import Supervisors from "../pages/admin/supervisors";
import Interns from "../pages/admin/interns";

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
        ],
      },
    ],
  },
];

export default AdminRoutes;
