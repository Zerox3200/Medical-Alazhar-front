const casesEndpoints = (builder) => ({
  // Get Intern Training Cases
  getCases: builder.query({
    query: () => ({
      url: `/intern/training/cases`,
      method: "GET",
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
    query: ({ roundId, ...caseData }) => ({
      url: "/intern/training/cases/add",
      method: "POST",
      body: caseData,
      params: { roundId },
    }),
    invalidatesTags: ["Cases"],
  }),
  // Edit case
  editCase: builder.mutation({
    query: ({ editMode, internId, caseId, ...caseData }) => ({
      url: `/intern/training/cases/${caseId}`,
      method: "PUT",
      params: { editMode, internId },
      body: caseData,
    }),
    invalidatesTags: ["Cases"],
  }),

  // Delete case
  deleteCase: builder.mutation({
    query: ({ caseId, internId }) => ({
      url: `/intern/training/cases/${caseId}`,
      method: "DELETE",
      params: { internId },
      credentials: "include",
    }),
    invalidatesTags: ["Cases"],
  }),
});

export default casesEndpoints;
