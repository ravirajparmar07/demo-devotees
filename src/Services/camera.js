import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const camera = createApi({
  reducerPath: "camera",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  endpoints: (builder) => ({
    cameraData: builder.query({
      query: (token) => {
        return {
          url: "api/camera/cameras/",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    addcamera: builder.mutation({
      query: ({ token, cameraData }) => {
        return {
          url: "api/camera/cameras/",
          method: "POST",
          body: cameraData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    deletecamera: builder.mutation({
      query: ({ token, cameraId }) => {
        return {
          url: `/camera/cameras/{id}/${cameraId}/`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    updateCamera: builder.mutation({
      query: ({ token, cameraId, updatedData }) => {
        return {
          url: `api/camera/cameras/${cameraId}`,
          method: "PUT",
          body: updatedData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
