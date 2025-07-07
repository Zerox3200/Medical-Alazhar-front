const casesEndpoints = (builder) => ({
  // Get Intern Training Cases
  getCases: builder.query({
    query: ({ filters }) => ({
      url: `/intern/training/cases`,
      method: "GET",
      params: filters,
      credentials: "include",
    }),
    providesTags: ["Cases"],
  }),
  // Get Intern Training Cases
  getCase: builder.query({
    query: ({ caseId }) => ({
      url: `/intern/training/cases/${caseId}`,
      method: "GET",
      credentials: "include",
    }),
    providesTags: ["Cases"],
  }),
  // Add New Case
  addCase: builder.mutation({
    query: ({ ...caseData }) => ({
      url: "/intern/training/cases/add",
      method: "POST",
      body: caseData,
    }),
    invalidatesTags: ["Cases"],
  }),
  // Edit case
  editCase: builder.mutation({
    query: ({ editMode, caseId, ...caseData }) => ({
      url: `/intern/training/cases/${caseId}`,
      method: "PATCH",
      params: { editMode },
      body: caseData,
    }),
    invalidatesTags: ["Cases"],
  }),

  // Delete case
  deleteCase: builder.mutation({
    query: ({ caseId }) => ({
      url: `/intern/training/cases/${caseId}`,
      method: "DELETE",
      credentials: "include",
    }),
    invalidatesTags: ["Cases"],
  }),
});

export default casesEndpoints;
