import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const realCounting = createApi({
  reducerPath: "realCounting",
  baseQuery,
  endpoints: (builder) => ({
    realTimeCounting: builder.query({
      query: () => ({
        url: "api/camera/realtime-counting/",
      }),
    }),
  }),
});

export const { useRealTimeCountingQuery } = realCounting;
