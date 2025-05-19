import { clearAuth } from "../slices/authSlice";
import { baseApiSlice } from "./baseApiSlice";

export const authApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Login
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),

    // Logout
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
        credentials: "include",
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(clearAuth());
          dispatch(baseApiSlice.util.resetApiState());
        } catch (error) {
          console.error("Logout failed:", error);
        }
      },
    }),

    // Change password
    changePassword: builder.mutation({
      query: ({ userId, ...credentials }) => ({
        url: `/auth/${userId}/password/change`,
        method: "PATCH",
        body: credentials,
        credentials: "include",
      }),
    }),

    getUser: builder.query({
      query: ({ userId, role }) => ({
        url:
          ((role === "supervisor" || role === "coordinator") &&
            `/supervisor/${userId}`) ||
          (role === "intern" && `/intern/${userId}`),
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useChangePasswordMutation,
  useGetUserQuery,
} = authApiSlice;
