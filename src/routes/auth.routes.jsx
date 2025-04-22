import React, { lazy } from "react";
import AuthLayout from "../layouts/AuthLayout.jsx";

const Login = lazy(() => import("../pages/auth/Login.jsx"));
const Signup = lazy(() => import("../pages/auth/signup/Signup.jsx"));
const ResetPassword = lazy(() => import("../pages/auth/ResetPassword.jsx"));

const AuthRoutes = {
  path: "/auth",
  element: <AuthLayout />,
  children: [
    { path: "login", element: <Login /> },
    { path: "signup", element: <Signup /> },
    { path: "reset", element: <ResetPassword /> },
    { index: true, element: <Login /> },
  ],
};

export default AuthRoutes;
