import { baseApiSlice } from "./baseApiSlice";

export const uploadApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadInternProfileImage: builder.mutation({
      query: ({ role, userId, imageFile }) => ({
        url: `/${role}/${userId}/uploads/profile-image`,
        method: "POST",
        body: imageFile,
        credentials: "include",
      }),
      invalidatesTags: ["Intern", "Admin"],
    }),

    uploadNationalIDImage: builder.mutation({
      query: ({ internId, imageFile }) => ({
        url: `/intern/${internId}/uploads/nationalID-image`,
        method: "POST",
        body: imageFile,
        credentials: "include",
      }),
      invalidatesTags: ["Intern"],
    }),

    uploadMBBCHCertificateImage: builder.mutation({
      query: ({ internId, imageFile }) => ({
        url: `/intern/${internId}/uploads/mbbch-certificate-image`,
        method: "POST",
        body: imageFile,
        credentials: "include",
      }),
      invalidatesTags: ["Intern"],
    }),
  }),
});

export const {
  useUploadInternProfileImageMutation,
  useUploadNationalIDImageMutation,
  useUploadMBBCHCertificateImageMutation,
} = uploadApiSlice;
