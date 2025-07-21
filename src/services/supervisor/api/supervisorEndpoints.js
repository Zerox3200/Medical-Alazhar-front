const supervisorEndpoints = (builder) => ({
  getSupervisor: builder.query({
    query: ({ supervisorId }) => ({
      url: `/supervisor/${supervisorId}`,
      method: "GET",
      credentials: "include",
    }),
    providesTags: ["Supervisor"],
  }),
  uploadProfileImage: builder.mutation({
    query: ({ supervisorId, profileImageFile }) => ({
      url: `/supervisor/${supervisorId}/uploads/profile-image`,
      method: "POST",
      body: profileImageFile,
      credentials: "include",
    }),
    invalidatesTags: ["Supervisor"],
  }),
});

export default supervisorEndpoints;
