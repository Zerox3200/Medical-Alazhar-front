import adminApiSlice from "..";

export const {
  useGetAdminSupervisorsQuery,
  useGetAdminSupervisorQuery,
  useChangeSupervisorRoleMutation,
} = adminApiSlice;

export const useAdminSupervisors = (filters) => {
  const { data, isError, isFetching, isLoading } =
    useGetAdminSupervisorsQuery(filters);

  return {
    supervisors: data,
    isError,
    isFetching,
    isLoading,
  };
};
