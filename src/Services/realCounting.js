import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const realCounting = createApi({
  reducerPath: "realCounting",
  baseQuery,
  endpoints: (builder) => ({
    realTimeCounting: builder.query({
      query: ({ filterData = "", searchTerm = "" } = {}) => {
        let queryParams = [];

        if (filterData) {
          queryParams.push(`ordering=${filterData}`);
        }
        if (searchTerm) {
          queryParams.push(`search=${searchTerm}`);
        }

        return {
          url: `api/camera/realtime-counting/?${queryParams.join("&")}`,
        };
      },
    }),
  }),
});

export const { useRealTimeCountingQuery } = realCounting;
