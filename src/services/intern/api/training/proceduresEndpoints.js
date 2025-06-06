const proceduresEndpoints = (builder) => ({
  // Get  Procedures
  getProcedures: builder.query({
    query: () => ({
      url: `/intern/training/procedures`,
      method: "GET",
      credentials: "include",
    }),
    providesTags: ["Procedures"],
  }),
  // Get Single Procedure
  getProcedure: builder.query({
    query: ({ procedureId }) => ({
      url: `/intern/training/procedures/${procedureId}`,
      method: "GET",
      credentials: "include",
    }),
    providesTags: ["Procedures"],
  }),
  // Add New Procedure
  addProcedure: builder.mutation({
    query: ({ intern, round, ...procedureData }) => ({
      url: "/intern/training/procedures/add",
      method: "POST",
      body: procedureData,
      params: { intern, round },
    }),
    invalidatesTags: ["Procedures"],
  }),
  // Edit procedure
  editProcedure: builder.mutation({
    query: ({ editMode, procedureId, ...procedureData }) => ({
      url: `/intern/training/procedures/${procedureId}`,
      method: "PUT",
      params: { editMode },
      body: procedureData,
    }),
    invalidatesTags: ["Procedures"],
  }),
  // Delete procedure
  deleteProcedure: builder.mutation({
    query: ({ procedureId }) => ({
      url: `/intern/training/procedures/${procedureId}`,
      method: "DELETE",
      credentials: "include",
    }),
    invalidatesTags: ["Procedures"],
  }),
});

export default proceduresEndpoints;
