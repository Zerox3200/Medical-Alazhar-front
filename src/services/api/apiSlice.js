import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/v1" }),
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth?.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
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

    // Login
    internLogin: builder.mutation({
      query: ({ ...formData }) => ({
        url: `/intern/auth/login`,
        method: "POST",
        body: formData,
      }),
    }),

    internLogout: builder.mutation({
      query: ({ ...formData }) => ({
        url: `intern/auth/logout`,
        method: "POST",
        body: formData,
      }),
    }),

    // Profile Image Upload
    uploadProfileImage: builder.mutation({
      query: ({ internId, imageFile }) => ({
        url: `/intern/${internId}/uploads/profile-image`,
        method: "POST",
        body: imageFile,
      }),
    }),
  }),
});

export const {
  useInternSignupMutation,
  useSupervisorSignupMutation,
  useInternLoginMutation,
  useInternLogoutMutation,
  useUploadProfileImageMutation,
} = apiSlice;
