import { clearAuth } from "../slices/authSlice";
import { baseApiSlice } from "./baseApiSlice";

export const authApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Login
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),

    // Logout
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
        credentials: "include",
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(clearAuth());
          dispatch(baseApiSlice.util.resetApiState());
        } catch (error) {
          console.error("Logout failed:", error);
        }
      },
    }),

    // Change password
    changePassword: builder.mutation({
      query: ({ userId, ...credentials }) => ({
        url: `/auth/${userId}/password/change`,
        method: "PATCH",
        body: credentials,
        credentials: "include",
      }),
    }),

    // Intern Signup
    internSignup: builder.mutation({
      query: ({ ...formData }) => ({
        url: `/intern/auth/signup`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),

    // Supervisor Signup
    supervisorSignup: builder.mutation({
      query: ({ ...formData }) => ({
        url: `/supervisor/auth/signup`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["User"],
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

    // getUser: builder.query({
    //   query: ({ userId, role }) => ({
    //     url:
    //       ((role === "supervisor" || role === "coordinator") &&
    //         `/supervisor/${userId}`) ||
    //       (role === "intern" && `/intern/${userId}`),
    //     method: "GET",
    //     credentials: "include",
    //   }),
    //   providesTags: ["User"],
    // }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useChangePasswordMutation,
  useGetUserQuery,
  useInternSignupMutation,
  useSupervisorSignupMutation,
  useUploadProfileImageMutation,
  useUploadNationalIDImageMutation,
  useUploadMBBCHCertificateImageMutation,
} = authApiSlice;
