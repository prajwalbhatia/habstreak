import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../Axios/axiosBaseQuery";

const recentActivitiesURL = "/recentActivities";

export const RecentActivitiesSlice = createApi({
  reducerPath: "recentActivities",
  baseQuery: axiosBaseQuery,
  tagTypes: ["GetActivities"],
  endpoints: (builder) => ({
    getRecentActivities: builder.query({
      query: () => ({ url: recentActivitiesURL, method: "GET" }),
      providesTags: ["GetActivities"]
    }),
  }),
});

export const { useGetRecentActivitiesQuery } = RecentActivitiesSlice;

export default RecentActivitiesSlice.reducer;
