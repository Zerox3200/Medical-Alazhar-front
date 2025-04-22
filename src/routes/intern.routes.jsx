import React, { lazy } from "react";
const ProtectedRoute = lazy(() => import("../utils/ProtectedRoute.jsx"));
const MainLayout = lazy(() => import("../layouts/MainLayout.jsx"));
const InternHome = lazy(() => import("../pages/interns/home"));
const TrainingLayout = lazy(() =>
  import("../pages/interns/training/TrainingLayout.jsx")
);
const Training = lazy(() => import("../pages/interns/training"));
const CasesSummary = lazy(() => import("../pages/interns/training/cases"));
const Procedures = lazy(() => import("../pages/interns/training/procedures"));
const SelfLearning = lazy(() =>
  import("../pages/interns/training/selflearning")
);
const DirectLearning = lazy(() =>
  import("../pages/interns/training/DirectLearning.jsx")
);
const Assessments = lazy(() =>
  import("../pages/interns/training/Assessments.jsx")
);
const EndRoundReflections = lazy(() =>
  import("../pages/interns/training/EndRoundReflections.jsx")
);
const InternProfile = lazy(() =>
  import("../pages/interns/profile/InternProfile.jsx")
);

const Courses = lazy(() => import("../pages/interns/Courses.jsx"));
const Portfolio = lazy(() => import("../pages/interns/Courses.jsx"));
const ContactUs = lazy(() => import("../pages/interns/ContactUs.jsx"));

const InternRoutes = [
  {
    element: <ProtectedRoute allowedRoles={["intern"]} />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <InternHome />,
          },
          {
            path: "profile",
            element: <InternProfile />,
          },
          {
            path: "training",
            element: <TrainingLayout />,
            children: [
              {
                index: true,
                element: <Training />,
              },
              {
                path: "cases",
                element: <CasesSummary />,
              },
              {
                path: "procedures",
                element: <Procedures />,
              },
              {
                path: "self_learning",
                element: <SelfLearning />,
              },
              {
                path: "direct_learning",
                element: <DirectLearning />,
              },
              {
                path: "assessments",
                element: <Assessments />,
              },
              {
                path: "end_round_reflections",
                element: <EndRoundReflections />,
              },
            ],
          },
          {
            path: "courses",
            element: <Courses />,
          },
          {
            path: "portfolio",
            element: <Portfolio />,
          },
          {
            path: "contact_us",
            element: <ContactUs />,
          },
        ],
      },
    ],
  },
];

export default InternRoutes;
