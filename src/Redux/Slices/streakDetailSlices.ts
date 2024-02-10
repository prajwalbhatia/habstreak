import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../Axios/axiosBaseQuery";

const streakDetailURL = "/streakDetail";

export const StrealDetailSlice = createApi({
  reducerPath: "streakDetail",
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    createStreakDetail: builder.mutation({
      query: (body) => ({ url: streakDetailURL, method: "POST", body }),
    }),
    getStreakDetail: builder.query({
      query: ({streakId}) => ({ url: `${streakDetailURL}/${streakId}`, method: "GET" }),
    }),
    updateStreakDetail: builder.mutation({
      query: (body) => ({
        url: `${streakDetailURL}/${body?.id}`,
        method: "PATCH",
        body: body?.data,
      }),
    }),
    deleteStreakDetail: builder.mutation({
      query: (body) => ({
        url: `${streakDetailURL}/${body?.id}`,
        method: "DELETE",
        body: body?.data,
      }),
    }),
  }),
});

export const { useCreateStreakDetailMutation , useDeleteStreakDetailMutation , useGetStreakDetailQuery , useUpdateStreakDetailMutation } = StrealDetailSlice;

export default StrealDetailSlice.reducer;
