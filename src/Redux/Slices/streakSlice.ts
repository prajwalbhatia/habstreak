import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../Axios/axiosBaseQuery";
import { RecentActivitiesSlice } from "./recentActivitiesSlice";
import { RewardSlice } from "./rewardSlice";

const streakURL = "/streak";

export const StreakSlice = createApi({
  reducerPath: "streak",
  baseQuery: axiosBaseQuery,
  tagTypes: ["GetStreaks", "GetStreak"],
  endpoints: (builder) => ({
    createStreak: builder.mutation({
      query: (body) => ({ url: streakURL, method: "POST", body }),
      onQueryStarted(arg, api) {
        api.queryFulfilled.then(() => {
          api.dispatch(
            RecentActivitiesSlice.util.invalidateTags(["GetActivities"])
          );
        });
      },
      invalidatesTags : ["GetStreaks"]
    }),
    getStreaks: builder.query({
      query: () => ({ url: streakURL, method: "GET" }),
      providesTags: ["GetStreaks"],
    }),
    getStreak: builder.query({
      query: ({ streakId }) => ({
        url: `${streakURL}/${streakId}`,
        method: "GET",
      }),
      providesTags: ["GetStreak"],
    }),
    updateStreak: builder.mutation({
      query: (body) => ({
        url: `${streakURL}/${body?.streakId}`,
        method: "PATCH",
        body: body?.updatedVal,
      }),
      onQueryStarted(arg, api) {
        api.queryFulfilled.then(() => {
          api.dispatch(
            RecentActivitiesSlice.util.invalidateTags(["GetActivities"])
          );
        });
      },
      invalidatesTags: ["GetStreaks" , "GetStreak"],
    }),
    deleteStreak: builder.mutation({
      query: (id) => ({
        url: `${streakURL}/${id}`,
        method: "DELETE",
        // body: body?.data,
      }),
      onQueryStarted(arg, api) {
        api.queryFulfilled.then(() => {
          api.dispatch(
            RecentActivitiesSlice.util.invalidateTags(["GetActivities"])
          );
        });
      },
      invalidatesTags: ["GetStreaks"],
    }),
    deleteStreakAndReward: builder.mutation({
      query: (id) => ({
        url: `${streakURL}/${id}/deleteAndUpdate`,
        method: "DELETE",
      }),
      onQueryStarted(arg, api) {
        api.queryFulfilled.then(() => {
          api.dispatch(
            RecentActivitiesSlice.util.invalidateTags(["GetActivities"])
          );
          api.dispatch(RewardSlice.util.invalidateTags(["GetRewards"]));
        });
      },
      invalidatesTags: ["GetStreaks"],
    }),
  }),
});

export const {
  useCreateStreakMutation,
  useDeleteStreakMutation,
  useGetStreaksQuery,
  useUpdateStreakMutation,
  useDeleteStreakAndRewardMutation,
  useGetStreakQuery,
} = StreakSlice;

export default StreakSlice.reducer;
