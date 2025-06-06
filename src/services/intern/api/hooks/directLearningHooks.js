import internApiSlice from "..";

export const {
  useGetDirectLearningsQuery,
  useGetDirectLearningQuery,
  useAddDirectLearningMutation,
  useEditDirectLearningMutation,
  useDeleteDirectLearningMutation,
} = internApiSlice;

export const useDirectLearnings = () => {
  const { data, isLoading, error } = useGetDirectLearningsQuery();

  return {
    directLearnings: data,
    isLoading,
    error,
  };
};
