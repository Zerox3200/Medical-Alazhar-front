export const courseEndpoints = (builder) => ({
  // Fetch courses
  getCourses: builder.query({
    query: () => ({
      url: `/course`,
      method: "GET",
    }),
    providesTags: ["Course"],
  }),
  // Fetch course
  getCourse: builder.query({
    query: ({ courseId }) => ({
      url: `/course/${courseId}`,
      method: "GET",
    }),
    providesTags: ["Course"],
  }),
  // Fetch Quiz
  getQuiz: builder.query({
    query: ({ courseId, quizId }) => ({
      url: `/courses/${courseId}/quizzes`,
      method: "GET",
      params: { quizId },
      credentials: "include",
    }),
    providesTags: ["Course"],
  }),
  // Fetch Video
  getVideo: builder.query({
    query: ({ courseId, videoId }) => ({
      url: `/courses/${courseId}/videos`,
      method: "GET",
      params: { videoId },
      credentials: "include",
    }),
    providesTags: ["Course"],
  }),

  // Mark video completed
  submitVideoProgress: builder.mutation({
    query: ({ courseId, videoId, isCompleted }) => ({
      url: `/courses/${courseId}/videos/submit`,
      method: "PATCH",
      params: { videoId },
      body: { isCompleted },
    }),
    invalidatesTags: ["Course"],
  }),

  // Mark quiz completed
  submitQuizProgress: builder.mutation({
    query: ({ courseId, quizId, forceRetake, answers }) => ({
      url: `/courses/${courseId}/quizzes/submit`,
      method: "PATCH",
      params: { quizId, forceRetake },
      body: { answers },
    }),
    invalidatesTags: ["Course"],
  }),
});
