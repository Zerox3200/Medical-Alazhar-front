import internApiSlice from "..";

export const {
  useGetSelfLearningsQuery,
  useGetSelfLearningQuery,
  useAddSelfLearningMutation,
  useEditSelfLearningMutation,
  useDeleteSelfLearningMutation,
} = internApiSlice;

export const useSelfLearnings = (filters) => {
  const { data, isLoading, isError } = useGetSelfLearningsQuery(filters);

  return {
    selfLearnings: data,
    isLoading,
    isError,
  };
};
