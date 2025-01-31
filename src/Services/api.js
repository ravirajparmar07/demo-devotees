import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.1.238:8000/",
  }),
  endpoints: (builder) => ({}),
});

export const { useRegisterUserMutation } = api;
