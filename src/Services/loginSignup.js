import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const loginSignup = createApi({
  reducerPath: "loginSignup",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (userData) => ({
        url: "api/users/login/",
        method: "POST",
        body: userData,
      }),
    }),
    setPassword: builder.mutation({
      query: (passwordData) => ({
        url: "api/users/set-password/",
        method: "PUT",
        body: passwordData,
      }),
    }),
    resetPassword: builder.mutation({
      query: (passwordData) => ({
        url: "api/users/reset-password/",
        method: "POST",
        body: passwordData,
      }),
    }),
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "api/users/register/",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const {
  useSetPasswordMutation,
  useResetPasswordMutation,
  useLoginUserMutation,
  useRegisterUserMutation,
} = loginSignup;
