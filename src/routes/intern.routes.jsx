import React, { lazy } from "react";
const ProtectedRoute = lazy(() => import("../utils/ProtectedRoute.jsx"));
const InternLayout = lazy(() => import("../layouts/InternLayout.jsx"));
const InternHome = lazy(() => import("../interns/home/Index.jsx"));
const InternProfile = lazy(() => import("../interns/profile/Index.jsx"));

const TrainingLayout = lazy(() =>
  import("../interns/training/TrainingLayout.jsx")
);
const Training = lazy(() => import("../interns/training/Index.jsx"));
const CasesSummary = lazy(() => import("../interns/training/cases/Index.jsx"));
const Case = lazy(() => import("../interns/training/cases/case/Index.jsx"));
const AddCase = lazy(() => import("../interns/training/cases/add/Index.jsx"));
const Procedures = lazy(() => import("../interns/training/procedures/Index.jsx"));
const Procedure = lazy(() =>
  import("../interns/training/procedures/procedure/Index.jsx")
);
const AddProcedure = lazy(() =>
  import("../interns/training/procedures/add/Index.jsx")
);
const SelfLearningActivities = lazy(() =>
  import("../interns/training/self_learning/Index.jsx")
);
const SelfLearningActivity = lazy(() =>
  import("../interns/training/self_learning/activity/Index.jsx")
);
const AddSelfLearningActivity = lazy(() =>
  import("../interns/training/self_learning/add/Index.jsx")
);
const DirectLearnings = lazy(() =>
  import("../interns/training/direct_learning/Index.jsx")
);
const DirectLearningActivity = lazy(() =>
  import("../interns/training/direct_learning/activity/Index.jsx")
);
const AddDirectLearning = lazy(() =>
  import("../interns/training/direct_learning/add/Index.jsx")
);
const Assessments = lazy(() => import("../interns/training/Assessments.jsx"));
const Reflections = lazy(() => import("../interns/training/Reflections.jsx"));

const Progress = lazy(() => import("../interns/progress/Index.jsx"));
// const Portfolio = lazy(() => import("../interns/Courses.jsx"));
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
            path: "training",
            element: <TrainingLayout />,
            children: [
              // {
              //   index: true,
              //   element: <Training />,
              // },
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
                path: "procedures/add",
                element: <AddProcedure />,
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
                path: "self-learning-activities/add",
                element: <AddSelfLearningActivity />,
              },
              {
                path: "direct-learning-activities",
                element: <DirectLearnings />,
              },
              {
                path: "direct-learning-activities/:activityId",
                element: <DirectLearningActivity />,
              },
              {
                path: "direct-learning-activities/add",
                element: <AddDirectLearning />,
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
          {
            path: "progress",
            element: <Progress />,
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
