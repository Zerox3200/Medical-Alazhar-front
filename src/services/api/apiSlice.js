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
          url: "/auth/refresh-token",
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

    // Login
    login: builder.mutation({
      query: ({ ...formData }) => ({
        url: `/auth/login`,
        method: "POST",
        body: formData,
        credentials: "include",
      }),
    }),

    // Logout
    logout: builder.mutation({
      query: () => ({
        url: `/auth/logout`,
        method: "POST",
        credentials: "include", // Send refresh token cookie
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          console.log("Logout successful, server response:", response);
          dispatch(clearAuth());
          dispatch(apiSlice.util.resetApiState());
        } catch (error) {
          console.error("Logout failed:", error);
        }
      },
    }),

    // Get User
    getUser: builder.query({
      query: ({ userId, role }) => {
        const roles = ["admin", "coordinator", "supervisor"];
        if (!userId) {
          throw new Error("ID are required");
        }
        return {
          url: roles.includes(role)
            ? `/supervisor/${userId}`
            : `/intern/${userId}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["User"],
    }),

    // Get all supervisors
    getAllSupervisors: builder.query({
      query: () => {
        return {
          url: "/admin/supervisors",
          method: "GET",
          credentials: "include",
        };
      },

      providesTags: ["Account"],
    }),

    // Get all coordinators
    getAllCoordinators: builder.query({
      query: () => {
        return {
          url: "/admin/coordinators",
          method: "GET",
          credentials: "include",
        };
      },

      providesTags: ["Account"],
    }),

    // Get all interns
    getAllInterns: builder.query({
      query: () => {
        return {
          url: "/admin/interns",
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["Account", "Rounds"],
    }),

    // Get single intern
    getSingleIntern: builder.query({
      query: ({ internId }) => {
        return {
          url: `/admin/interns/${internId}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["Intern"],
    }),

    // Get single supervisor
    getSingleSupervisor: builder.query({
      query: ({ supervisorId }) => {
        return {
          url: `/admin/supervisors/${supervisorId}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["Supervisor"],
    }),

    // Get single coordinator
    getSingleCoordinator: builder.query({
      query: ({ coordinatorId }) => {
        return {
          url: `/admin/coordinators/${coordinatorId}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["Coordinator"],
    }),

    // Account Approval
    approveAccount: builder.mutation({
      query: ({ userId, ...approved }) => {
        return {
          url: `/admin/account-status/${userId}`,
          method: "PUT",
          body: approved,
          credentials: "include",
        };
      },
      invalidatesTags: ["Account"],
    }),

    // Add an intern to round
    addInternToRound: builder.mutation({
      query: ({ internId, ...currentRound }) => {
        return {
          url: `/admin/interns/assign-round?internId=${internId}`,
          method: "PUT",
          body: currentRound,
          credentials: "include",
        };
      },
      invalidatesTags: ["Rounds"],
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
  useLoginMutation,
  useLogoutMutation,
  useApproveAccountMutation,
  useGetUserQuery,
  useGetAllInternsQuery,
  useGetAllSupervisorsQuery,
  useGetAllCoordinatorsQuery,
  useGetSingleSupervisorQuery,
  useGetSingleCoordinatorQuery,
  useGetSingleInternQuery,
  useAddInternToRoundMutation,
  useUploadProfileImageMutation,
  useUploadNationalIDImageMutation,
  useUploadMBBCHCertificateImageMutation,
} = apiSlice;
