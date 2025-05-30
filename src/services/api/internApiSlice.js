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
      query: ({ internId }) => ({
        url: `/intern/training/cases`,
        method: "GET",
        params: { internId },
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
    /*****************************Procedures****************************/
    // Get  Procedures
    getAllProcedures: builder.query({
      query: () => ({
        url: `/intern/training/procedures`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Procedures"],
    }),
    // Get Single Procedure
    getSignleProcedure: builder.query({
      query: ({ procedureId }) => ({
        url: `/intern/training/procedures/${procedureId}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Procedures"],
    }),
    // Add New Procedure
    addNewProcedure: builder.mutation({
      query: ({ intern, round, ...procedureData }) => ({
        url: "/intern/training/procedures/add",
        method: "POST",
        body: procedureData,
        params: { intern, round },
      }),
      invalidatesTags: ["Procedures"],
    }),
    // Edit procedure
    editProcedure: builder.mutation({
      query: ({ editMode, procedureId, ...procedureData }) => ({
        url: `/intern/training/procedures/${procedureId}`,
        method: "PUT",
        params: { editMode },
        body: procedureData,
      }),
      invalidatesTags: ["Procedures"],
    }),
    // Delete procedure
    deleteProcedure: builder.mutation({
      query: ({ procedureId }) => ({
        url: `/intern/training/procedures/${procedureId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Procedures"],
    }),
    /*************************SELF_LEARNING_ACTIVITY*************************/
    // Get All Self Learning Activities
    getAllSelfLearningActivities: builder.query({
      query: () => ({
        url: `/intern/training/self-learning-activities`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Self_Learning_Activity"],
    }),
    // Get Single Self Learning Activity
    getSignleSelfLearningActivity: builder.query({
      query: ({ activityId }) => ({
        url: `/intern/training/self-learning-activities/${activityId}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Self_Learning_Activity"],
    }),
    // Add New Self Learning Activity
    addNewSelfLearningActivity: builder.mutation({
      query: ({ intern, round, ...activitiyData }) => ({
        url: "/intern/training/self-learning-activities/add",
        method: "POST",
        params: { intern, round },
        body: activitiyData,
        formData: true,
      }),
      invalidatesTags: ["Self_Learning_Activity"],
    }),
    // Edit Self Learning Activity
    editSelfLearningActivity: builder.mutation({
      query: ({ editMode, activityId, ...activityData }) => ({
        url: `/intern/training/self-learning-activities/${activityId}`,
        method: "PUT",
        params: { editMode },
        body: activityData,
      }),
      invalidatesTags: ["Self_Learning_Activity"],
    }),
    // Delete Self Learning Activity
    deleteSelfLearningActivity: builder.mutation({
      query: ({ activityId }) => ({
        url: `/intern/training/self-learning-activities/${activityId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Self_Learning_Activity"],
    }),
    /*************************DIRECT_LEARNING_ACTIVITY*************************/
    // Get All Direct Learning Activities
    getAllDirectLearningActivities: builder.query({
      query: () => ({
        url: `/intern/training/direct-learning-activities`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["direct_Learning_Activity"],
    }),
    // Get Single Direct Learning Activity
    getSignleDirectLearningActivity: builder.query({
      query: ({ activityId }) => ({
        url: `/intern/training/direct-learning-activities/${activityId}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["direct_Learning_Activity"],
    }),
    // Add New Direct Learning Activity
    addNewDirectLearningActivity: builder.mutation({
      query: ({ intern, round, ...activitiyData }) => ({
        url: "/intern/training/direct-learning-activities/add",
        method: "POST",
        body: activitiyData,
        params: { intern, round },
      }),
      invalidatesTags: ["direct_Learning_Activity"],
    }),
    // Edit Direct Learning Activity
    editDirectLearningActivity: builder.mutation({
      query: ({ editMode, activityId, ...activityData }) => ({
        url: `/intern/training/direct-learning-activities/${activityId}`,
        method: "PUT",
        params: { editMode },
        body: activityData,
      }),
      invalidatesTags: ["direct_Learning_Activity"],
    }),
    // Delete Direct Learning Activity
    deleteDirectLearningActivity: builder.mutation({
      query: ({ activityId }) => ({
        url: `/intern/training/direct-learning-activities/${activityId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["direct_Learning_Activity"],
    }),
  }),
});

export const {
  useInternSignupMutation,
  useGetInternQuery,
  useGetAllCasesQuery,
  useGetSingleCaseQuery,
  useAddNewCaseMutation,
  useDeleteCaseMutation,
  useEditCaseMutation,
  useGetAllProceduresQuery,
  useGetSignleProcedureQuery,
  useAddNewProcedureMutation,
  useEditProcedureMutation,
  useDeleteProcedureMutation,
  useGetAllSelfLearningActivitiesQuery,
  useGetSignleSelfLearningActivityQuery,
  useAddNewSelfLearningActivityMutation,
  useEditSelfLearningActivityMutation,
  useDeleteSelfLearningActivityMutation,
  useGetAllDirectLearningActivitiesQuery,
  useGetSignleDirectLearningActivityQuery,
  useAddNewDirectLearningActivityMutation,
  useEditDirectLearningActivityMutation,
  useDeleteDirectLearningActivityMutation,
} = internApiSlice;
