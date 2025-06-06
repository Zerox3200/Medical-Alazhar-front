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
const CasesSummary = lazy(() => import("../interns/training/cases/Index"));
const Case = lazy(() => import("../interns/training/cases/case/Index"));
const AddCase = lazy(() => import("../interns/training/cases/add/Index"));
const Procedures = lazy(() => import("../interns/training/procedures/Index"));
const Procedure = lazy(() =>
  import("../interns/training/procedures/procedure/Index")
);
const SelfLearningActivities = lazy(() =>
  import("../interns/training/self_learning/Index")
);
const SelfLearningActivity = lazy(() =>
  import("../interns/training/self_learning/activity/Index")
);
const DirectLearning = lazy(() =>
  import("../interns/training/direct_learning/Index")
);
const Assessments = lazy(() => import("../interns/training/Assessments.jsx"));
const Reflections = lazy(() => import("../interns/training/Reflections.jsx"));

// const Portfolio = lazy(() => import("../pages/interns/Courses.jsx"));
const ContactUs = lazy(() => import("../interns/ContactUs.jsx"));

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
                path: "cases/:caseId",
                element: <Case />,
              },
              {
                path: "cases/add",
                element: <AddCase />,
              },
              {
                path: "procedures",
                element: <Procedures />,
              },
              {
                path: "procedures/:procedureId",
                element: <Procedure />,
              },
              {
                path: "self-learning-activities",
                element: <SelfLearningActivities />,
              },
              {
                path: "self-learning-activities/:activityId",
                element: <SelfLearningActivity />,
              },
              {
                path: "direct-learning-activity",
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
