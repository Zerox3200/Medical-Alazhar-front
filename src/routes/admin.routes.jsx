import React, { lazy } from "react";
const ProtectedRoute = lazy(() => import("../utils/ProtectedRoute.jsx"));
const AdminDashboard = lazy(() => import("../admin/dashboard/Dashboard.jsx"));
const Courses = lazy(() => import("../admin/courses/Index.jsx"));
const AllCourses = lazy(() => import("../admin/courses/AllCourses.jsx"));

import Rounds from "../admin/rounds/index.jsx";
import Round from "../admin/rounds/round/Index.jsx";
import Supervisors from "../admin/supervisors/index.jsx";
import Interns from "../admin/interns/index.jsx";
import Profile from "../admin/profile/index.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";

import SupervisorProfile from "../admin/supervisors/profile/Index.jsx";
import UpdateCourse from "../admin/courses/UpdateCourse.jsx";
import UpdateQuizes from "../admin/courses/UpdateQueizzes.jsx";

const CourseVideos = lazy(() => import("../admin/courses/CourseVedios.jsx"));
const AddQuizes = lazy(() => import("../admin/courses/AddQuizes.jsx"));

const Messages = lazy(() => import("../admin/Messages/Messages.jsx"));


const AdminRoutes = [
  {
    path: "/",
    element: <ProtectedRoute allowedRoles={["admin"]} />,
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <AdminDashboard />,
          },
          {
            path: "/admin/add-course",
            element: <Courses />,
          }, {
            path: "/admin/update-course/:id",
            element: <UpdateCourse />
          },
          {
            path: "/admin/all-courses",
            element: <AllCourses />,
          },
          {
            path: "/admin/rounds",
            element: <Rounds />,
          },
          {
            path: "/admin/rounds/:roundId",
            element: <Round />,
          },
          {
            path: "/admin/supervisors",
            element: <Supervisors />,
          },
          {
            path: "/admin/supervisors/:supervisorId",
            element: <SupervisorProfile />,
          },
          {
            path: "/admin/interns",
            element: <Interns />,
          },
          {
            path: "/admin/profile",
            element: <Profile />,
          },
          {
            path: "/admin/course-videos/:courseId",
            element: <CourseVideos />,
          },
          {
            path: "/admin/add-quiz/:courseId",
            element: <AddQuizes />,
          },
          {
            path: "/admin/update-quiz/:courseId/:quizId",
            element: <UpdateQuizes />,
          },
          {
            path: "/admin/messages",
            element: <Messages />,
          }
        ],
      },
    ],
  },
];

export default AdminRoutes;
