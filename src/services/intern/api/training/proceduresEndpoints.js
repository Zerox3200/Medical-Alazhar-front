const proceduresEndpoints = (builder) => ({
  // Get  Procedures
  getProcedures: builder.query({
    query: ({ filters }) => ({
      url: `/intern/training/procedures`,
      method: "GET",
      params: filters,
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
    query: ({ ...procedureData }) => ({
      url: "/intern/training/procedures/add",
      method: "POST",
      body: procedureData,
    }),
    invalidatesTags: ["Procedures"],
  }),
  // Edit procedure
  editProcedure: builder.mutation({
    query: ({ editMode, procedureId, ...procedureData }) => ({
      url: `/intern/training/procedures/${procedureId}`,
      method: "PATCH",
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
