import internApiSlice from "..";

export const {
  useGetDirectLearningsQuery,
  useGetDirectLearningQuery,
  useAddDirectLearningMutation,
  useEditDirectLearningMutation,
  useDeleteDirectLearningMutation,
} = internApiSlice;

export const useDirectLearnings = (filters) => {
  const { data, isLoading, error } = useGetDirectLearningsQuery(filters);

  return {
    directLearnings: data,
    isLoading,
    error,
  };
};
