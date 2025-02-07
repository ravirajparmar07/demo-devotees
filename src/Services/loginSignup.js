import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const loginSignup = createApi({
  reducerPath: "loginSignup",
  baseQuery,
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
    refreshToken: builder.mutation({
      query: (refreshToken) => ({
        url: "api/users/refresh-token/",
        method: "POST",
        body: { refreshToken },
      }),
    }),
  }),
});

export const {
  useSetPasswordMutation,
  useResetPasswordMutation,
  useLoginUserMutation,
  useRegisterUserMutation,
  useRefreshTokenMutation,
} = loginSignup;
