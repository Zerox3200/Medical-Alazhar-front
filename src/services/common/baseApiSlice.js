import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAuth, clearAuth } from "../slices/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error?.status === 401) {
    const { token } = api.getState().auth;
    if (!token) {
      api.dispatch(clearAuth());
      window.location.href = "/auth/login";
      return result;
    }
    try {
      const refreshResult = await baseQuery(
        {
          url: "/auth/refresh",
          method: "POST",
          credentials: "include",
        },
        api,
        extraOptions
      );
      if (refreshResult.data) {
        const currentAuth = api.getState().auth;
        const { accessToken, user = currentAuth.user } = refreshResult.data;
        api.dispatch(setAuth({ token: accessToken, user }));
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(clearAuth());
        window.location.href = "/auth/login";
        return result;
      }
    } catch (error) {
      console.error("Refresh token attempt failed:", error);
      api.dispatch(clearAuth());
      window.location.href = "/auth/login";
      return result;
    }
  }
  return result;
};

export const baseApiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "User",
    "Account",
    "Intern",
    "Supervisor",
    "Coordinator",
    "Round",
    "Cases",
    "Procedures",
    "Self_Learning_Activity",
    "Direct_Learning_Activity",
    "Course",
  ],
  endpoints: () => ({}),
});
