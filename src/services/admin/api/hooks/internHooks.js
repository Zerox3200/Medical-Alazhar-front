import adminApiSlice from "..";

export const {
  useGetAdminInternsQuery,
  useGetSingleInternQuery,
  useAddInternToRoundMutation,
} = adminApiSlice;

export const useAdminInterns = (filters) => {
  const { data, isError, isFetching, isLoading } =
    useGetAdminInternsQuery(filters);

  return {
    interns: data,
    isError,
    isFetching,
    isLoading,
  };
};
