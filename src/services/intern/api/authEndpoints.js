const authEndpoints = (builder) => ({
  // Signup
  internSignup: builder.mutation({
    query: (formData) => ({
      url: "/intern/auth/signup",
      method: "POST",
      body: formData,
    }),
  }),
  // Get Intern Data
  getIntern: builder.query({
    query: ({ userRole, userId, internId }) => ({
      url: `/intern/${internId}`,
      method: "GET",
      params: { userRole, userId },
      credentials: "include",
    }),
    providesTags: ["Intern", "Course"],
  }),
});

export default authEndpoints;
