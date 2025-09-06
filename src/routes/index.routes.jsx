import React, { lazy } from "react";
import { Navigate } from "react-router";
import MainLayout from "../layouts/MainLayout.jsx";
import Home from "../pages/home/Home.jsx";
import About from "../pages/about/About.jsx";
import AuthRoutes from "./auth.routes.jsx";
import AdminRoutes from "./admin.routes.jsx";
import SupervisorRoutes from "./supervisor.route.jsx";
import InternRoutes from "./intern.routes.jsx";
import ProtectedRoute from "../utils/ProtectedRoute.jsx";
import Overview from "../pages/courses/course/Overview.jsx";
import ContactUs from "../interns/ContactUs.jsx";
const Courses = lazy(() => import("../pages/courses/Index.jsx"));
const Course = lazy(() => import("../pages/courses/course"));

const ErrorBoundary = lazy(() => import("../pages/ErrorBoundary.jsx"));
const NotFound = lazy(() => import("../pages/NotFound.jsx"));

const createRoutes = (userRole, token) => {
  return [
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/about",
          element: <About />,
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
          path: "courses/:courseId/overview",
          element: <Overview />,
        }, {
          path: "contact",
          element: <ContactUs />,
        }
      ],
    },

    AuthRoutes,
    {
      element: (
        <ProtectedRoute
          allowedRoles={["admin", "intern", "coordinator", "supervisor"]}
        />
      ),
      children: [
        ...(token && userRole === "admin" ? AdminRoutes : []),
        ...((token && userRole === "coordinator") ||
          (token && userRole === "supervisor")
          ? SupervisorRoutes
          : []),
        ...(token && userRole === "intern" ? InternRoutes : []),
      ],
    },
    {
      path: "*",
      element: token ? <NotFound /> : <Navigate to="/auth/login" replace />,
    },
  ];
};

export default createRoutes;
