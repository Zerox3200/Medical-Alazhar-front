import { baseApiSlice } from "./baseApiSlice";

export const internApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
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
      query: ({ internId }) => ({
        url: `/intern/${internId}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Intern", "Course"],
    }),
    // Get Intern Training Cases
    getAllCases: builder.query({
      query: () => ({
        url: `/intern/training/cases`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Cases"],
    }),
    // Add New Case
    addNewCase: builder.mutation({
      query: ({ ...caseData }) => ({
        url: "/intern/training/cases/add",
        method: "POST",
        body: caseData,
      }),
      invalidatesTags: ["Cases"],
    }),
    // Get Intern Training Procedures
    getAllProcedures: builder.query({
      query: () => ({
        url: `/intern/training/procedures`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Procedures"],
    }),
    // Add New Procedure
    addNewProcedure: builder.mutation({
      query: ({ ...procedureData }) => ({
        url: "/intern/training/procedures/add",
        method: "POST",
        body: procedureData,
      }),
      invalidatesTags: ["Procedures"],
    }),
  }),
});

export const {
  useInternSignupMutation,
  useGetInternQuery,
  useGetAllCasesQuery,
  useAddNewCaseMutation,
  useGetAllProceduresQuery,
  useAddNewProcedureMutation,
} = internApiSlice;
