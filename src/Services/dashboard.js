import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dashboard = createApi({
  reducerPath: "dashboard",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers) => {
      const token =
        localStorage.getItem("authToken") ||
        sessionStorage.getItem("authToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTempleData: builder.query({
      query: () => ({
        url: "api/temple/temples-list/",
      }),
    }),

    getCrowdState: builder.query({
      query: ({ id, query }) => ({
        url: `api/temple/temple-detail/${id}/crowd-stats?${query}`,
      }),
    }),

    addTemple: builder.mutation({
      query: ({ token, newTemple }) => ({
        url: "api/temple/temples/",
        method: "POST",
        body: newTemple,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    updateTemple: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `api/temple/temple-detail/${id}/`,
        method: "PATCH",
        body: updatedData,
      }),
    }),

    deleteTemple: builder.mutation({
      query: (id) => ({
        url: `api/temple/temple-detail/${id}/`,
        method: "DELETE",
      }),
    }),
    uploadTempleImage: builder.mutation({
      query: (formData) => ({
        url: "api/temple/upload-image",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useGetTempleDataQuery,
  useGetCrowdStateQuery,
  useAddTempleMutation,
  useUpdateTempleMutation,
  useDeleteTempleMutation,
} = dashboard;
