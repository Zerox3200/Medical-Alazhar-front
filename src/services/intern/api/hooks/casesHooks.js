import internApiSlice from "..";

export const {
  useGetCasesQuery,
  useGetCaseQuery,
  useAddCaseMutation,
  useDeleteCaseMutation,
  useEditCaseMutation,
} = internApiSlice;

export const useCases = (filters) => {
  const { data, isError, isFetching, isLoading } = useGetCasesQuery(filters);

  return {
    cases: data,
    isError,
    isFetching,
    isLoading,
  };
};
