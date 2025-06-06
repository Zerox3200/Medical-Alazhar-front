import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAuth, clearAuth } from "../slices/authSlice";

// Custom baseQuery with refresh token logic
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

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Account"],
  endpoints: (builder) => ({
    // Intern Signup
    internSignup: builder.mutation({
      query: ({ ...formData }) => ({
        url: `/intern/auth/signup`,
        method: "POST",
        body: formData,
      }),
    }),

    // Supervisor Signup
    supervisorSignup: builder.mutation({
      query: ({ ...formData }) => ({
        url: `/supervisor/auth/signup`,
        method: "POST",
        body: formData,
      }),
    }),

    // Profile Image Upload
    uploadProfileImage: builder.mutation({
      query: ({ role, internId, imageFile }) => ({
        url: `/${role}/${internId}/uploads/profile-image`,
        method: "POST",
        body: imageFile,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),

    // NationalID Image Upload
    uploadNationalIDImage: builder.mutation({
      query: ({ internId, imageFile }) => ({
        url: `/intern/${internId}/uploads/nationalID-image`,
        method: "POST",
        body: imageFile,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    // MBBCH Certificate Image Upload
    uploadMBBCHCertificateImage: builder.mutation({
      query: ({ internId, imageFile }) => ({
        url: `/intern/${internId}/uploads/mbbch-certificate-image`,
        method: "POST",
        body: imageFile,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useInternSignupMutation,
  useSupervisorSignupMutation,
  useUploadProfileImageMutation,
  useUploadNationalIDImageMutation,
  useUploadMBBCHCertificateImageMutation,
} = apiSlice;
