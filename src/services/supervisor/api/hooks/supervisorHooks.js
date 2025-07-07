import supervisorApiSlice from "..";
export const {
  useGetSupervisorQuery,
  useGetMyInternsQuery,
  useGetMyInternQuery,
  useAcceptTrainingDomainsMutation,
  useGetRoundWavesQuery,
} = supervisorApiSlice;

export const useSupervisor = ({ supervisorId }) => {
  const { data, isError, isFetching, isLoading } = useGetSupervisorQuery({
    supervisorId,
  });

  return {
    supervisorData: data,
    isError,
    isFetching,
    isLoading,
  };
};

export const useSupervisorInterns = ({ supervisorId }) => {
  const { data, isError, isFetching, isLoading } = useGetMyInternsQuery({
    supervisorId,
  });

  return {
    supervisorInternsData: data,
    isError,
    isFetching,
    isLoading,
  };
};
