const directLearningEndpoints = (builder) => ({
  // Get All Direct Learning Activities
  getDirectLearnings: builder.query({
    query: ({ filters }) => ({
      url: `/intern/training/direct-learning-activities`,
      method: "GET",
      params: filters,
      credentials: "include",
    }),
    providesTags: ["direct_Learning_Activity"],
  }),
  // Get Single Direct Learning Activity
  getDirectLearning: builder.query({
    query: ({ activityId }) => ({
      url: `/intern/training/direct-learning-activities/${activityId}`,
      method: "GET",
      credentials: "include",
    }),
    providesTags: ["direct_Learning_Activity"],
  }),
  // Add New Direct Learning Activity
  addDirectLearning: builder.mutation({
    query: ({ roundId, ...activitiyData }) => ({
      url: "/intern/training/direct-learning-activities/add",
      method: "POST",
      body: activitiyData,
      params: { roundId },
    }),
    invalidatesTags: ["direct_Learning_Activity"],
  }),
  // Edit Direct Learning Activity
  editDirectLearning: builder.mutation({
    query: ({ editMode, activityId, ...activityData }) => ({
      url: `/intern/training/direct-learning-activities/${activityId}`,
      method: "PATCH",
      params: { editMode },
      body: activityData,
    }),
    invalidatesTags: ["direct_Learning_Activity"],
  }),
  // Delete Direct Learning Activity
  deleteDirectLearning: builder.mutation({
    query: ({ activityId }) => ({
      url: `/intern/training/direct-learning-activities/${activityId}`,
      method: "DELETE",
      credentials: "include",
    }),
    invalidatesTags: ["direct_Learning_Activity"],
  }),
});

export default directLearningEndpoints;
