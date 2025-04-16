import { baseApiSlice } from "./baseApiSlice";

export const adminApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Admin management endpoints
    getAllSupervisors: builder.query({
      query: () => ({
        url: "/admin/supervisors",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Account"],
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

    approveAccount: builder.mutation({
      query: ({ userId, ...approved }) => ({
        url: `/admin/account-status/${userId}`,
        method: "PUT",
        body: approved,
        credentials: "include",
      }),
      invalidatesTags: ["Account"],
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
});

export const {
  useGetAllSupervisorsQuery,
  useGetAllCoordinatorsQuery,
  useGetAllInternsQuery,
  useGetSingleInternQuery,
  useGetSingleSupervisorQuery,
  useGetSingleCoordinatorQuery,
  useApproveAccountMutation,
  useAddInternToRoundMutation,
} = adminApiSlice;
