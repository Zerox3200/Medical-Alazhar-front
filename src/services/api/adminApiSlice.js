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

    getAllSupervisors: builder.query({
      query: (params = {}) => ({
        url: "/admin/supervisors",
        method: "GET",
        params,
        credentials: "include",
      }),
      providesTags: ["Supervisor"],
    }),

    getSingleSupervisor: builder.query({
      query: ({ supervisorId }) => ({
        url: `/admin/supervisors/${supervisorId}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Supervisor"],
    }),

    changeSupervisorRole: builder.mutation({
      query: ({ supervisorId, ...role }) => ({
        url: `/admin/supervisors/${supervisorId}/role`,
        method: "PATCH",
        body: role,
        credentials: "include",
      }),
      invalidatesTags: ["Supervisor"],
    }),

    /******************************** Rounds ********************************/

    createNewRound: builder.mutation({
      query: (roundData) => ({
        url: "/admin/rounds/create",
        method: "POST",
        body: roundData,
        credentials: "include",
      }),
      invalidatesTags: ["Round"],
    }),

    getAllRounds: builder.query({
      query: (params = {}) => ({
        url: `/admin/rounds`,
        method: "GET",
        params,
        credentials: "include",
      }),
      providesTags: ["Round"],
    }),

    getRound: builder.query({
      query: ({ roundId }) => ({
        url: `/admin/rounds/${roundId}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Round"],
    }),
    /***************************************/
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

    addInternToRound: builder.mutation({
      query: ({ internId, ...currentRound }) => ({
        url: `/admin/interns/assign-round?internId=${internId}`,
        method: "PUT",
        body: currentRound,
        credentials: "include",
      }),
      invalidatesTags: ["Rounds"],
    }),
    /******************************** Cases ********************************/
    // getAllCases: builder.query({
    //   query: () => ({
    //     url: `/admin/interns/training/cases`,
    //     method: "GET",
    //     credentials: "include",
    //   }),
    //   providesTags: ["Cases"],
    // }),
  }),
  overrideExisting: false,
});

export const {
  useGetAdminQuery,
  useGetNotApprovedUsersQuery,
  useGetAllSupervisorsQuery,
  useGetSingleSupervisorQuery,
  useChangeSupervisorRoleMutation,
  useCreateNewRoundMutation,
  useGetAllRoundsQuery,
  useGetRoundQuery,
  useGetAllInternsQuery,
  useGetSingleInternQuery,
  useApproveAccountMutation,
  useAddInternToRoundMutation,
  // useGetAllCasesQuery,
} = adminApiSlice;
