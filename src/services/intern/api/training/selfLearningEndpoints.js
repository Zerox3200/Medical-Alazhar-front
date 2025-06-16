const selfLearningEndpoints = (builder) => ({
  // Get All Self Learning Activities
  getSelfLearnings: builder.query({
    query: ({ filters }) => ({
      url: `/intern/training/self-learning-activities`,
      method: "GET",
      params: filters,
      credentials: "include",
    }),
    providesTags: ["Self_Learning_Activity"],
  }),
  // Get Single Self Learning Activity
  getSelfLearning: builder.query({
    query: ({ activityId }) => ({
      url: `/intern/training/self-learning-activities/${activityId}`,
      method: "GET",
      credentials: "include",
    }),
    providesTags: ["Self_Learning_Activity"],
  }),
  // Add New Self Learning Activity
  addSelfLearning: builder.mutation({
    query: ({ roundId, formData }) => ({
      url: "/intern/training/self-learning-activities/add",
      method: "POST",
      params: { roundId },
      body: formData,
    }),
    invalidatesTags: ["Self_Learning_Activity"],
  }),
  // Edit Self Learning Activity
  editSelfLearning: builder.mutation({
    query: ({ editMode, activityId, ...activityData }) => ({
      url: `/intern/training/self-learning-activities/${activityId}`,
      method: "PATCH",
      params: { editMode },
      body: activityData,
    }),
    invalidatesTags: ["Self_Learning_Activity"],
  }),
  // Delete Self Learning Activity
  deleteSelfLearning: builder.mutation({
    query: ({ activityId }) => ({
      url: `/intern/training/self-learning-activities/${activityId}`,
      method: "DELETE",
      credentials: "include",
    }),
    invalidatesTags: ["Self_Learning_Activity"],
  }),
});

export default selfLearningEndpoints;
