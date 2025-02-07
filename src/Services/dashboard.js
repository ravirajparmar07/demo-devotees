import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const dashboard = createApi({
  reducerPath: "dashboard",
  baseQuery,
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
      query: ({ newTemple }) => ({
        url: "api/temple/temples/",
        method: "POST",
        body: newTemple,
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
