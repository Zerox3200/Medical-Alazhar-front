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
    // Get Intern Training Cases
    getSingleCase: builder.query({
      query: ({ caseId }) => ({
        url: `/intern/training/cases/${caseId}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Cases"],
    }),
    // Add New Case
    addNewCase: builder.mutation({
      query: ({ intern, round, ...caseData }) => ({
        url: "/intern/training/cases/add",
        method: "POST",
        body: caseData,
        params: { intern, round },
      }),
      invalidatesTags: ["Cases"],
    }),
    // Edit case
    editCase: builder.mutation({
      query: ({ editMode, caseId, ...caseData }) => ({
        url: `/intern/training/cases/:${caseId}`,
        method: "PUT",
        params: editMode,
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
  useGetSingleCaseQuery,
  useAddNewCaseMutation,
  useEditCaseMutation,
  useGetAllProceduresQuery,
  useAddNewProcedureMutation,
} = internApiSlice;
