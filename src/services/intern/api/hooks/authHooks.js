import internApiSlice from "..";

export const { useInternSignupMutation, useGetInternQuery } = internApiSlice;

export const useInternSignup = () => {};

export const useIntern = ({ userRole, userId, internId }) => {
  const { data, isLoading, error, isSuccess } = useGetInternQuery({
    userRole,
    userId,
    internId,
  });

  return { internData: data, isLoading, error, isSuccess };
};
