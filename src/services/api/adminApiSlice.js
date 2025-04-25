import { baseApiSlice } from "./baseApiSlice";

export const adminApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get admin data
    getAdmin: builder.query({
      query: ({ adminId }) => ({
        url: `/admin/${adminId}/profile`,
        method: "GET",
        credentials: "include",
      }),
      transformErrorResponse: (response) =>
        response.data?.error || "Unknown error",
      providesTags: ["Admin"],
    }),

    // Approve new account
    approveAccount: builder.mutation({
      query: ({ userId, ...approved }) => ({
        url: `admin/accounts/${userId}/approvals`,
        method: "PATCH",
        body: approved,
        credentials: "include",
      }),
      invalidatesTags: ["Account"],
    }),

    // Get not approved users
    getNotApprovedUsers: builder.query({
      query: () => ({
        url: `admin/accounts/approvals`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Account"],
    }),

    // Profile Image Upload
    uploadAdminProfileImage: builder.mutation({
      query: ({ adminId, imageFile }) => ({
        url: `/admin/${adminId}/uploads/profile`,
        method: "POST",
        body: imageFile,
        credentials: "include",
      }),
      invalidatesTags: ["Admin"],
    }),
    /***************************************/
    // Admin management endpoints
    getAllSupervisors: builder.query({
      query: (params = {}) => ({
        url: "/admin/supervisors",
        method: "GET",
        params,
        credentials: "include",
      }),
      providesTags: ["Supervisor"],
    }),

    getAllCoordinators: builder.query({
      query: () => ({
        url: "/admin/coordinators",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Account"],
    }),

    getAllInterns: builder.query({
      query: () => ({
        url: "/admin/interns",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Account", "Rounds"],
    }),

    getSingleIntern: builder.query({
      query: ({ internId }) => ({
        url: `/admin/interns/${internId}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Intern"],
    }),

    getSingleSupervisor: builder.query({
      query: ({ supervisorId }) => ({
        url: `/admin/supervisors/${supervisorId}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Supervisor"],
    }),

    getSingleCoordinator: builder.query({
      query: ({ coordinatorId }) => ({
        url: `/admin/coordinators/${coordinatorId}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Coordinator"],
    }),

    addInternToRound: builder.mutation({
      query: ({ internId, ...currentRound }) => ({
        url: `/admin/interns/assign-round?internId=${internId}`,
        method: "PUT",
        body: currentRound,
        credentials: "include",
      }),
      invalidatesTags: ["Rounds"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAdminQuery,
  useGetNotApprovedUsersQuery,
  useGetAllSupervisorsQuery,
  useGetAllCoordinatorsQuery,
  useGetAllInternsQuery,
  useGetSingleInternQuery,
  useGetSingleSupervisorQuery,
  useGetSingleCoordinatorQuery,
  useApproveAccountMutation,
  useAddInternToRoundMutation,
} = adminApiSlice;
