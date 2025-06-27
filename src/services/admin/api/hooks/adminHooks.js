import adminApiSlice from "..";
export const {
  useGetAdminQuery,
  useApproveAccountMutation,
  useGetNotApprovedUsersQuery,
  useUploadAdminProfileImageMutation,
} = adminApiSlice;

export const useAdmin = (filters) => {
  const { data, isError, isFetching, isLoading } = useGetAdminQuery(filters);

  return {
    adminData: data,
    isError,
    isFetching,
    isLoading,
  };
};
