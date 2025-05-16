import React, { lazy } from "react";
const ProtectedRoute = lazy(() => import("../utils/ProtectedRoute.jsx"));
const InternLayout = lazy(() => import("../layouts/InternLayout.jsx"));
const InternHome = lazy(() => import("../interns/home"));
const InternProfile = lazy(() => import("../interns/profile"));
const Courses = lazy(() => import("../interns/courses"));
const Course = lazy(() => import("../interns/courses/course"));

const TrainingLayout = lazy(() =>
  import("../interns/training/TrainingLayout.jsx")
);
const Training = lazy(() => import("..//interns/training/Index.jsx"));
const CasesSummary = lazy(() => import("../interns/training/cases"));
const Procedures = lazy(() => import("../interns/training/procedures"));
const SelfLearning = lazy(() => import("../interns/training/selflearning"));
const DirectLearning = lazy(() =>
  import("../interns/training/DirectLearning.jsx")
);
const Assessments = lazy(() => import("../interns/training/Assessments.jsx"));
const Reflections = lazy(() => import("../interns/training/Reflections.jsx"));

// const Portfolio = lazy(() => import("../pages/interns/Courses.jsx"));
// const ContactUs = lazy(() => import("../pages/interns/ContactUs.jsx"));

const InternRoutes = [
  {
    element: <ProtectedRoute allowedRoles={["intern"]} />,
    children: [
      {
        path: "/",
        element: <InternLayout />,
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
            path: "courses",
            element: <Courses />,
          },
          {
            path: "courses/:courseId",
            element: <Course />,
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
                path: "reflections",
                element: <Reflections />,
              },
            ],
          },
          // {
          //   path: "portfolio",
          //   element: <Portfolio />,
          // },
          // {
          //   path: "contact_us",
          //   element: <ContactUs />,
          // },
        ],
      },
    ],
  },
];

export default InternRoutes;
