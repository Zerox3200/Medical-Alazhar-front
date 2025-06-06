import internApiSlice from "..";

export const {
  useGetSelfLearningsQuery,
  useGetSelfLearningQuery,
  useAddSelfLearningMutation,
  useEditSelfLearningMutation,
  useDeleteSelfLearningMutation,
} = internApiSlice;

export const useSelfLearnings = () => {
  const { data, isLoading, error } = useGetSelfLearningsQuery();

  return {
    selfLearnings: data,
    isLoading,
    error,
  };
};
