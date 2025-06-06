import internApiSlice from "..";

export const {
  useGetProceduresQuery,
  useGetProcedureQuery,
  useAddProcedureMutation,
  useEditProcedureMutation,
  useDeleteProcedureMutation,
} = internApiSlice;

export const useProcedures = () => {
  const { data, isLoading, error } = useGetProceduresQuery();

  return {
    procedures: data,
    isLoading,
    error,
  };
};
