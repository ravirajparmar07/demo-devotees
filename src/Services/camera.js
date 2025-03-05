import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const camera = createApi({
  reducerPath: "camera",
  baseQuery,
  endpoints: (builder) => ({
    cameraData: builder.query({
      query: ({ filterData = "", searchTerm = "" } = {}) => {
        let queryParams = [];

        if (filterData) {
          queryParams.push(`ordering=${filterData}`);
        }
        if (searchTerm) {
          queryParams.push(`search=${searchTerm}`);
        }

        return {
          url: `api/camera/cameras/?${queryParams.join("&")}`,
        };
      },
    }),
    addcamera: builder.mutation({
      query: ({ cameraData }) => ({
        url: "api/camera/cameras/",
        method: "POST",
        body: cameraData,
      }),
    }),
    deletecamera: builder.mutation({
      query: ({ deleteId }) => ({
        url: `api/camera/cameras/${deleteId}/delete/`,
        method: "DELETE",
      }),
    }),
    updateCamera: builder.mutation({
      query: ({ cameraId, updatedData }) => ({
        url: `api/camera/cameras/${cameraId}/`,
        method: "PATCH",
        body: updatedData,
      }),
    }),
  }),
});

export const {
  useCameraDataQuery,
  useAddcameraMutation,
  useDeletecameraMutation,
  useUpdateCameraMutation,
} = camera;
