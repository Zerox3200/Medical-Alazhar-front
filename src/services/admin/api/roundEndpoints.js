const roundEndpoints = (builder) => ({
  createRound: builder.mutation({
    query: (roundData) => ({
      url: "/admin/rounds/create",
      method: "POST",
      body: roundData,
      credentials: "include",
    }),
    invalidatesTags: ["Round"],
  }),

  getRounds: builder.query({
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
});

export default roundEndpoints;
