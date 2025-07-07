const supervisorEndpoints = (builder) => ({
  getAdminSupervisors: builder.query({
    query: (params = {}) => ({
      url: "/admin/supervisors",
      method: "GET",
      params,
      credentials: "include",
    }),
    providesTags: ["Supervisor"],
  }),

  getAdminSupervisor: builder.query({
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
});

export default supervisorEndpoints;
