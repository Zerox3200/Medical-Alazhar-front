import adminApiSlice from "..";

export const {
  useGetSupervisorsQuery,
  useGetSupervisorQuery,
  useChangeSupervisorRoleMutation,
} = adminApiSlice;

export const useSupervisors = (filters) => {
  const { data, isError, isFetching, isLoading } =
    useGetSupervisorsQuery(filters);

  return {
    supervisors: data,
    isError,
    isFetching,
    isLoading,
  };
};
