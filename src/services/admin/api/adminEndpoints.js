const adminEndpoints = (builder) => ({
  // Get admin data
  getAdmin: builder.query({
    query: ({ adminId }) => ({
      url: `/admin/${adminId}/profile`,
      method: "GET",
      credentials: "include",
    }),
    transformErrorResponse: (response) =>
      response.data?.error || "Unknown error",
    providesTags: ["Admin"],
  }),

  // Approve new account
  approveAccount: builder.mutation({
    query: ({ userId, ...approved }) => ({
      url: `admin/accounts/${userId}/approvals`,
      method: "PATCH",
      body: approved,
      credentials: "include",
    }),
    invalidatesTags: ["Account"],
  }),

  // Get not approved users
  getNotApprovedUsers: builder.query({
    query: () => ({
      url: `admin/accounts/approvals`,
      method: "GET",
      credentials: "include",
    }),
    providesTags: ["Account"],
  }),

  // Profile Image Upload
  uploadAdminProfileImage: builder.mutation({
    query: ({ adminId, imageFile }) => ({
      url: `/admin/${adminId}/uploads/profile`,
      method: "POST",
      body: imageFile,
      credentials: "include",
    }),
    invalidatesTags: ["Admin"],
  }),
});

export default adminEndpoints;
