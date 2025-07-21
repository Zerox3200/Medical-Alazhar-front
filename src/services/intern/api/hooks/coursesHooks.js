import internApiSlice from "..";

export const {
  useGetCoursesQuery,
  useGetCourseQuery,
  useSubmitVideoProgressMutation,
  useSubmitQuizProgressMutation,
  useGetQuizQuery,
  useGetVideoQuery,
} = internApiSlice;

export const useCourses = () => {
  const { data, isLoading, error } = useGetCoursesQuery();

  return {
    courses: data,
    isLoading,
    error,
  };
};
