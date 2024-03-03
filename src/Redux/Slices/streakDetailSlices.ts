import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../Axios/axiosBaseQuery";

const streakDetailURL = "/streakDetail";

export const StreakDetailSlice = createApi({
  reducerPath: "streakDetail",
  baseQuery: axiosBaseQuery,
  tagTypes: ["GetStreakDetail"],
  endpoints: (builder) => ({
    createStreakDetail: builder.mutation({
      query: (body) => ({ url: streakDetailURL, method: "POST", body }),
      invalidatesTags: ["GetStreakDetail"],
    }),
    getStreakDetail: builder.query({
      query: ({ streakId }) => ({
        url: `${streakDetailURL}/${streakId}`,
        method: "GET",
      }),
      providesTags: ["GetStreakDetail"],
    }),
    updateStreakDetail: builder.mutation({
      query: (body) => ({
        url: `${streakDetailURL}/${body?.id}`,
        method: "PATCH",
        body: body?.data,
      }),
      invalidatesTags: ["GetStreakDetail"],
    }),
    deleteStreakDetail: builder.mutation({
      query: (body) => ({
        url: `${streakDetailURL}/${body?.id}`,
        method: "DELETE",
        body: body?.data,
      }),
      invalidatesTags: ["GetStreakDetail"],
    }),
  }),
});

export const {
  useCreateStreakDetailMutation,
  useDeleteStreakDetailMutation,
  useGetStreakDetailQuery,
  useUpdateStreakDetailMutation,
} = StreakDetailSlice;

export default StreakDetailSlice.reducer;
