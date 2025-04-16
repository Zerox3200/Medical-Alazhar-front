import { baseApiSlice } from "./baseApiSlice";

export const internApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    internSignup: builder.mutation({
      query: (formData) => ({
        url: "/intern/auth/signup",
        method: "POST",
        body: formData,
      }),
    }),

    getInternProfile: builder.query({
      query: (internId) => ({
        url: `/intern/${internId}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useInternSignupMutation, useGetInternProfileQuery } =
  internApiSlice;
