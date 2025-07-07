const internEndpoints = (builder) => ({
  getMyInterns: builder.query({
    query: ({ supervisorId }) => ({
      url: `/supervisor/${supervisorId}/interns`,
      method: "GET",
      credentials: "include",
    }),
    providesTags: ["Supervisor_Interns_Domain_Review"],
  }),
  getMyIntern: builder.query({
    query: ({ supervisorId, internId }) => ({
      url: `/supervisor/${supervisorId}/interns/${internId}`,
      method: "GET",
      credentials: "include",
    }),
    providesTags: ["Supervisor_Interns_Domain_Review"],
  }),
  acceptTrainingDomains: builder.mutation({
    query: ({
      supervisorId,
      internId,
      domainType,
      domainId,
      updatedState,
    }) => ({
      url: `/supervisor/${supervisorId}/interns/${internId}/training-domains/review`,
      method: "PATCH",
      credentials: "include",
      body: updatedState,
      params: { domainType, domainId },
    }),
    invalidatesTags: ["Supervisor_Interns_Domain_Review"],
  }),
  getRoundWaves: builder.query({
    query: ({ supervisorId, roundId }) => ({
      url: `/supervisor/${supervisorId}/waves`,
      method: "GET",
      params: { roundId },
      credentials: "include",
    }),
    providesTags: ["Waves"],
  }),
});

export default internEndpoints;
