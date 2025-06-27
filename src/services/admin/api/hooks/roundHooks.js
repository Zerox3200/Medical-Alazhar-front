import adminApiSlice from "..";

export const { useGetRoundsQuery, useGetRoundQuery, useCreateRoundMutation } =
  adminApiSlice;

export const useRounds = (filters) => {
  const { data, isError, isFetching, isLoading } = useGetRoundsQuery(filters);

  return {
    cases: data,
    isError,
    isFetching,
    isLoading,
  };
};
