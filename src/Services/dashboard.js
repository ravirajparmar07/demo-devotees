import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const dashboard = createApi({
  reducerPath: "dashboard",
  baseQuery,
  endpoints: (builder) => ({
    getTempleData: builder.query({
      query: ({ filterData = "", searchTerm = "" } = {}) => {
        let queryParams = [];

        if (filterData) {
          queryParams.push(`ordering=${filterData}`);
        }
        if (searchTerm) {
          queryParams.push(`search=${searchTerm}`);
        }

        return {
          url: `api/temple/temples-list/?${queryParams.join("&")}`,
        };
      },
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
        url: `api/temple/temples/${id}/`,
        method: "PATCH",
        body: updatedData,
      }),
    }),

    deleteTemple: builder.mutation({
      query: (id) => ({
        url: `api/temple/temples/${id}/`,
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
  useGetFilteredDataQuery,
  useGetCrowdStateQuery,
  useAddTempleMutation,
  useUpdateTempleMutation,
  useDeleteTempleMutation,
} = dashboard;
