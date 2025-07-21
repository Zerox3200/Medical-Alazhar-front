const internEndpoints = (builder) => ({
  getAdminInterns: builder.query({
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
});

export default internEndpoints;
