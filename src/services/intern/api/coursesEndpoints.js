export const coursesEndpoints = (builder) => ({
  // Fetch courses
  getCourses: builder.query({
    query: () => ({
      url: `/intern/courses`,
      method: "GET",
      credentials: "include",
    }),
    providesTags: ["Course"],
  }),
  // Fetch course
  getCourse: builder.query({
    query: ({ courseId }) => ({
      url: `/intern/courses/${courseId}`,
      method: "GET",
      credentials: "include",
    }),
    providesTags: ["Course"],
  }),
  // Fetch Quiz
  getQuiz: builder.query({
    query: ({ courseId, quizId }) => ({
      url: `/intern/courses/${courseId}/quizzes`,
      method: "GET",
      params: { quizId },
      credentials: "include",
    }),
    providesTags: ["Course"],
  }),
  // Fetch Video
  getVideo: builder.query({
    query: ({ courseId, videoId }) => ({
      url: `/intern/courses/${courseId}/videos`,
      method: "GET",
      params: { videoId },
      credentials: "include",
    }),
    providesTags: ["Course"],
  }),

  // Mark video completed
  submitVideoProgress: builder.mutation({
    query: ({ courseId, videoId, isCompleted }) => ({
      url: `/intern/courses/${courseId}/videos/submit`,
      method: "PATCH",
      params: { videoId },
      body: { isCompleted },
    }),
    invalidatesTags: ["Course"],
  }),

  // Mark quiz completed
  submitQuizProgress: builder.mutation({
    query: ({ courseId, quizId, forceRetake, answers }) => ({
      url: `/intern/courses/${courseId}/quizzes/submit`,
      method: "PATCH",
      params: { quizId, forceRetake },
      body: { answers },
    }),
    invalidatesTags: ["Course"],
  }),
});
