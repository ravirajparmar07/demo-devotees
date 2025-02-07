import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const camera = createApi({
  reducerPath: "camera",
  baseQuery,
  endpoints: (builder) => ({
    cameraData: builder.query({
      query: () => {
        return {
          url: "api/camera/cameras/",
        };
      },
    }),
    addcamera: builder.mutation({
      query: ({ cameraData }) => {
        return {
          url: "api/camera/cameras/",
          method: "POST",
          body: cameraData,
        };
      },
    }),
    deletecamera: builder.mutation({
      query: ({ deleteId }) => {
        return {
          url: `api/camera/cameras/${deleteId}/delete/`,
          method: "DELETE",
        };
      },
    }),
    updateCamera: builder.mutation({
      query: ({ cameraId, updatedData }) => {
        return {
          url: `api/camera/cameras/${cameraId}/delete/`,
          method: "PATCH",
          body: updatedData,
        };
      },
    }),
  }),
});

export const {
  useCameraDataQuery,
  useAddcameraMutation,
  useDeletecameraMutation,
  useUpdateCameraMutation,
} = camera;
