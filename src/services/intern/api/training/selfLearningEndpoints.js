const selfLearningEndpoints = (builder) => ({
  // Get All Self Learning Activities
  getSelfLearnings: builder.query({
    query: () => ({
      url: `/intern/training/self-learning-activities`,
      method: "GET",
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
  editSelfLearning: builder.mutation({
    query: ({ editMode, activityId, ...activityData }) => ({
      url: `/intern/training/self-learning-activities/${activityId}`,
      method: "PUT",
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
