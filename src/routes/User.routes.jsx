import React, { lazy } from "react";

import ProtectedRoute from "../utils/ProtectedRoute.jsx";
import UserLayout from "../layouts/UserLayout.jsx";
import UserProfile from "../User/UserProfile/UserProfile.jsx";


const UserRoutes = [
    {
        element: <ProtectedRoute allowedRoles={["user"]} />,
        children: [
            {
                path: "/",
                element: <UserLayout />,
                children: [
                    {
                        path: "user/profile",
                        element: <UserProfile />,
                    },
                ],
            },
        ],
    },
];

export default UserRoutes;
