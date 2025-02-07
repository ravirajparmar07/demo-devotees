import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const myprofile = createApi({
  reducerPath: "myprofile",
  baseQuery,
  endpoints: (builder) => ({
    profileData: builder.query({
      query: () => ({
        url: "api/users/user-profile/",
      }),
    }),
    updateProfile: builder.mutation({
      query: ({ profileData }) => ({
        url: "api/users/update/",
        method: "PATCH",
        body: profileData,
      }),
    }),
    updateProfilePicture: builder.mutation({
      query: ({ profileData }) => ({
        url: "api/users/update-profile-picture/",
        method: "PUT",
        body: profileData,
      }),
    }),
    updatePassword: builder.mutation({
      query: ({ oldpassword, newpassword }) => ({
        url: "api/users/update/",
        method: "PATCH",
        body: { oldpassword, newpassword },
      }),
    }),
  }),
});

export const {
  useProfileDataQuery,
  useUpdateProfileMutation,
  useUpdateProfilePictureMutation,
  useUpdatePasswordMutation,
} = myprofile;
