import React, { lazy } from "react";

import ProtectedRoute from "../utils/ProtectedRoute.jsx";
import SupervisorLayout from "../layouts/SupervisorLayout.jsx";
import Profile from "../supervisors/profile/index.jsx";
import Interns from "../supervisors/interns/index.jsx";
import Intern from "../supervisors/interns/intern/index.jsx";
import Assessments from "../supervisors/assessments/Index.jsx";
import AddAssessment from "../supervisors/assessments/AddAssessment.jsx";
const SupervisorHome = lazy(() => import("../supervisors/Home.jsx"));

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
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/interns/:internId",
            element: <Intern />,
          },
          {
            path: "/assessments",
            element: <Assessments />,
          },
          {
            path: "/assessments/add",
            element: <AddAssessment />,
          },
        ],
      },
    ],
  },
];

export default SupervisorRoutes;
