import internApiSlice from "..";

export const {
  useGetCasesQuery,
  useGetCaseQuery,
  useAddCaseMutation,
  useDeleteCaseMutation,
  useEditCaseMutation,
} = internApiSlice;

export const useCases = () => {
  const { data, error, isLoading } = useGetCasesQuery();

  return {
    cases: data,
    error,
    isLoading,
  };
};
