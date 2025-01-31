import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const myprofile = createApi({
  reducerPath: "myprofile",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  endpoints: (builder) => ({
    profileData: builder.query({
      query: (token) => ({
        url: "api/users/user-profile/",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    updateProfile: builder.mutation({
      query: ({ token, profileData }) => ({
        url: "api/users/update/",
        method: "PATCH",
        body: profileData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    updateProfilePicture: builder.mutation({
      query: ({ token, profileData }) => ({
        url: "api/users/update-profile-picture/",
        method: "PUT",
        body: profileData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    updatePassword: builder.mutation({
      query: ({ token, oldpassword, newpassword }) => ({
        url: "api/users/update/",
        method: "PATCH",
        body: { oldpassword, newpassword },
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
