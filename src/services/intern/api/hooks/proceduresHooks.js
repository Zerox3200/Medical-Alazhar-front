import internApiSlice from "..";

export const {
  useGetProceduresQuery,
  useGetProcedureQuery,
  useAddProcedureMutation,
  useEditProcedureMutation,
  useDeleteProcedureMutation,
} = internApiSlice;

export const useProcedures = (filters) => {
  const { data, isLoading, isError } = useGetProceduresQuery(filters);

  return {
    procedures: data,
    isLoading,
    isError,
  };
};
