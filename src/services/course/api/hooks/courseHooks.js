import courseApiSlice from "..";

export const {
  useGetCoursesQuery,
  useGetCourseQuery,
  useSubmitVideoProgressMutation,
  useSubmitQuizProgressMutation,
  useGetQuizQuery,
  useGetVideoQuery,
} = courseApiSlice;

export const useCourses = () => {
  const { data, isLoading, error } = useGetCoursesQuery();

  return {
    courses: data,
    isLoading,
    error,
  };
};
