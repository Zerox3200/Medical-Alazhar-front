import React, { lazy } from "react";

import ProtectedRoute from "../utils/ProtectedRoute";
import SupervisorLayout from "../layouts/SupervisorLayout";
import Interns from "../supervisors/interns/index.jsx";
import Intern from "../supervisors/interns/intern/index.jsx";
import Assessments from "../supervisors/assessments/index.jsx";
const SupervisorHome = lazy(() => import("../supervisors/Home"));

const SupervisorRoutes = [
  {
    element: <ProtectedRoute allowedRoles={["coordinator", "supervisor"]} />,
    children: [
      {
        path: "/",
        element: <SupervisorLayout />,
        children: [
          {
            index: true,
            element: <SupervisorHome />,
          },
          {
            path: "/interns",
            element: <Interns />,
          },
          {
            path: "/interns/:internId",
            element: <Intern />,
          },
          {
            path: "/assessments",
            element: <Assessments />,
          },
        ],
      },
    ],
  },
];

export default SupervisorRoutes;
