import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const cameraApi = createApi({
  reducerPath: "cameraApi",
  baseQuery,
  endpoints: (builder) => ({
    getCameraUrl: builder.query({
      query: (cameraId) => `/get-rtsp-url?cameraId=${cameraId}`,
    }),
  }),
});

export const { useGetCameraUrlQuery } = cameraApi;
