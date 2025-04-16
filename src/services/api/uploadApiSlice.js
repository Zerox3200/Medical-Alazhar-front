import { baseApiSlice } from "./baseApiSlice";

export const uploadApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadProfileImage: builder.mutation({
      query: ({ role, userId, imageFile }) => ({
        url: `/${role}/${userId}/uploads/profile-image`,
        method: "POST",
        body: imageFile,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),

    uploadNationalIDImage: builder.mutation({
      query: ({ internId, imageFile }) => ({
        url: `/intern/${internId}/uploads/nationalID-image`,
        method: "POST",
        body: imageFile,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),

    uploadMBBCHCertificateImage: builder.mutation({
      query: ({ internId, imageFile }) => ({
        url: `/intern/${internId}/uploads/mbbch-certificate-image`,
        method: "POST",
        body: imageFile,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useUploadProfileImageMutation,
  useUploadNationalIDImageMutation,
  useUploadMBBCHCertificateImageMutation,
} = uploadApiSlice;
