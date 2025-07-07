const supervisorEndpoints = (builder) => ({
  getSupervisor: builder.query({
    query: ({ supervisorId }) => ({
      url: `/supervisor/${supervisorId}`,
      method: "GET",
      credentials: "include",
    }),
    providesTags: ["Supervisor"],
  }),
});

export default supervisorEndpoints;
